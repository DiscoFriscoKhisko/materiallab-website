import { motion } from 'framer-motion';
import { WhatsAppCTA } from './WhatsAppCTA';
import { QuickForm } from './QuickForm';
import { MLSectionTitle } from '../ML';

interface ContactSplitProps {
  whatsappNumber: string;
  onFormSubmit: (data: any) => void;
  className?: string;
}

export const ContactSplit = ({ 
  whatsappNumber, 
  onFormSubmit, 
  className = '' 
}: ContactSplitProps) => {
  return (
    <section className={`contact-split-section py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <MLSectionTitle
            variant="headline"
            align="center"
            animate={true}
            subtitle="Choose the best way to start your journey with us"
            className="mb-8"
          >
            Ready to get started?
          </MLSectionTitle>
        </motion.div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* WhatsApp CTA - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Option Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center text-[#25D366] font-bold text-sm">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg text-on-surface">
                  Quick chat
                </h3>
                <p className="text-sm text-on-surface-variant">
                  Perfect for simple questions
                </p>
              </div>
            </div>

            <WhatsAppCTA
              phoneNumber={whatsappNumber}
              message="Hi MaterialLab! I'd like to discuss a project."
              variant="card"
            />

            {/* Benefits */}
            <motion.div
              className="space-y-3 pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {[
                'Instant responses during business hours',
                'Share files, images, or voice notes',
                'Direct line to our team',
                'No forms to fill',
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="flex items-center gap-3 text-sm text-on-surface-variant"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Form - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Option Label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg text-on-surface">
                  Detailed inquiry
                </h3>
                <p className="text-sm text-on-surface-variant">
                  For complex projects requiring planning
                </p>
              </div>
            </div>

            <QuickForm onSubmit={onFormSubmit} />

            {/* Benefits */}
            <motion.div
              className="space-y-3 pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {[
                'Structured project discussion',
                'Detailed proposal with timeline',
                'Budget and scope clarity',
                'Priority response within 2 hours',
              ].map((benefit, index) => (
                <motion.div
                  key={benefit}
                  className="flex items-center gap-3 text-sm text-on-surface-variant"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span>{benefit}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Note */}
        <motion.div
          className="text-center mt-16 pt-8 border-t border-outline-variant"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-sm text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Not sure which option to choose? Start with WhatsApp for a quick conversation, 
            or use the form if you have detailed requirements. We're here to help either way.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 mt-6 text-xs text-on-surface-variant">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span>Usually responds in 2 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Free consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-warning" />
              <span>No spam, ever</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating WhatsApp FAB for mobile */}
      <div className="lg:hidden">
        <WhatsAppCTA
          phoneNumber={whatsappNumber}
          message="Hi MaterialLab! I'm interested in your services."
          variant="fab"
        />
      </div>
    </section>
  );
};