import { motion } from "motion/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  const faqs = [
    {
      question: "What is the mission and vision of the AI UniPod Ethiopia?",
      answer:
        "The Artificial Intelligence UniPod Ethiopia serves as a national center of excellence to accelerate the adoption and mastery of artificial intelligence within government institutions, academia, and the private sector. It bridges the gap between research and commercialization—positioning Ethiopia as a regional leader in applied AI for inclusive social and economic development by 2030.",
    },
    {
      question: "What computing hardware and technical infrastructure is available?",
      answer:
        "The primary computing cluster consists of 85 high-performance AI GPU workstations equipped with NVIDIA A100–equivalent GPUs, 256 GB RAM, and high-speed NVMe storage. This is integrated with the government AI data center at EAII offering 1 Petabyte of secure storage, redundant 10 Gbps networking, on-site UPS and diesel generator backup (PUE < 1.5), four regional edge nodes, five 75-inch smart panels, and dedicated 200 Mbps symmetrical fiber with secure VPN.",
    },
    {
      question: "Where is the AI UniPod facility located?",
      answer:
        "The host institute, the Ethiopian Artificial Intelligence Institute (EAII), has dedicated an 800 m² space located at its newly renovated headquarters at the center of Addis Ababa. The facility accommodates the AI & Robotics Lab, Design Lab, Technology Transfer Office, and collaborative solution studios.",
    },
    {
      question: "Who is eligible to participate and how are services funded?",
      answer:
        "Participation operates on a tiered subsidy structure: (1) Public administration receives 100% fully subsidized assessments and training upon completing a digital maturity review; (2) Micro and small enterprises (<50 employees) receive a 100% full subsidy plus seed grants up to USD $5,000 for prototype development; (3) Medium and large enterprises receive a 40–50% subsidy; and (4) Academic institutions (AAU, polytechnics) participate through collaborative research grants and shared lab access. Initial seed funding of $1 Million is powered by the timbuktoo initiative in partnership with the collaborating institutes.",
    },
    {
      question: "How are Intellectual Property (IP) and commercialization handled?",
      answer:
        "Through its dedicated Technology Transfer Office (TTO), the UniPod helps innovators protect their intellectual property, navigate patent processes, and connect with industry partners. Addis Ababa University manages sustainability strategies including contract fabrication and equity arrangements for commercialized projects to maintain long-term viability.",
    },
    {
      question: "What is the governance and ethical oversight framework?",
      answer:
        "The UniPod is governed by a tripartite Steering Committee comprising representatives from the Ethiopian Artificial Intelligence Institute (EAII), Addis Ababa University (AAU), and UNDP · timbuktoo, supported by a rotating Technical Advisory Group. An Ethics Advisory Board of experts in law, ethics, data science, and public health ensures all pilots comply with the African Union Continental AI Strategy and UNESCO recommendations.",
    },
    {
      question: "What national priority sectors does the UniPod focus on?",
      answer:
        "In alignment with Ethiopia’s Growth and Transformation Plan and the 2030 AI Roadmap, the UniPod prioritizes high-impact domestic use cases in: Agriculture (crop monitoring, fertilizer distribution optimization), Healthcare (clinical diagnostics, disease outbreak prediction), Education (personalized learning, blended LMS), and Financial Technology.",
    },
  ];

  return (
    <section id="faq" className="relative border-b border-border bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Everything you need to know.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Answers for founders, venture partners, researchers, and government collaborators.
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-12 rounded-3xl border border-border bg-card p-6 shadow-xs sm:p-10"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-border py-2">
                <AccordionTrigger className="font-display text-base font-semibold hover:no-underline sm:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}