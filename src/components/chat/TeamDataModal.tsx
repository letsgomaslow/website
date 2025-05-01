import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, Linkedin, Mail, Twitter, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { TeamMember } from '@/DataModels/TeamDataModel';
import Image from 'next/image';

interface ContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: 'team' | 'company' | 'contact' | null;
  teamData?: TeamMember[];
}

export function TeamDataModal({ isOpen, onClose, contentType, teamData }: ContentModalProps) {
  if (!contentType) return null;

  const companyInfo = {
    description: "At Maslow AI, we believe true innovation comes from understanding both the human and economic forces behind AI. While many companies chase the latest trends, we deliver practical, measurable outcomes that transform your business. In an era of AI hype, we focus on turning investment into tangible value.",
    contact: {
      email: "contact@maslow.ai",
      phone: "+1 (555) 123-4567",
      address: "123 Innovation Drive, Tech City, TC 12345"
    }
  };

  const renderTeamSection = () => (
    <div className="mt-12 grid gap-8 sm:grid-cols-2">
      {teamData?.map((member, index) => (
        <motion.div
          key={member.name}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20, y: 20 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-background"
        >
          <div className="grid lg:grid-cols-2 gap-6 p-6">
            <div className="relative aspect-square rounded-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-pink/20 to-brand-green/20" />
              <img src={member.imageUrl} alt={member.name} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4"
              >
                <motion.a whileHover={{ y: -2 }} className="p-2 rounded-full bg-brand-pink/10">
                  <Linkedin className="h-5 w-5 text-brand-pink" />
                </motion.a>
                <motion.a whileHover={{ y: -2 }} className="p-2 rounded-full bg-brand-green/10">
                  <Mail className="h-5 w-5 text-brand-green" />
                </motion.a>
              </motion.div>
            </div>
            <div className="flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-bold">{member.name}</h3>
                <p className="text-brand-pink font-medium">{member.role}</p>
                <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderCompanySection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-12 grid lg:grid-cols-2 gap-12 items-center"
    >
      <div className="space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-muted-foreground leading-relaxed"
        >
          {companyInfo.description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
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
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative aspect-video rounded-2xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-pink/20 to-brand-green/20" />
        <Image
          src="/images/welcome/hero-image2.jpg"
          alt="Maslow AI Office"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
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
              {contentType === 'team' && (
                <>
                  Meet Our{" "}
                  <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
                    Team
                  </span>
                </>
              )}
              {contentType === 'company' && (
                <>
                  About{" "}
                  <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
                    Maslow AI
                  </span>
                </>
              )}
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

        {contentType === 'team' && renderTeamSection()}
        {contentType === 'company' && renderCompanySection()}
      </DialogContent>
    </Dialog>
  );
}