import { Layout } from '../../components/Layout/Layout';
import { MLHeading, MLText } from '../../components/ML';
import { Button as VeoButton } from '../../components/UI';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const About = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <MLHeading level={1} className="text-5xl md:text-6xl font-display font-bold mb-8">
              About MaterialLab
            </MLHeading>
            <MLText variant="bodyL" className="text-xl text-text-weak max-w-2xl mx-auto leading-relaxed">
              We're a team of engineers, designers, and AI researchers building the next generation of intelligent products.
            </MLText>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-surface-1">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <MLHeading level={2} className="text-4xl font-semibold mb-8">
                Our Mission
              </MLHeading>
              <MLText variant="body" className="text-lg text-text-weak leading-relaxed mb-6">
                We bridge the gap between AI research and practical product implementation. 
                Our team combines decades of experience in machine learning, product design, 
                and software engineering.
              </MLText>
              <MLText variant="body" className="text-lg text-text-weak leading-relaxed">
                We've witnessed the evolution of AI from academic curiosity to business necessity, 
                and we're here to help organizations navigate this transformation successfully.
              </MLText>
            </motion.div>
            <div className="bg-surface-2 rounded-xl p-8 h-64 flex items-center justify-center">
              <MLText variant="body" className="text-text-weaker">
                [Mission visual placeholder]
              </MLText>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <MLHeading level={2} className="text-4xl font-semibold mb-6">
              Our Values
            </MLHeading>
            <MLText variant="bodyL" className="text-xl text-text-weak max-w-2xl mx-auto">
              The principles that guide everything we build
            </MLText>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                title: "Human-Centered AI",
                description: "We believe AI should augment human capabilities, not replace human judgment. Our solutions prioritize user empowerment and transparency."
              },
              {
                title: "Ethical Development",
                description: "We're committed to building AI products that are explainable, fair, and beneficial to society while driving business value."
              },
              {
                title: "Continuous Learning",
                description: "We foster a culture where experimentation is encouraged and failure is treated as valuable learning. We invest in knowledge sharing."
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6"
              >
                <MLHeading level={3} className="text-2xl font-semibold mb-4">
                  {value.title}
                </MLHeading>
                <MLText variant="body" className="text-text-weak leading-relaxed">
                  {value.description}
                </MLText>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-surface-1">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <MLHeading level={2} className="text-4xl font-semibold mb-8">
            Ready to work together?
          </MLHeading>
          <MLText variant="bodyL" className="text-xl text-text-weak mb-12 max-w-2xl mx-auto">
            Let's discuss how our team can help bring your AI vision to life.
          </MLText>
          <VeoButton
            variant="primary"
            size="lg"
            onClick={() => navigate('/contact')}
            className="px-8 py-4 text-lg"
          >
            Get in Touch
          </VeoButton>
        </div>
      </section>
    </Layout>
  );
};