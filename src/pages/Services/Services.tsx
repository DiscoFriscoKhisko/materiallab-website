import { Placeholder } from '../Placeholder/Placeholder';

export const Services = () => {
  const sections = [
    {
      title: "AI Product Development",
      content: "End-to-end development services for AI-powered products. From initial concept validation and technical feasibility assessment to full-scale development and deployment. Our team handles everything including data pipeline architecture, ML model development, user interface design, and cloud infrastructure setup.",
      mediaDescription: "Interactive service process visualization, technology stack demonstrations, development timeline examples, and team collaboration videos"
    },
    {
      title: "Discovery & Strategy",
      content: "Comprehensive discovery workshops to identify AI opportunities within your business. We conduct market research, user interviews, technical audits, and competitive analysis to create a strategic roadmap. Includes opportunity prioritization, technical requirements definition, and go-to-market strategy development.",
      mediaDescription: "Workshop session footage, strategy framework diagrams, opportunity assessment templates, and roadmap visualization tools"
    },
    {
      title: "Design & User Experience",
      content: "User-centered design for AI products that are both powerful and intuitive. Our design process includes user research, information architecture, interaction design, and usability testing. We specialize in making complex AI functionality accessible through elegant, purpose-built interfaces.",
      mediaDescription: "Design process time-lapse videos, before/after interface comparisons, user testing session recordings, and interactive design system showcases"
    },
    {
      title: "Technical Implementation", 
      content: "Full-stack development with modern technologies and AI integration. Our technical services include cloud architecture, API development, database design, AI model training and deployment, security implementation, and performance optimization. Built for scale from day one.",
      mediaDescription: "Live coding demonstrations, system architecture walkthroughs, deployment pipeline visualizations, and performance monitoring dashboards"
    },
    {
      title: "Support & Scaling",
      content: "Ongoing maintenance, feature development, and scaling support. Post-launch services include performance monitoring, user analytics, iterative improvements, new feature development, and technical support. We provide dedicated account management and priority support channels.",
      mediaDescription: "Analytics dashboard examples, feature release showcases, support ticket resolution metrics, and scaling success story visualizations"
    }
  ];

  return (
    <Placeholder
      title="Our Services"
      description="Comprehensive AI product development services designed to take your vision from concept to scale. We provide end-to-end support with expertise in discovery, design, development, and ongoing optimization."
      sections={sections}
      ctaText="Get Service Details"
    />
  );
};