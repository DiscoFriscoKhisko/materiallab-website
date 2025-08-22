import { motion } from 'framer-motion';
import { MLText } from '../ML';

export const ProofStrip = () => {
  const metrics = [
    'MVP in 2 Weeks',
    '3× Faster to Production',
    'Up to 80% Ops Hours Reduced'
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-surface/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <MLText 
                variant="bodyL" 
                className="font-medium text-text"
              >
                {metric}
              </MLText>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MLText variant="caption" color="weaker" className="italic">
            Baselines and measurement criteria are established during our initial Discovery phase to ensure transparent, measurable results.
          </MLText>
        </motion.div>
      </div>
    </section>
  );
};