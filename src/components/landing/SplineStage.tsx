import { createElement, useEffect, useRef, useState } from "react";

const SPLINE_SCRIPT = "https://cdn.spline.design/@splinetool/viewer@2.0.55/build/spline-viewer.js";
const SPLINE_SCENE = "https://prod.spline.design/2GuQxMiUCFuKQ9zL/scene.splinecode";

export function SplineStage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<HTMLElement | null>(null);
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Check if device is desktop and has decent capability
  useEffect(() => {
    // Skip 3D engine on mobile screens (<768px) or if user requested data-saver mode
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const isSaveData =
      typeof navigator !== "undefined" &&
      // @ts-expect-error - connection is non-standard
      (navigator.connection?.saveData === true || navigator.connection?.effectiveType === "2g");

    if (isMobile || isSaveData) {
      // Do not download 5MB+ 3D assets on mobile or slow connections
      return;
    }

    // On desktop, defer 3D loading until the browser is idle and critical elements have painted
    let idleHandle: number | undefined;
    let timerHandle: number | undefined;

    const startLoading = () => {
      setShouldLoadSpline(true);
    };

    const win = typeof window !== "undefined" ? (window as Window & { requestIdleCallback?: any; cancelIdleCallback?: any }) : null;

    if (win && typeof win.requestIdleCallback === "function") {
      idleHandle = win.requestIdleCallback(startLoading, { timeout: 1200 });
    } else {
      timerHandle = window.setTimeout(startLoading, 600);
    }

    return () => {
      if (idleHandle && win && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleHandle);
      }
      if (timerHandle) {
        window.clearTimeout(timerHandle);
      }
    };
  }, []);

  // When shouldLoadSpline is true, inject script and initialize
  useEffect(() => {
    if (!shouldLoadSpline) return;

    let script = document.querySelector<HTMLScriptElement>(`script[src="${SPLINE_SCRIPT}"]`);
    if (!script) {
      script = document.createElement("script");
      script.type = "module";
      script.src = SPLINE_SCRIPT;
      script.async = true;
      document.head.appendChild(script);
    }

    const viewer = viewerRef.current;
    const container = containerRef.current;

    const hideSplineLogo = () => {
      try {
        const currentViewer = viewerRef.current;
        if (!currentViewer) return;
        const shadow = currentViewer.shadowRoot;
        if (!shadow) return;

        // Inject persistent CSS to remove any logo/watermark inside Spline shadow DOM
        if (!shadow.querySelector("style[data-hide-logo]")) {
          const style = document.createElement("style");
          style.setAttribute("data-hide-logo", "true");
          style.textContent = `
            #logo, 
            a[href*="spline.design"], 
            a[href*="spline"], 
            .watermark, 
            [class*="watermark"],
            [aria-label*="Spline"] {
              display: none !important;
              opacity: 0 !important;
              visibility: hidden !important;
              pointer-events: none !important;
              transform: scale(0) !important;
            }
          `;
          shadow.appendChild(style);
        }

        const logoEl = shadow.querySelector("#logo") || shadow.querySelector('a[href*="spline"]');
        if (logoEl) {
          (logoEl as HTMLElement).style.display = "none";
          (logoEl as HTMLElement).style.opacity = "0";
          (logoEl as HTMLElement).style.visibility = "hidden";
        }
      } catch {
        // Ignore shadow DOM restrictions
      }
    };

    const markLoaded = () => {
      setLoaded(true);
      hideSplineLogo();
    };

    const fallbackTimer = window.setTimeout(markLoaded, 3000);
    viewer?.addEventListener("load", markLoaded);

    // Regularly ensure logo stays removed after scene initialization
    const logoInterval = window.setInterval(hideSplineLogo, 250);
    const stopLogoInterval = window.setTimeout(() => window.clearInterval(logoInterval), 5000);

    // Visibility & Scroll Tracking for 60fps Butter-Smooth Scroll Performance
    let isInView = true;
    let isScrolling = false;
    let scrollTimeout: number | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isInView = entry?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );

    if (container) {
      observer.observe(container);
    }

    const handleScroll = () => {
      isScrolling = true;
      window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Throttled cursor tracking: forward window pointer movement to Spline canvas via RAF
    let pendingRaf: number | null = null;
    let latestEvent: { clientX: number; clientY: number; screenX: number; screenY: number } | null = null;

    const dispatchPointerToSpline = () => {
      pendingRaf = null;
      if (!isInView || isScrolling || !latestEvent) return;

      const currentViewer = viewerRef.current;
      if (!currentViewer) return;
      const canvas = currentViewer.shadowRoot?.querySelector("canvas");
      if (!canvas) return;

      const syntheticPointerMove = new PointerEvent("pointermove", {
        bubbles: true,
        cancelable: true,
        clientX: latestEvent.clientX,
        clientY: latestEvent.clientY,
        screenX: latestEvent.screenX,
        screenY: latestEvent.screenY,
        pointerId: 1,
        pointerType: "mouse",
        isPrimary: true,
      });
      canvas.dispatchEvent(syntheticPointerMove);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isInView || isScrolling) return;

      const currentViewer = viewerRef.current;
      const canvas = currentViewer?.shadowRoot?.querySelector("canvas");
      if (e.target === canvas) return;

      latestEvent = {
        clientX: e.clientX,
        clientY: e.clientY,
        screenX: e.screenX,
        screenY: e.screenY,
      };

      if (pendingRaf === null) {
        pendingRaf = requestAnimationFrame(dispatchPointerToSpline);
      }
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(stopLogoInterval);
      window.clearInterval(logoInterval);
      window.clearTimeout(scrollTimeout);
      if (pendingRaf !== null) {
        cancelAnimationFrame(pendingRaf);
      }
      observer.disconnect();
      viewer?.removeEventListener("load", markLoaded);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [shouldLoadSpline]);

  return (
    <div
      ref={containerRef}
      className="spline-stage relative h-full w-full contain-paint"
      aria-label="Interactive AI UNIPOD experience"
    >
      {shouldLoadSpline ? (
        <>
          <div className={`spline-loading ${loaded ? "is-loaded" : ""}`} aria-hidden="true">
            <span />
            <p>Loading the UNIPOD</p>
          </div>
          {createElement("spline-viewer", {
            ref: viewerRef,
            url: SPLINE_SCENE,
            loading: "lazy",
            className: `spline-viewer transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`,
          })}
        </>
      ) : (
        /* Lightweight futuristic ambient glow while waiting or on mobile */
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 transition-opacity duration-700"
          aria-hidden="true"
        >
          <div className="h-72 w-72 rounded-full bg-linear-to-tr from-primary/20 via-sky-500/10 to-transparent blur-3xl animate-pulse" />
        </div>
      )}
    </div>
  );
}
