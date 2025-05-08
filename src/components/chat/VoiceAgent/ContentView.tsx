import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Users, Building, Phone, BookOpen, Lightbulb } from 'lucide-react';
import Markdown from 'react-markdown';
import { TeamMember } from '@/DataModels/TeamDataModel';
import { DynamicCard } from '@/components/chat/VoiceAgent/DynamicCard';
import { BlogContent } from '@/DataModels/MaslowInfoDataModel';

interface ContentViewProps {
  type: 'ai' | 'team' | 'company' | 'contact' | 'blog' | 'capabilities' | null | undefined;
  response?: string;
  transcript?: string;
  teamData?: TeamMember[];
  additionalInfo?: {
    blogInfo?: BlogContent;
    title?: string;
    aiCapabilities?: string[];
    productivityTools?: string[];
  };
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
  teamData,
  additionalInfo
}) => {
  // Team Info
  const renderTeamContent = () => (
    <DynamicCard
      title="Team"
      items={teamData?.map(member => ({
        title: member.name,
        description: member.role,
        content: member.bio,
        image: member.imageUrl
      })) || []}
      icon={Users}
      layout="grid"
    />
  );

  // Company Info
  const renderCompanyContent = () => (
    <DynamicCard
      title="Company"
      items={[{ content: companyInfo.description }]}
      icon={Building}
      layout="vertical"
      contentAlignment="center"
    />
  );

  // Contact Info
  const renderContactContent = () => (
    <DynamicCard
      title="Contact"
      items={[
        { title: 'Email', content: companyInfo.contact.email },
        { title: 'Phone', content: companyInfo.contact.phone },
        { title: 'Address', content: companyInfo.contact.address }
      ]}
      icon={Phone}
      layout="vertical"
    />
  );

  // Blog Content
  const renderBlogContent = () => {
    if (!additionalInfo?.blogInfo) return null;
    
    const blogInfo = additionalInfo.blogInfo;
    const blogItems = [];
    
    // Add title as first item
    if (blogInfo.title) {
      blogItems.push({ 
        title: blogInfo.title,
        content: '',
        isHeading: true
      });
    }
    
    // Add sections
    if (blogInfo.sections) {
      blogInfo.sections.forEach((section) => {
        // Add section heading
        blogItems.push({
          title: section.heading,
          content: section.content.join('\n\n'),
          isSubheading: true
        });
        
        // Add subsections if they exist
        if (section.subsections) {
          section.subsections.forEach((subsection) => {
            blogItems.push({
              title: subsection.heading,
              content: subsection.content.join('\n\n'),
              isSubsection: true
            });
          });
        }
      });
    }
    
    return (
      <DynamicCard
        title={additionalInfo?.title || "Blog"}
        items={blogItems}
        icon={BookOpen}
        layout="vertical"
        contentAlignment="left"
      />
    );
  };

  // AI Capabilities Content
  const renderCapabilitiesContent = () => {
    const capabilityItems = [];
    
    if (additionalInfo?.aiCapabilities && additionalInfo.aiCapabilities.length > 0) {
      capabilityItems.push({
        title: "AI Capabilities",
        content: "",
        isHeading: true
      });
      
      additionalInfo.aiCapabilities.forEach(capability => {
        capabilityItems.push({
          content: capability
        });
      });
    }
    
    if (additionalInfo?.productivityTools && additionalInfo.productivityTools.length > 0) {
      capabilityItems.push({
        title: "Productivity Tools",
        content: "",
        isHeading: true
      });
      
      additionalInfo.productivityTools.forEach(tool => {
        capabilityItems.push({
          content: tool
        });
      });
    }
    
    return (
      <DynamicCard
        title="Maslow AI Capabilities"
        items={capabilityItems}
        icon={Lightbulb}
        layout="vertical"
        contentAlignment="left"
      />
    );
  };

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
              <Bot className="w-6 h-6 text-brand-pink" />
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

  switch (type) {
    case 'team':
      return renderTeamContent();
    case 'company':
      return renderCompanyContent();
    case 'contact':
      return renderContactContent();
    case 'blog':
      return renderBlogContent();
    case 'capabilities':
      return renderCapabilitiesContent();
    case 'ai':
      return renderAiResponse();
    default:
      return null;
  }
};