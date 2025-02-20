import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User, X, Linkedin, Mail, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';

export function TeamDataModal({ isOpen, onClose, teamData }) {
  if (!teamData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <DialogTitle className="text-center font-heading text-3xl font-bold leading-[1.1] sm:text-4xl">
            Meet Our{" "}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent"
            >
              Team
            </motion.span>
          </DialogTitle>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
          </motion.button>
        </DialogHeader>

        <div className="mx-auto mt-8 grid justify-center gap-8 sm:grid-cols-2 md:grid-cols-2">
          {teamData.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ 
                opacity: 0, 
                x: index % 2 === 0 ? -20 : 20 
              }}
              whileInView={{ 
                opacity: 1, 
                x: 0 
              }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.2 
              }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-lg border bg-background p-2"
            >
              <div className="flex h-full flex-col items-center justify-between rounded-md p-6">
                <div className="relative group">
                  <div className="h-24 w-24 rounded-full overflow-hidden bg-gradient-to-r from-brand-pink/10 to-brand-green/10">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2"
                  >
                    <motion.a
                      whileHover={{ y: -2 }}
                      className="p-1 rounded-full bg-brand-pink/10 cursor-pointer"
                    >
                      <Linkedin className="h-4 w-4 text-brand-pink" />
                    </motion.a>
                    <motion.a
                      whileHover={{ y: -2 }}
                      className="p-1 rounded-full bg-brand-green/10 cursor-pointer"
                    >
                      <Mail className="h-4 w-4 text-brand-green" />
                    </motion.a>
                    <motion.a
                      whileHover={{ y: -2 }}
                      className="p-1 rounded-full bg-brand-pink/10 cursor-pointer"
                    >
                      <Twitter className="h-4 w-4 text-brand-pink" />
                    </motion.a>
                  </motion.div>
                </div>
                
                <div className="mt-6 text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.2 }}
                  >
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground font-medium">
                      {member.role}
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                      {member.bio}
                    </p>
                  </motion.div>
                </div>

                {/* Decorative gradient line */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
                  className="absolute bottom-0 left-0 right-0 p-6"
                >
                  <div className="w-full h-1 bg-gradient-to-r from-brand-pink to-brand-green rounded-full" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}