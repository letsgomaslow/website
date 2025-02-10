"use client";

import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users } from "lucide-react";

const insights = [
  {
    stat: "73%",
    label: "of enterprises",
    description: "prioritize real business outcomes over AI model sophistication",
    icon: BarChart3,
    color: "from-brand-pink to-brand-purple"
  },
  {
    stat: "2.5x",
    label: "productivity gain",
    description: "when focusing on employee empowerment with AI tools",
    icon: TrendingUp,
    color: "from-brand-green to-brand-blue"
  },
  {
    stat: "89%",
    label: "of leaders agree",
    description: "process optimization is more valuable than cutting-edge AI features",
    icon: Users,
    color: "from-brand-blue to-brand-pink"
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

export function GartnerInsightsSection() {
  return (
    <section className="relative py-layout-2xl overflow-hidden">
      <div className="container relative">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="flex flex-col gap-layout-xl"
        >
          {/* Header */}
          <motion.div 
            variants={item}
            className="text-center space-y-4"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Gartner Insights:{" "}
              <span className="bg-gradient-to-r from-brand-pink to-brand-purple bg-clip-text text-transparent">
                The AI Reality
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Gartner's insights reveal that while tech vendors race to push the next AI model, enterprises must focus on real outcomes—boosting employee productivity, streamlining processes, and innovating business models.
            </p>
          </motion.div>

          {/* Insights Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <motion.div
                  key={insight.stat}
                  variants={item}
                  className="relative group"
                >
                  <div className="relative rounded-2xl border bg-card p-8 h-full transition-shadow hover:shadow-lg">
                    {/* Gradient Line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r rounded-t-2xl opacity-80"
                      style={{
                        background: `linear-gradient(to right, var(--${insight.color.split(' ')[1]}) 0%, var(--${insight.color.split(' ')[3]}) 100%)`
                      }}
                    />
                    
                    <div className="flex flex-col items-center text-center gap-4">
                      {/* Icon */}
                      <div className="bg-gradient-to-r w-fit p-3 rounded-lg"
                        style={{
                          background: `linear-gradient(to right, var(--${insight.color.split(' ')[1]}) 0%, var(--${insight.color.split(' ')[3]}) 100%)`
                        }}
                      >
                        <Icon className="h-6 w-6 text-white" />
                      </div>

                      {/* Stat */}
                      <div className="space-y-1">
                        <div className="text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent"
                          style={{
                            backgroundImage: `linear-gradient(to right, var(--${insight.color.split(' ')[1]}) 0%, var(--${insight.color.split(' ')[3]}) 100%)`
                          }}
                        >
                          {insight.stat}
                        </div>
                        <div className="text-lg font-medium">{insight.label}</div>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground">
                        {insight.description}
                      </p>
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