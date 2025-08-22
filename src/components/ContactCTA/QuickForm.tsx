import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { MLText, MLHeading } from '../ML';
import { VeoButton, VeoArrowIcon } from '../VeoButton';

interface QuickFormData {
  name: string;
  company?: string;
  projectType: 'build' | 'automate' | 'explore' | '';
  budget: 'under-10k' | '10-50k' | '50k+' | '';
  timeline: 'asap' | '1-month' | '3-months' | '';
  description: string;
  contact: string; // email or phone
}

interface QuickFormProps {
  onSubmit: (data: QuickFormData) => void;
  className?: string;
}

const SuccessAnimation = () => (
  <motion.div
    className="flex flex-col items-center justify-center py-veo-8"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    {/* Checkmark */}
    <motion.div
      className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mb-veo-6"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.svg
        className="w-8 h-8 text-success"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 13l4 4L19 7" 
        />
      </motion.svg>
    </motion.div>

    <MLHeading level={4} className="mb-veo-3 text-success">
      Got it! We'll be in touch soon.
    </MLHeading>
    <MLText color="weak" className="text-center max-w-sm">
      We typically respond within 2 hours during business hours.
    </MLText>

    {/* Confetti */}
    {Array.from({ length: 12 }, (_, i) => (
      <motion.div
        key={i}
        className="absolute w-2 h-2 bg-primary rounded-full"
        initial={{ 
          x: 0, 
          y: 0,
          scale: 0,
          rotate: 0,
        }}
        animate={{
          x: (Math.random() - 0.5) * 200,
          y: (Math.random() - 0.5) * 200,
          scale: [0, 1, 0],
          rotate: Math.random() * 360,
        }}
        transition={{
          duration: 1.5,
          delay: i * 0.1,
          ease: "easeOut"
        }}
        style={{
          left: '50%',
          top: '50%',
        }}
      />
    ))}
  </motion.div>
);

export const QuickForm = ({ onSubmit, className = '' }: QuickFormProps) => {
  const [formData, setFormData] = useState<QuickFormData>({
    name: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    contact: '',
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof QuickFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  // Auto-save to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('materiallab-quick-form');
    if (saved) {
      try {
        setFormData(JSON.parse(saved));
      } catch {
        // Invalid saved data, ignore
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('materiallab-quick-form', JSON.stringify(formData));
  }, [formData]);

  const validateField = (name: keyof QuickFormData, value: string | undefined): string => {
    const val = value || '';
    switch (name) {
      case 'name':
        return val.length < 2 ? 'Name must be at least 2 characters' : '';
      case 'contact': {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
        return !emailRegex.test(val) && !phoneRegex.test(val) 
          ? 'Please enter a valid email or phone number' 
          : '';
      }
      case 'description':
        return val.length < 10 ? 'Please provide more details (at least 10 characters)' : '';
      case 'projectType':
        return !val ? 'Please select a project type' : '';
      default:
        return '';
    }
  };

  const handleChange = (name: keyof QuickFormData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (name: keyof QuickFormData, value: string) => {
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateStep = (stepNumber: number): boolean => {
    const stepFields: { [key: number]: (keyof QuickFormData)[] } = {
      1: ['name', 'contact'],
      2: ['projectType', 'description'],
    };

    const fieldsToValidate = stepFields[stepNumber] || [];
    let hasErrors = false;
    const newErrors: Partial<Record<keyof QuickFormData, string>> = {};

    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field] || '');
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });

    setErrors(prev => ({ ...prev, ...newErrors }));
    return !hasErrors;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(1) || !validateStep(2)) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      setIsSubmitted(true);
      localStorage.removeItem('materiallab-quick-form');
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ contact: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`quick-form-container relative ${className}`}>
        <SuccessAnimation />
      </div>
    );
  }

  return (
    <div className={`quick-form-container glow-gradient-secondary glow-noise p-veo-6 rounded-veo-2xl ${className}`}>
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-veo-6">
          <MLHeading level={4} className="mb-veo-3">
            Tell us about your project
          </MLHeading>
          <MLText color="weak" className="leading-relaxed">
            Just a few quick questions to get started. Takes 2 minutes.
          </MLText>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-between mb-veo-6">
          <div className="flex space-x-2">
            {[1, 2].map((stepNum) => (
              <motion.div
                key={stepNum}
                className={`
                  w-8 h-1 rounded-full transition-all duration-300
                  ${stepNum <= step ? 'bg-primary' : 'bg-on-surface/20'}
                `}
                initial={{ width: 0 }}
                animate={{ width: 32 }}
                transition={{ duration: 0.3, delay: stepNum * 0.1 }}
              />
            ))}
          </div>
          <MLText variant="label" color="weak">
            Step {step} of 2
          </MLText>
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-veo-4"
              >
                {/* Name */}
                <div>
                  <MLText variant="bodyS" className="block font-medium text-on-surface mb-veo-2">
                    Your name *
                  </MLText>
                  <motion.input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={(e) => handleBlur('name', e.target.value)}
                    className={`
                      w-full px-veo-4 py-veo-3 rounded-veo-lg bg-surface border
                      ${errors.name ? 'border-error' : 'border-outline-variant'}
                      focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
                      transition-all duration-200
                    `}
                    placeholder="Enter your full name"
                    whileFocus={{ scale: 1.02 }}
                  />
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-error text-sm mt-1"
                    >
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                {/* Contact */}
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-veo-2">
                    Email or phone *
                  </label>
                  <motion.input
                    type="text"
                    value={formData.contact}
                    onChange={(e) => handleChange('contact', e.target.value)}
                    onBlur={(e) => handleBlur('contact', e.target.value)}
                    className={`
                      w-full px-veo-4 py-veo-3 rounded-veo-lg bg-surface border
                      ${errors.contact ? 'border-error' : 'border-outline-variant'}
                      focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
                      transition-all duration-200
                    `}
                    placeholder="email@example.com or +1 (555) 123-4567"
                    whileFocus={{ scale: 1.02 }}
                  />
                  {errors.contact && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-error text-sm mt-1"
                    >
                      {errors.contact}
                    </motion.p>
                  )}
                </div>

                {/* Company (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-veo-2">
                    Company (optional)
                  </label>
                  <motion.input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className="w-full px-veo-4 py-veo-3 rounded-veo-lg bg-surface border border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-200"
                    placeholder="Your company name"
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                <VeoButton
                  type="button"
                  onClick={handleNext}
                  variant="primary"
                  size="lg"
                  className="w-full"
                  icon={<VeoArrowIcon />}
                  iconPosition="right"
                >
                  Next
                </VeoButton>
              </motion.div>
            )}

            {/* Step 2: Project Details */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-veo-4"
              >
                {/* Project Type */}
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-veo-3">
                    What type of project? *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { value: 'build', label: 'Build MVP', desc: 'Create from scratch' },
                      { value: 'automate', label: 'Add AI', desc: 'Automate processes' },
                      { value: 'explore', label: 'Explore', desc: 'Research options' },
                    ].map((option) => (
                      <motion.label
                        key={option.value}
                        className={`
                          relative flex flex-col p-4 rounded-veo-lg border cursor-pointer
                          ${formData.projectType === option.value
                            ? 'border-primary bg-primary/5'
                            : 'border-outline-variant hover:border-primary/50'
                          }
                          transition-all duration-200
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <input
                          type="radio"
                          name="projectType"
                          value={option.value}
                          checked={formData.projectType === option.value}
                          onChange={(e) => handleChange('projectType', e.target.value)}
                          className="sr-only"
                        />
                        <span className="font-medium text-sm">{option.label}</span>
                        <span className="text-xs text-on-surface-variant mt-1">{option.desc}</span>
                        {formData.projectType === option.value && (
                          <motion.div
                            className="absolute top-2 right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        )}
                      </motion.label>
                    ))}
                  </div>
                  {errors.projectType && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-error text-sm mt-2"
                    >
                      {errors.projectType}
                    </motion.p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-on-surface mb-veo-2">
                    Tell us more *
                  </label>
                  <motion.textarea
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    onBlur={(e) => handleBlur('description', e.target.value)}
                    rows={4}
                    className={`
                      w-full px-veo-4 py-veo-3 rounded-veo-lg bg-surface border resize-none
                      ${errors.description ? 'border-error' : 'border-outline-variant'}
                      focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
                      transition-all duration-200
                    `}
                    placeholder="Describe your project, goals, or what you'd like to explore..."
                    whileFocus={{ scale: 1.01 }}
                  />
                  {errors.description && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-error text-sm mt-1"
                    >
                      {errors.description}
                    </motion.p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <VeoButton
                    type="button"
                    onClick={() => setStep(step - 1)}
                    variant="outline"
                    size="lg"
                    className="flex-1"
                  >
                    Back
                  </VeoButton>
                  <VeoButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="flex-1"
                    disabled={isSubmitting}
                    loading={isSubmitting}
                    icon={
                      !isSubmitting ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      ) : undefined
                    }
                    iconPosition="right"
                  >
                    {isSubmitting ? 'Sending...' : 'Send'}
                  </VeoButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
};