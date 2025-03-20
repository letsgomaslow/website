import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Bot, Building, Phone, Users } from 'lucide-react';
import Markdown from 'react-markdown';
import { TeamMember } from '@/DataModels/TeamDataModel';

interface ContentViewProps {
  type: 'ai' | 'team' | 'company' | 'contact' | null | undefined;
  response?: string;
  transcript?: string;
  teamData?: TeamMember[];
}

const companyInfo = {
  description: "At Maslow AI, we believe true innovation comes from understanding both the human and economic forces behind AI. While many companies chase the latest trends, we deliver practical, measurable outcomes that transform your business. In an era of AI hype, we focus on turning investment into tangible value.",
  contact: {
    email: "contact@maslow.ai",
    phone: "+1 (555) 123-4567",
    address: "123 Innovation Drive, Tech City, TC 12345"
  }
};

export const ContentView: React.FC<ContentViewProps> = ({
  type,
  response,
  transcript,
  teamData
}) => {
  // Removed the useEffect for speech synthesis

  const renderTeamContent = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 w-full max-w-6xl mx-auto pb-24"
    >
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="col-span-full text-center mb-8 flex flex-col items-center"
      >
        <motion.div
          animate={{ 
            y: [0, -5, 0],
            rotateZ: [0, 5, 0, -5, 0]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Users className="w-10 h-10 text-brand-pink mb-3" />
        </motion.div>
        <h2 className="text-4xl font-bold">
          Meet Our{" "}
          <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
            Team
          </span>
        </h2>
        <motion.div 
          className="w-24 h-1 bg-gradient-to-r from-brand-pink to-brand-green mt-3"
          animate={{ width: ['0%', '100%'] }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </motion.div>
      
      {teamData?.map((member, index) => (
        <motion.div
          key={member.name}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="relative overflow-hidden rounded-2xl bg-background/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer"
        >
          <div className="flex flex-col sm:flex-row gap-6 p-6">
            <div className="relative rounded-xl overflow-hidden w-full sm:w-48 h-48 sm:h-48 mx-auto sm:mx-0">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-tr from-brand-pink/20 to-brand-green/20"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <img src={member.imageUrl} alt={member.name} className="h-full w-full object-cover" />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"
                animate={{ opacity: [0.7, 0.5, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <div className="flex flex-col justify-center flex-1">
              <motion.h3 
                className="text-2xl font-bold"
                animate={{ color: ['#ffffff', '#e879f9', '#ffffff'] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                {member.name}
              </motion.h3>
              <p className="text-brand-pink font-medium text-lg">{member.role}</p>
              <p className="text-muted-foreground leading-relaxed mt-3">{member.bio}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  const renderAiResponse = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto pb-24"
    >
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center flex flex-col items-center mb-8"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <Bot className="w-10 h-10 text-brand-green mb-3" />
        </motion.div>
        <h2 className="text-4xl font-bold">
          <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
            AI Response
          </span>
        </h2>
        <motion.div 
          className="w-36 h-1 bg-gradient-to-r from-brand-green to-brand-pink mt-3"
          animate={{ width: ['0%', '100%'] }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </motion.div>
      
      {transcript && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-muted/50 backdrop-blur-sm p-6 rounded-lg mb-6"
        >
          <div className="flex items-center space-x-3 mb-3">
            <motion.div
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Mic className="w-6 h-6 text-brand-pink" />
            </motion.div>
            <span className="font-semibold text-lg">You said:</span>
          </div>
          <p className="text-lg">{transcript}</p>
        </motion.div>
      )}
      
      {response && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-primary/10 backdrop-blur-sm p-6 rounded-lg"
        >
          <div className="flex items-center space-x-3 mb-3">
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Bot className="w-6 h-6 text-brand-green" />
            </motion.div>
            <span className="font-semibold text-lg">Response:</span>
          </div>
          <div className="prose prose-invert max-w-none text-lg">
            <Markdown>{response}</Markdown>
          </div>
        </motion.div>
      )}
    </motion.div>
  );

  const renderCompanyInfo = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-5xl mx-auto pb-24"
    >
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center flex flex-col items-center mb-8"
      >
        <motion.div
          animate={{ 
            rotateY: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Building className="w-10 h-10 text-brand-pink mb-3" />
        </motion.div>
        <h2 className="text-4xl font-bold">
          <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
            About Maslow AI
          </span>
        </h2>
        <motion.div 
          className="w-48 h-1 bg-gradient-to-r from-brand-pink to-brand-green mt-3"
          animate={{ width: ['0%', '100%'] }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-background/50 backdrop-blur-sm p-8 rounded-lg shadow-lg"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="relative overflow-hidden rounded-lg mb-8"
        >
          <div className="aspect-video w-full bg-gradient-to-br from-brand-pink/30 to-brand-green/30 rounded-lg flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-72 h-72 rounded-full border-2 border-brand-pink/20"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-56 h-56 rounded-full border-2 border-brand-green/20"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0, -10, 0]
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Building className="w-20 h-20 text-white/70" />
            </motion.div>
          </div>
        </motion.div>

        <motion.p 
          className="text-xl text-muted-foreground leading-relaxed mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {companyInfo.description}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 p-5 bg-brand-green/10 rounded-lg border border-brand-green/20 flex items-center justify-center"
        >
          <motion.p
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-lg font-medium text-center text-brand-green"
          >
            Transform your business with AI that delivers real results
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  const renderContactInfo = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto pb-24"
    >
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center flex flex-col items-center mb-8"
      >
        <motion.div
          animate={{ 
            rotate: [0, 15, 0, -15, 0],
            y: [0, -3, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Phone className="w-10 h-10 text-brand-green mb-3" />
        </motion.div>
        <h2 className="text-4xl font-bold">
          <span className="bg-gradient-to-r from-brand-pink to-brand-green bg-clip-text text-transparent">
            Contact Us
          </span>
        </h2>
        <motion.div 
          className="w-32 h-1 bg-gradient-to-r from-brand-green to-brand-pink mt-3"
          animate={{ width: ['0%', '100%'] }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="bg-background/50 backdrop-blur-sm p-8 rounded-lg shadow-lg space-y-6"
      >
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center space-x-5 hover:bg-brand-pink/10 p-5 rounded-lg transition-all transform hover:scale-105"
        >
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="p-4 rounded-full bg-brand-pink/20"
          >
            <Mic className="h-8 w-8 text-brand-pink" />
          </motion.div>
          <span className="text-xl">{companyInfo.contact.email}</span>
        </motion.div>
        
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center space-x-5 hover:bg-brand-green/10 p-5 rounded-lg transition-all transform hover:scale-105"
        >
          <motion.div 
            animate={{ y: [0, -4, 0], rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
            className="p-4 rounded-full bg-brand-green/20"
          >
            <Phone className="h-8 w-8 text-brand-green" />
          </motion.div>
          <span className="text-xl">{companyInfo.contact.phone}</span>
        </motion.div>
        
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center space-x-5 hover:bg-brand-pink/10 p-5 rounded-lg transition-all transform hover:scale-105"
        >
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 3, 0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
            className="p-4 rounded-full bg-brand-pink/20"
          >
            <Building className="h-8 w-8 text-brand-pink" />
          </motion.div>
          <span className="text-xl">{companyInfo.contact.address}</span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-6 p-5 bg-gradient-to-r from-brand-pink/10 to-brand-green/10 rounded-lg border border-brand-pink/20 text-center"
        >
          <motion.p
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-lg font-medium"
          >
            We'd love to hear from you. Reach out today!
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  switch (type) {
    case 'team':
      return renderTeamContent();
    case 'ai':
      return renderAiResponse();
    case 'company':
      return renderCompanyInfo();
    case 'contact':
      return renderContactInfo();
    default:
      return null;
  }
};