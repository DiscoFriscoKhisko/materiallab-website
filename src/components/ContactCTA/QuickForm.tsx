import { motion } from 'framer-motion';
import { useState } from 'react';
import { MLText, MLHeading } from '../ML';
import { Button } from '../UI';
import { Input, Textarea, Select } from '../UI';

interface FormData {
  name: string;
  company?: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  contact: string;
}

interface QuickFormProps {
  onSubmit: (data: FormData) => void;
  className?: string;
}

export const QuickForm = ({ onSubmit, className = '' }: QuickFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    contact: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
      setIsSuccess(true);
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSuccess) {
    return (
      <motion.div
        className={`text-center p-8 ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <MLHeading level={4} className="mb-2 text-success">
          Thank you! We'll be in touch soon.
        </MLHeading>
        <MLText color="weak">
          We typically respond within 2 hours during business hours.
        </MLText>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`space-y-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Name"
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          required
        />
        <Input
          label="Company (optional)"
          value={formData.company}
          onChange={(e) => updateField('company', e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Select
          label="Project Type"
          value={formData.projectType}
          onChange={(e) => updateField('projectType', e.target.value)}
          options={[
            { value: '', label: 'Select type' },
            { value: 'build', label: 'Build AI Product' },
            { value: 'automate', label: 'Automate Process' },
            { value: 'explore', label: 'Explore Options' },
          ]}
          required
        />
        <Select
          label="Budget"
          value={formData.budget}
          onChange={(e) => updateField('budget', e.target.value)}
          options={[
            { value: '', label: 'Select budget' },
            { value: 'under-10k', label: 'Under $10k' },
            { value: '10-50k', label: '$10k - $50k' },
            { value: '50k+', label: '$50k+' },
          ]}
          required
        />
        <Select
          label="Timeline"
          value={formData.timeline}
          onChange={(e) => updateField('timeline', e.target.value)}
          options={[
            { value: '', label: 'Select timeline' },
            { value: 'asap', label: 'ASAP' },
            { value: '1-month', label: '1 Month' },
            { value: '3-months', label: '3 Months' },
          ]}
          required
        />
      </div>

      <Textarea
        label="Project Description"
        value={formData.description}
        onChange={(e) => updateField('description', e.target.value)}
        placeholder="Tell us about your project, goals, and any specific requirements..."
        required
      />

      <Input
        label="Email or Phone"
        value={formData.contact}
        onChange={(e) => updateField('contact', e.target.value)}
        type="email"
        placeholder="your@email.com"
        required
      />

      <Button
        type="submit"
        variant="filled"
        size="lg"
        fullWidth
        loading={isSubmitting}
        disabled={!formData.name || !formData.contact || !formData.description}
      >
        {isSubmitting ? 'Sending...' : 'Get Started'}
      </Button>
    </motion.form>
  );
};