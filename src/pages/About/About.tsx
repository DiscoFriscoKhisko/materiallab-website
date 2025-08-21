import { Placeholder } from '../Placeholder/Placeholder';

export const About = () => {
  const sections = [
    {
      title: "Our Story",
      content: "MaterialLab was founded with a mission to bridge the gap between AI research and practical product implementation. Our team combines decades of experience in machine learning, product design, and software engineering. We've witnessed the evolution of AI from academic curiosity to business necessity, and we're here to help organizations navigate this transformation successfully.",
      mediaDescription: "Company founding story video, timeline visualization of key milestones, office culture montage, and founder interview recordings"
    },
    {
      title: "Team & Expertise",
      content: "Our interdisciplinary team includes ML engineers, product designers, full-stack developers, and AI researchers. Team members have previously worked at leading tech companies and research institutions. We combine deep technical expertise with practical business acumen to deliver products that are both innovative and commercially viable.",
      mediaDescription: "Team member portrait galleries, expertise visualization charts, collaborative work session videos, and individual team member introduction clips"
    },
    {
      title: "Values & Philosophy",
      content: "We believe AI should augment human capabilities, not replace human judgment. Our development philosophy emphasizes transparency, ethical AI practices, and user empowerment. We're committed to building AI products that are explainable, fair, and beneficial to society while driving business value for our clients.",
      mediaDescription: "Company values visualization, ethical AI framework demonstrations, diversity and inclusion showcases, and community involvement documentation"
    },
    {
      title: "Culture & Work Style",
      content: "We foster a collaborative, learning-oriented culture where experimentation is encouraged and failure is treated as valuable learning. Our distributed team works across time zones with flexible schedules, prioritizing outcomes over hours. We invest heavily in continuous learning and knowledge sharing.",
      mediaDescription: "Remote work setup tours, team collaboration tool demonstrations, learning session recordings, and work-life balance showcase videos"
    },
    {
      title: "Community & Impact",
      content: "Beyond client work, we're active in the AI and tech community through open source contributions, speaking at conferences, mentoring emerging developers, and supporting AI education initiatives. We believe in using our expertise to contribute to the broader advancement of AI technology and literacy.",
      mediaDescription: "Conference speaking clips, mentorship program highlights, open source project showcases, and community event participation documentation"
    }
  ];

  return (
    <Placeholder
      title="About MaterialLab"
      description="Learn about our team, values, and mission to make AI products that actually work. We're a group of passionate technologists, designers, and researchers committed to bridging the gap between AI potential and practical implementation."
      sections={sections}
      ctaText="Meet Our Team"
    />
  );
};