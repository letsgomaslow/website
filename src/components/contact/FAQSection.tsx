"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How much do your services cost?",
    answer: "Pricing varies based on your needs—contact us for a personalized quote.",
  },
  {
    question: "How quickly can I start my AI transformation?",
    answer: "Our team begins work promptly after understanding your needs.",
  },
  {
    question: "What industries do you serve?",
    answer: "We serve healthcare, finance, retail, manufacturing, and more. Would you like details on a specific industry?",
  },
  {
    question: "What is your approach to AI implementation?",
    answer: "We follow a systematic approach: assessment, strategy development, implementation, and continuous optimization—all while ensuring security and compliance through our TRiSM framework.",
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes, we offer comprehensive support and maintenance services to ensure your AI systems continue to perform optimally.",
  },
];

export function FAQSection() {
  return (
    <section className="w-full">
      <div className="mx-auto max-w-[58rem] text-center">
        <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl md:text-4xl">
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-[#EE7BB3] to-[#6DC4AD] bg-clip-text text-transparent">
            Questions
          </span>
        </h2>
      </div>

      <div className="mx-auto mt-8 max-w-[58rem]">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
} 