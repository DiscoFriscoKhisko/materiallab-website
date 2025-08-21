import { Placeholder } from '../Placeholder/Placeholder';

export const Approach = () => {
  const sections = [
    {
      title: "Discovery-Driven Development",
      content: "Our methodology begins with deep discovery to understand your users, market, and technical constraints. We conduct stakeholder interviews, user research, competitive analysis, and technical feasibility studies. This foundation ensures every development decision is informed by real data and user needs.",
      mediaDescription: "Discovery workshop session recordings, user interview compilation videos, competitive analysis visualization, and stakeholder mapping exercises"
    },
    {
      title: "Agile AI Integration",
      content: "We adapt agile methodologies specifically for AI product development, accounting for the unique challenges of machine learning workflows, data dependencies, and model iteration cycles. Our sprints include dedicated time for experimentation, model training, and validation.",
      mediaDescription: "Sprint planning session videos, Kanban board walkthroughs, retrospective meeting highlights, and development velocity tracking dashboards"
    },
    {
      title: "User-Centered AI Design",
      content: "Our design philosophy puts human needs at the center of AI product development. We focus on creating transparent, trustworthy, and accessible AI experiences. Every interface decision is validated through user testing and informed by AI ethics best practices.",
      mediaDescription: "User testing session recordings, accessibility audit demonstrations, design iteration evolution videos, and ethics review process documentation"
    },
    {
      title: "Technical Excellence Standards",
      content: "We maintain rigorous technical standards including comprehensive testing, security by design, performance optimization, and scalable architecture patterns. Our code review process, CI/CD pipelines, and monitoring systems ensure reliable, maintainable products.",
      mediaDescription: "Code review process demonstrations, automated testing pipeline visualizations, security audit walkthroughs, and performance optimization before/after comparisons"
    },
    {
      title: "Continuous Learning & Adaptation",
      content: "Post-launch, we implement robust analytics and feedback systems to continuously improve product performance and user satisfaction. Our approach includes A/B testing frameworks, user behavior analysis, and iterative model improvements based on real-world usage data.",
      mediaDescription: "Analytics dashboard tours, A/B testing result presentations, user feedback analysis sessions, and product evolution timeline visualizations"
    }
  ];

  return (
    <Placeholder
      title="Our Approach"
      description="Discover our proven methodology for AI product development that combines rigorous discovery, user-centered design, technical excellence, and continuous improvement to deliver products that truly work."
      sections={sections}
      ctaText="Learn About Our Process"
    />
  );
};