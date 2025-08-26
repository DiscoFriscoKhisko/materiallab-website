import { useState } from 'react';
import { motion } from 'framer-motion';
import { MLText, MLHeading } from '../ML';
import { Button as VeoButton } from '../UI';
import { VeoArrowRightIcon } from '../VeoIcon';
import { Input as VeoInput, Textarea as VeoTextarea } from '../UI';

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: 'certain' | 'explorative' | 'consulting';
  message: string;
}

interface ContactFormProps {
  defaultProjectType?: 'certain' | 'explorative' | 'consulting';
  onClose?: () => void;
}

export const ContactForm = ({ defaultProjectType = 'certain', onClose }: ContactFormProps) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    projectType: defaultProjectType,
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, you would send the data to your backend
      console.log('Form submitted:', formData);
      
      setIsSubmitted(true);
      
      // Auto-close after success
      setTimeout(() => {
        onClose?.();
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          projectType: 'certain',
          message: '',
        });
      }, 3000);
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        className="text-center py-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        >
          <svg className="w-8 h-8 text-text-inverse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <MLHeading level={3} className="mb-2 text-success">Message Sent!</MLHeading>
        <MLText color="weak" className="text-center">
          Thanks for reaching out. We'll get back to you within 24 hours.
        </MLText>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <MLHeading level={2} className="mb-2">Let's Start a Conversation</MLHeading>
        <MLText color="weak">
          Tell us about your project and we'll get back to you within 24 hours.
        </MLText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VeoInput
          label="Name *"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          error={errors.name}
          placeholder="Your name"
          required
        />

        <VeoInput
          label="Email *"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={errors.email}
          placeholder="your@email.com"
          required
        />
      </div>

      <VeoInput
        label="Company"
        type="text"
        value={formData.company}
        onChange={(e) => handleInputChange('company', e.target.value)}
        placeholder="Your company (optional)"
      />

      <div className="space-y-2">
        <MLText variant="bodyS" className="font-medium">Project Type</MLText>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {[
            { value: 'certain', label: 'I know what I need', desc: 'Clear requirements' },
            { value: 'explorative', label: 'Exploring possibilities', desc: 'Need discovery' },
            { value: 'consulting', label: 'Consulting', desc: 'Strategy & advice' }
          ].map((type) => (
            <label
              key={type.value}
              className={`relative block p-3 rounded-lg border transition-all duration-base cursor-pointer ${
                formData.projectType === type.value
                  ? 'border-ion bg-ion-subtle'
                  : 'border-glass-light hover:border-ion-subtle hover:bg-glass-light'
              }`}
            >
              <input
                type="radio"
                name="projectType"
                value={type.value}
                checked={formData.projectType === type.value}
                onChange={(e) => handleInputChange('projectType', e.target.value)}
                className="sr-only"
              />
              <MLText variant="bodyS" className="font-medium block">
                {type.label}
              </MLText>
              <MLText variant="caption" color="weaker">
                {type.desc}
              </MLText>
            </label>
          ))}
        </div>
      </div>

      <VeoTextarea
        label="Message *"
        rows={4}
        value={formData.message}
        onChange={(e) => handleInputChange('message', e.target.value)}
        placeholder="Tell us about your project, goals, timeline, or any questions you have..."
        error={errors.message}
        required
      />

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <VeoButton
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          className="flex-1"
          disabled={isSubmitting}
          icon={<VeoArrowRightIcon />}
          iconPosition="right"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </VeoButton>
        
        {onClose && (
          <VeoButton
            type="button"
            variant="outline"
            size="lg"
            onClick={onClose}
          >
            Cancel
          </VeoButton>
        )}
      </div>

      <MLText variant="caption" color="weaker" className="text-center">
        We'll respond within 24 hours. Your information is kept confidential.
      </MLText>
    </motion.form>
  );
};