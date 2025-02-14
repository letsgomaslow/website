"use client";

import { Sparkles, Code2, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const differentiators = [
  {
    title: "Generative Brilliance",
    description: "Bespoke AI strategies that blend cutting-edge generative technology with enterprise wisdom.",
    icon: Sparkles,
    gradient: "from-brand-pink to-brand-purple",
    image: "/images/welcome/Generative_Brilliance.jpg"
  },
  {
    title: "Open‑Source Ingenuity",
    description: "Flexible, cost-effective solutions that grant you control, transparency, and agility.",
    icon: Code2,
    gradient: "from-brand-green to-brand-blue",
    image: "/images/welcome/Open_Source_Ingenuity.jpg"
  },
  {
    title: "TRiSM Assurance",
    description: "Our TRiSM framework ensures your AI systems are secure, compliant, and reliable.",
    icon: ShieldCheck,
    gradient: "from-brand-blue to-brand-pink",
    image: "/images/welcome/Trism_Assurance.jpg"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export function ValuePropositionSection() {
  return (
    <section className="relative py-layout-2xl overflow-hidden bg-gradient-to-b from-background to-muted/50">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-0 w-72 h-72 bg-brand-pink/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-brand-blue/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <motion.div 
          className="flex flex-col gap-layout-xl"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <div className="text-center space-y-4">
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold"
              variants={item}
            >
              Our Value{" "}
              <span className="bg-gradient-to-r  from-brand-pink to-brand-green bg-clip-text text-transparent">
                Proposition
              </span>
            </motion.h2>
          </div>

          {/* Differentiators Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {differentiators.map((diff, index) => {
              const Icon = diff.icon;
              return (
                <motion.div
                  key={diff.title}
                  variants={item}
                  className="group relative"
                >
                  <div className="relative h-full rounded-2xl border bg-card overflow-hidden">
                    {/* Card Image */}
                    <div className="relative h-48 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r opacity-80"
                        style={{
                          background: `linear-gradient(to right, var(--${diff.gradient.split(' ')[1]}) 0%, var(--${diff.gradient.split(' ')[3]}) 100%)`
                        }}
                      />
                      <Image
                        src={diff.image}
                        alt={diff.title}
                        width={400}
                        height={300}
                        className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <div className="bg-background/90 backdrop-blur-sm p-2 rounded-lg">
                          <Icon className="h-6 w-6" />
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{diff.title}</h3>
                      <p className="text-muted-foreground">{diff.description}</p>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-r opacity-10"
                        style={{
                          background: `linear-gradient(to right, var(--${diff.gradient.split(' ')[1]}) 0%, var(--${diff.gradient.split(' ')[3]}) 100%)`
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
} 