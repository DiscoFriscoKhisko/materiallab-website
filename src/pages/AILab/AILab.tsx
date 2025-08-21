import { Placeholder } from '../Placeholder/Placeholder';

export const AILab = () => {
  const sections = [
    {
      title: "Research & Development",
      content: "Our internal R&D initiatives exploring cutting-edge AI technologies and applications. Current research areas include multimodal AI interfaces, autonomous system optimization, and novel machine learning architectures. We publish findings, contribute to open source projects, and share insights with the AI community.",
      mediaDescription: "Research lab footage, experiment setup demonstrations, research paper visualizations, and technical presentation recordings"
    },
    {
      title: "Experimental Prototypes",
      content: "Interactive demonstrations of experimental AI applications and proof-of-concept projects. These prototypes showcase emerging possibilities in AI-human interaction, automated decision systems, and intelligent automation. Many of these experiments inform our client project approaches.",
      mediaDescription: "Interactive prototype demos, A/B testing result comparisons, user interaction recordings, and feature evolution time-lapses"
    },
    {
      title: "Open Source Contributions",
      content: "Tools, libraries, and frameworks developed by our team and shared with the community. Our open source projects focus on AI development utilities, data processing pipelines, and development workflow optimizations. We believe in contributing back to the ecosystem that enables our work.",
      mediaDescription: "Code repository showcases, contribution activity graphs, community engagement metrics, and tool usage demonstrations"
    },
    {
      title: "AI Innovation Workshops",
      content: "Educational content, workshops, and thought leadership in AI product development. We host technical talks, write detailed tutorials, and share insights from our project experiences. Topics range from technical implementation guides to strategic AI adoption frameworks.",
      mediaDescription: "Workshop session recordings, presentation slide galleries, tutorial video playlists, and community event photography"
    },
    {
      title: "Future Tech Previews",
      content: "Early explorations of emerging technologies like quantum machine learning, neuromorphic computing, and advanced AI safety measures. While experimental, these investigations help us stay at the forefront of technological advancement and prepare for future client needs.",
      mediaDescription: "Concept visualization videos, technology timeline graphics, expert interview clips, and speculative design mock-ups"
    }
  ];

  return (
    <Placeholder
      title="MaterialLab AI Lab"
      description="Our research and development hub where we explore the frontiers of AI technology. Discover our experimental projects, open source contributions, and insights that shape the future of AI product development."
      sections={sections}
      ctaText="Explore Our Research"
    />
  );
};