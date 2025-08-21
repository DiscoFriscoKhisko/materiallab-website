import { Placeholder } from '../Placeholder/Placeholder';

export const Work = () => {
  const sections = [
    {
      title: "Featured Case Studies",
      content: "Comprehensive portfolio showcasing our most impactful AI product implementations. Each case study will include detailed project timelines, technical challenges overcome, user metrics, and business outcomes achieved. From healthcare AI diagnostics to fintech fraud detection, explore how we transform ambitious ideas into market-leading products.",
      mediaDescription: "Interactive project showcase with before/after screenshots, client testimonial videos, technical architecture diagrams, and ROI metrics visualization"
    },
    {
      title: "Client Success Stories", 
      content: "Real testimonials and success metrics from our diverse client base. Features in-depth interviews with founders, CTOs, and product leaders who have partnered with MaterialLab. Each story highlights the unique challenges faced, solutions delivered, and long-term impact on their business growth and user satisfaction.",
      mediaDescription: "Video testimonials (30-60 seconds each), client logo carousel, growth charts, and key performance indicators dashboard"
    },
    {
      title: "Technical Deep Dives",
      content: "Behind-the-scenes look at our development process, architectural decisions, and technical innovations. Detailed breakdowns of complex AI implementations, performance optimizations, scalability solutions, and security measures. Perfect for technical stakeholders wanting to understand our engineering capabilities.",
      mediaDescription: "Code repository screenshots, system architecture diagrams, performance benchmarks, and technical documentation samples"
    },
    {
      title: "Industry Solutions",
      content: "Explore our expertise across various sectors including healthcare, fintech, e-commerce, and manufacturing. Each industry section showcases relevant case studies, regulatory compliance approaches, and sector-specific AI applications we've successfully deployed.",
      mediaDescription: "Industry-specific project galleries, compliance certification badges, and sector performance comparison charts"
    }
  ];

  return (
    <Placeholder
      title="Our Work & Portfolio"
      description="Discover how MaterialLab transforms innovative ideas into successful AI-powered products. Explore our portfolio of impactful projects, client success stories, and technical achievements across diverse industries."
      sections={sections}
      ctaText="Discuss Your Project"
    />
  );
};