import React from "react";
import { CapabilitiesHero } from "@/components/capabilities/CapabilitiesHero";
import { CapabilitySection } from "@/components/capabilities/CapabilitySection";
import { ScrollProgress } from "@/components/capabilities/ScrollProgress";
import { CapabilitiesCTA } from "@/components/capabilities/CapabilitiesCTA";

const capabilities = [
  {
    title: "AI Strategy & Architecture",
    description: "We help enterprises develop and implement comprehensive AI strategies that align with business objectives and drive measurable results.",
    iconName: "Brain" as const,
    colorScheme: "pink" as const,
    imageUrl: "https://picsum.photos/800/800?random=1",
    features: [
      {
        title: "Strategic Planning",
        description: "Develop a roadmap for AI implementation that aligns with your business goals and growth targets."
      },
      {
        title: "Architecture Design",
        description: "Create scalable and efficient AI architectures using frameworks like the Gartner AI Tech Sandwich."
      },
      {
        title: "ROI Assessment",
        description: "Evaluate and measure the impact of AI initiatives on your business outcomes."
      }
    ]
  },
  {
    title: "Open Source Solutions",
    description: "Leverage the power of open-source AI tools to build cost-effective, customizable, and transparent solutions.",
    iconName: "Code" as const,
    colorScheme: "green" as const,
    imageUrl: "https://picsum.photos/800/800?random=2",
    features: [
      {
        title: "Custom Development",
        description: "Build tailored AI solutions using open-source frameworks and tools."
      },
      {
        title: "Integration Services",
        description: "Seamlessly integrate open-source AI tools with your existing systems."
      },
      {
        title: "Community Support",
        description: "Benefit from and contribute to the open-source AI community."
      }
    ]
  },
  {
    title: "TRiSM Framework",
    description: "Implement our Trust, Risk, and Security Management framework to ensure your AI systems are secure, compliant, and trustworthy.",
    iconName: "ShieldCheck" as const,
    colorScheme: "blue" as const,
    imageUrl: "https://picsum.photos/800/800?random=3",
    features: [
      {
        title: "Risk Assessment",
        description: "Identify and mitigate potential risks in AI implementations."
      },
      {
        title: "Security Protocols",
        description: "Implement robust security measures for AI systems and data."
      },
      {
        title: "Compliance Management",
        description: "Ensure adherence to regulatory requirements and industry standards."
      }
    ]
  },
  {
    title: "Custom AI Solutions",
    description: "Develop bespoke AI solutions tailored to your specific industry needs and business requirements.",
    iconName: "Cog" as const,
    colorScheme: "purple" as const,
    imageUrl: "https://picsum.photos/800/800?random=4",
    features: [
      {
        title: "Industry Expertise",
        description: "Solutions designed specifically for your industry's unique challenges."
      },
      {
        title: "End-to-End Development",
        description: "Complete development lifecycle from concept to deployment."
      },
      {
        title: "Ongoing Support",
        description: "Continuous optimization and maintenance of your AI systems."
      }
    ]
  }
];

export default function TestCapabilitiesPage() {
  return (
    <div>
      <ScrollProgress />
      <CapabilitiesHero />
      {capabilities.map((capability, index) => (
        <CapabilitySection
          key={capability.title}
          {...capability}
          reverse={index % 2 === 1}
        />
      ))}
      <CapabilitiesCTA />
    </div>
  );
} 