// import React from "react";
// import { GenerativeAIStrategySection } from "@/components/services/GenerativeAIStrategySection";
// import { OpenSourceSection } from "@/components/services/OpenSourceSection";
// import { TRiSMSection } from "@/components/services/TRiSMSection";
// import { CustomSolutionsSection } from "@/components/services/CustomSolutionsSection";

// export default function ServicesPage() {
//   return (
//     <div className="flex flex-col">
//       <GenerativeAIStrategySection />
//       <OpenSourceSection />
//       <TRiSMSection />
//       <CustomSolutionsSection />
//     </div>
//   );
// } 


"use client";

import React from "react";
import { motion } from "framer-motion";
import { GenerativeAIStrategySection } from "@/components/services/GenerativeAIStrategySection";
import { OpenSourceSection } from "@/components/services/OpenSourceSection";
import { TRiSMSection } from "@/components/services/TRiSMSection";
import { CustomSolutionsSection } from "@/components/services/CustomSolutionsSection";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function ServicesPage() {
  return (
    <motion.div 
      className="flex flex-col"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <GenerativeAIStrategySection />
      <OpenSourceSection />
      <TRiSMSection />
      <CustomSolutionsSection />
    </motion.div>
  );
}