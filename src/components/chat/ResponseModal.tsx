import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, Bot, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Markdown from 'react-markdown';

const companyInfo = {
  description: "At Maslow AI, we believe true innovation comes from understanding both the human and economic forces behind AI. While many companies chase the latest trends, we deliver practical, measurable outcomes that transform your business. In an era of AI hype, we focus on turning investment into tangible value.",
  contact: {
    email: "contact@maslow.ai",
    phone: "+1 (555) 123-4567",
    address: "123 Innovation Drive, Tech City, TC 12345"
  }
};

interface ResponseModalProps {
  isOpen: boolean;
  onClose: () => void;
  response: string;
  type: 'ai' | 'team' | 'company' | 'contact';
}

export function ResponseModal({ isOpen, onClose, response, type }: ResponseModalProps) {
  const renderAIResponse = () => (
    <motion.div
      key="ai-response"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mt-8 prose prose-invert max-w-none"
    >
      <div className="flex items-start space-x-4">
        <Bot className="h-6 w-6 text-brand-pink flex-shrink-0 mt-1" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Markdown>{response}</Markdown>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderCompanySection = () => (
    <motion.div
      key="company-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mt-8 space-y-6"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg leading-relaxed"
      >
        {companyInfo.description}
      </motion.p>
    </motion.div>
  );

  const renderContactSection = () => (
    <motion.div
      key="contact-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="mt-8 space-y-6"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <div className="flex items-center space-x-3">
          <Mail className="h-5 w-5 text-brand-pink" />
          <span>{companyInfo.contact.email}</span>
        </div>
        <div className="flex items-center space-x-3">
          <Phone className="h-5 w-5 text-brand-green" />
          <span>{companyInfo.contact.phone}</span>
        </div>
        <div className="flex items-center space-x-3">
          <MapPin className="h-5 w-5 text-brand-pink" />
          <span>{companyInfo.contact.address}</span>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <DialogTitle className="text-center text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
                {type === 'ai' ? 'AI Response' : 
                 type === 'team' ? 'Meet Our Team' :
                 type === 'company' ? 'About Maslow AI' : 'Contact Us'}
              </span>
            </DialogTitle>
          </motion.div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </motion.button>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {type === 'ai' && renderAIResponse()}
          {type === 'company' && renderCompanySection()}
          {type === 'contact' && renderContactSection()}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}