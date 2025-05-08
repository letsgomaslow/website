import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface DynamicCardItem {
  title?: string;
  description?: string;
  content: string | string[]; // Allow array content
  image?: string;
  isHeading?: boolean;
  isSubheading?: boolean;
  isSubsection?: boolean;
  metadata?: Record<string, any>; // For additional data points
}

interface DynamicCardProps {
  title: string;
  items: DynamicCardItem[];
  icon: LucideIcon;
  layout: 'grid' | 'vertical';
  contentAlignment?: 'left' | 'center' | 'right';
}

export const DynamicCard: React.FC<DynamicCardProps> = ({
  title,
  items,
  icon: Icon,
  layout,
  contentAlignment = 'left'
}) => {
  const textAlignClass = 
    contentAlignment === 'center' ? 'text-center' : 
    contentAlignment === 'right' ? 'text-right' : 'text-left';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-6xl mx-auto pb-24 ${layout === 'grid' ? '' : ''}`}
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center flex flex-col items-center mb-8"
      >
        <motion.div
          animate={{ 
            y: [0, -5, 0],
            rotateZ: [0, 5, 0, -5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Icon className="w-10 h-10 text-brand-pink mb-3" />
        </motion.div>
        <h2 className="text-4xl font-bold">
          <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        <motion.div 
          className="w-24 h-1 bg-gradient-to-r from-brand-pink to-brand-green mt-3"
          animate={{ width: ['0%', '100%'] }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </motion.div>

      <div className={`
        ${layout === 'grid' 
          ? 'grid gap-8 sm:grid-cols-1 md:grid-cols-2' 
          : 'space-y-6'
        }
      `}>
        {items.map((item, index) => {
          // Special handling for headings
          if (item.isHeading) {
            return (
              <motion.div
                key={`heading-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="col-span-full"
              >
                <h2 className="text-3xl font-bold text-brand-pink mb-4">{item.title}</h2>
                {item.content && <p className={`text-lg ${textAlignClass}`}>{item.content}</p>}
              </motion.div>
            );
          }
          
          // Special handling for subheadings
          if (item.isSubheading) {
            return (
              <motion.div
                key={`subheading-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="col-span-full mt-6"
              >
                <h3 className="text-2xl font-semibold text-brand-green mb-3">{item.title}</h3>
                {item.content && <p className={`text-lg ${textAlignClass}`}>{item.content}</p>}
              </motion.div>
            );
          }
          
          // Special handling for subsections
          if (item.isSubsection) {
            return (
              <motion.div
                key={`subsection-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="col-span-full ml-4 mt-4"
              >
                <h4 className="text-xl font-medium text-brand-pink mb-2">{item.title}</h4>
                {item.content && <p className={`text-base ${textAlignClass}`}>{item.content}</p>}
              </motion.div>
            );
          }

          // Grid layout for team members
          if (layout === 'grid') {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative overflow-hidden rounded-2xl bg-background/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row gap-6 p-6">
                  {item.image && (
                    <div className="relative rounded-xl overflow-hidden w-full sm:w-48 h-48 sm:h-48 mx-auto sm:mx-0">
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-tr from-brand-pink/20 to-brand-green/20"
                        animate={{ opacity: [0.2, 0.4, 0.2] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"
                        animate={{ opacity: [0.7, 0.5, 0.7] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-center flex-1">
                    {item.title && (
                      <motion.h3 
                        className="text-2xl font-bold"
                        animate={{ color: ['#ffffff', '#e879f9', '#ffffff'] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        {item.title}
                      </motion.h3>
                    )}
                    {item.description && (
                      <p className="text-brand-pink font-medium text-lg">{item.description}</p>
                    )}
                    <p className="text-muted-foreground leading-relaxed mt-3">{item.content}</p>
                  </div>
                </div>
              </motion.div>
            );
          }
          
          // Vertical layout for other content types
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="bg-background/50 backdrop-blur-sm p-6 rounded-lg shadow-md"
            >
              {item.title && (
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              )}
              <p className={`text-muted-foreground ${textAlignClass}`}>{item.content}</p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};