"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils/shared";

interface DeviceShowcaseProps {
  desktopImage: string;
  tabletImage?: string;
  mobileImage?: string;
  className?: string;
}

export function DeviceShowcase({
  desktopImage,
  tabletImage,
  mobileImage,
  className,
}: DeviceShowcaseProps) {
  return (
    <div className={cn("relative w-full py-layout-xl overflow-hidden", className)}>
      <div className="container">
        <div className="relative flex justify-center items-end gap-8">
          {/* Desktop Frame */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative w-full max-w-3xl rounded-lg shadow-2xl"
          >
            <div className="relative bg-zinc-800 rounded-t-lg p-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
            </div>
            <div className="relative aspect-[16/10] bg-zinc-900">
              <Image
                src={desktopImage}
                alt="Desktop view"
                fill
                className="object-cover rounded-b-lg"
              />
            </div>
          </motion.div>

          {/* Tablet Frame */}
          {tabletImage && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative hidden md:block w-64 rounded-2xl shadow-2xl bg-zinc-800"
            >
              <div className="p-2">
                <div className="w-6 h-1 mx-auto rounded-full bg-zinc-600" />
              </div>
              <div className="relative aspect-[3/4] bg-zinc-900">
                <Image
                  src={tabletImage}
                  alt="Tablet view"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          )}

          {/* Mobile Frame */}
          {mobileImage && (
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative hidden lg:block w-48 rounded-[2.5rem] shadow-2xl bg-zinc-800"
            >
              <div className="p-2">
                <div className="w-16 h-1 mx-auto rounded-full bg-zinc-600" />
              </div>
              <div className="relative aspect-[9/19] bg-zinc-900">
                <Image
                  src={mobileImage}
                  alt="Mobile view"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2">
                <div className="w-8 h-8 mx-auto rounded-full border-2 border-zinc-600" />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 