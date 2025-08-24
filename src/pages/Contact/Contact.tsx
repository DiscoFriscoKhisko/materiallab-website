import { Layout } from '../../components/Layout/Layout';
import { ContactForm } from '../../components/ContactForm/ContactForm';
import { motion } from 'framer-motion';
import { MLText, MLHeading, MLCard } from '../../components/ML';

export const Contact = () => {
  return (
    <Layout>
      <div className="relative overflow-hidden bg-bg min-h-screen">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div 
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(800px 400px at 70% 0%, rgba(85,194,255,.10), transparent 60%),
                radial-gradient(600px 300px at 0% 20%, rgba(255,111,97,.08), transparent 55%),
                #0B0F1A
              `
            }}
          />
        </div>

        <section className="relative py-20 lg:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <MLHeading level={1} className="mb-6">
                Let's explore if we're a good fit
              </MLHeading>
              <MLText variant="bodyL" color="weak" className="max-w-2xl mx-auto">
                We work with growing teams who need quality software built fast. 
                Let's have a conversation—no pitch decks, no sales pressure.
              </MLText>
            </motion.div>

            {/* Contact Methods */}
            <motion.div
              className="grid md:grid-cols-3 gap-6 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <MLCard className="text-center p-6" hover={false}>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <MLHeading level={4} className="mb-2">Email</MLHeading>
                <MLText color="weak">hello@materiallab.io</MLText>
              </MLCard>

              <MLCard className="text-center p-6" hover={false}>
                <div className="w-12 h-12 bg-ion/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-ion" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <MLHeading level={4} className="mb-2">Response Time</MLHeading>
                <MLText color="weak">Within 24 hours</MLText>
              </MLCard>

              <MLCard className="text-center p-6" hover={false}>
                <div className="w-12 h-12 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <MLHeading level={4} className="mb-2">Timezone</MLHeading>
                <MLText color="weak">PST / EST friendly</MLText>
              </MLCard>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <MLCard className="p-8 lg:p-12">
                <ContactForm />
              </MLCard>
            </motion.div>

            {/* Qualification Section */}
            <motion.div
              className="mt-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <MLHeading level={3} className="mb-6 text-success">
                    We're great for you if:
                  </MLHeading>
                  <div className="space-y-4">
                    <MLText color="weak">• You know your customers and their problems deeply</MLText>
                    <MLText color="weak">• You need working software, not presentations</MLText>
                    <MLText color="weak">• You value quality and are willing to invest in it</MLText>
                    <MLText color="weak">• You want a partner, not a vendor</MLText>
                  </div>
                </div>
                <div>
                  <MLHeading level={3} className="mb-6 text-text-weak">
                    We're probably not right if:
                  </MLHeading>
                  <div className="space-y-4">
                    <MLText color="weak">• You need extensive compliance documentation</MLText>
                    <MLText color="weak">• You're looking for the cheapest option</MLText>
                    <MLText color="weak">• You want lengthy discovery phases</MLText>
                    <MLText color="weak">• You see technology as a necessary evil</MLText>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <MLHeading level={3} className="mb-8">
                Frequently Asked Questions
              </MLHeading>
              
              <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto">
                {[
                  {
                    q: "What's your typical project timeline?",
                    a: "Most projects take 6-16 weeks, depending on complexity. We'll provide a detailed timeline after our discovery call."
                  },
                  {
                    q: "Do you work with startups or enterprises?",
                    a: "Both! We've helped early-stage startups validate ideas and enterprises integrate AI into existing workflows."
                  },
                  {
                    q: "What if I'm not sure what I need?",
                    a: "Perfect! That's what our discovery process is for. We'll help you identify opportunities and define requirements."
                  },
                  {
                    q: "Do you provide ongoing support?",
                    a: "Yes, we offer maintenance, updates, and scaling support after launch. We're invested in your long-term success."
                  }
                ].map((faq, index) => (
                  <MLCard key={index} className="p-6" hover={false}>
                    <MLHeading level={5} className="mb-3">
                      {faq.q}
                    </MLHeading>
                    <MLText color="weak">
                      {faq.a}
                    </MLText>
                  </MLCard>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};