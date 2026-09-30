import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { DynamicStartupLayout } from "@/components/white-label/DynamicStartupLayout";
import { getStartupBySlug } from "@/data/startups";

export const Route = createFileRoute("/$startupSlug")({
  loader: ({ params }) => {
    const startup = getStartupBySlug(params.startupSlug);
    if (!startup) throw notFound();
    return { startup };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Startup not found — AI UNIPOD Ethiopia" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { name, tagline, sector } = loaderData.startup;
    const title = `${name} — ${tagline}`;
    const description = `${name} is a ${sector} venture hosted at the AI UNIPOD in Ethiopia. ${tagline}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: StartupProfilePage,
  notFoundComponent: StartupNotFound,
});

function StartupNotFound() {
  return (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <h1 className="text-2xl font-semibold">We couldn't find that startup</h1>
        <p className="mt-2 text-muted-foreground">It may have moved or is not yet public.</p>
        <Link to="/" className="mt-6 inline-block text-primary underline underline-offset-4">
          Back to the directory
        </Link>
      </div>
    </div>
  );
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function StartupProfilePage() {
  const { startup } = Route.useLoaderData();

  return (
    <DynamicStartupLayout
      theme={startup.theme}
      name={startup.name}
      nav={[
        { label: "About", href: "#about" },
        { label: "Products", href: "#products" },
        { label: "Investment", href: "#invest" },
      ]}
    >
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-16">
        <p className="inline-flex rounded-brand bg-brand-accent/20 px-3 py-1 text-xs font-medium tracking-wide uppercase">
          {startup.sector}
        </p>
        <h1 className="font-brand-heading mt-6 max-w-3xl text-4xl leading-tight font-bold tracking-tight sm:text-6xl">
          {startup.tagline}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-brand-text/70">{startup.description}</p>

        <dl className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Founded", value: startup.founded },
            { label: "Team", value: `${startup.team_size} people` },
            { label: "Based in", value: startup.location },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-brand border border-brand-primary/15 bg-brand-primary/5 p-5"
            >
              <dt className="text-xs tracking-wide text-brand-text/60 uppercase">{item.label}</dt>
              <dd className="mt-1 text-lg font-semibold">{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="products" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-brand-heading text-2xl font-semibold">Products</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {startup.products.map((product) => (
            <article
              key={product.name}
              className="rounded-brand border border-brand-primary/15 p-6 transition-shadow hover:shadow-lg"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-brand-heading text-lg font-semibold">{product.name}</h3>
                <span className="rounded-brand bg-brand-primary px-2.5 py-1 text-xs font-medium text-brand-primary-foreground">
                  {product.stage}
                </span>
              </div>
              <p className="mt-3 text-sm text-brand-text/70">{product.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="invest" className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-brand bg-brand-secondary p-10 text-brand-secondary-foreground">
          <h2 className="font-brand-heading text-2xl font-semibold">Investment ask</h2>
          <p className="mt-4 text-4xl font-bold">
            {currency.format(startup.investment_ask.amount_usd)}
            <span className="ml-3 align-middle text-base font-normal opacity-70">
              {startup.investment_ask.round}
            </span>
          </p>
          <p className="mt-4 max-w-2xl opacity-80">{startup.investment_ask.use_of_funds}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {startup.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                className="rounded-brand bg-brand-accent px-4 py-2 text-sm font-medium text-brand-accent-foreground transition-opacity hover:opacity-90"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 pb-8">
        <Link to="/" className="text-sm text-brand-primary underline underline-offset-4">
          ← All AI UNIPOD startups
        </Link>
      </section>
    </DynamicStartupLayout>
  );
}
