import { Layout } from '../../components/Layout/Layout';
import { motion } from 'framer-motion';
import { MLButton, MLText, MLHeading } from '../../components/ML';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="relative overflow-hidden bg-bg min-h-screen flex items-center justify-center">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/20 to-ion/20 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MLHeading level={1} className="mb-6 bg-gradient-to-r from-primary to-ion bg-clip-text text-transparent">
                404
              </MLHeading>
            </motion.div>
            
            <MLHeading level={2} className="mb-6">
              Page Not Found
            </MLHeading>
            
            <MLText variant="bodyL" color="weak" className="mb-12">
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back to exploring our AI solutions.
            </MLText>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MLButton
                variant="filled"
                size="lg"
                onClick={() => navigate('/')}
                iconRight={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                }
              >
                Go Home
              </MLButton>
              
              <MLButton
                variant="outlined"
                size="lg"
                onClick={() => navigate('/contact')}
              >
                Contact Us
              </MLButton>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};