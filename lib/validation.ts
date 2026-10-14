import { z } from 'zod';

export const enquirySchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name is too long'),
  email: z
    .string()
    .email('Invalid email address')
    .max(254, 'Email is too long')
    .toLowerCase()
    .trim(),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number is too long')
    .regex(/^[+]?[\d\s()-]+$/, 'Phone number contains invalid characters'),
  company: z
    .string()
    .max(100, 'Company name is too long')
    .optional()
    .or(z.literal('')),
  city: z
    .string()
    .max(100, 'City is too long')
    .optional()
    .or(z.literal('')),
  service: z.enum([
    'web-design',
    'seo',
    'google-business-profile',
    'ai-automation',
    'whatsapp-workflows',
    'crm-integration',
    'analytics',
    'digital-marketing',
    'website-redesign',
    'headless-architecture',
    'landing-pages',
    'maintenance-security',
    'knowledge-chatbot',
    'llm-chatbot',
    'ai-receptionist',
    'human-handoff',
    'google-ads',
    'meta-ads',
    'social-media-reels',
    'email-marketing',
    'dashboards',
    'monthly-reporting',
    'accessibility-improvements',
    'accessibility-testing',
    'technical-support',
    'ai-content-updates',
    'api-maintenance',
    'other',
  ]),
  budget: z
    .enum(['under-25k', '25k-50k', '50k-1l', '1l-3l', '3l-plus', 'not-sure'])
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long'),
  // Honeypot — must be empty
  website: z
    .string()
    .max(0, 'Spam detected')
    .optional()
    .or(z.literal('')),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const loginSchema = z.object({
  email: z.string().email('Invalid email').toLowerCase().trim(),
  password: z.string().min(1, 'Password is required').max(128, 'Password is too long'),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const leadUpdateSchema = z.object({
  status: z.enum(['new', 'contacted', 'qualified', 'won', 'lost']).optional(),
  notes: z.string().max(5000, 'Notes are too long').optional().or(z.literal('')),
});

export type LeadUpdateInput = z.infer<typeof leadUpdateSchema>;

export const SERVICE_LABELS: Record<string, string> = {
  'web-design': 'Website Design & Development',
  'seo': 'SEO (Search Engine Optimization)',
  'google-business-profile': 'Google Business Profile',
  'ai-automation': 'AI Automation',
  'whatsapp-workflows': 'WhatsApp Workflows',
  'crm-integration': 'CRM Integration',
  'analytics': 'Analytics & Reporting',
  'digital-marketing': 'Digital Marketing',
  'website-redesign': 'Website Redesign',
  'headless-architecture': 'Headless Architecture',
  'landing-pages': 'Landing Pages',
  'maintenance-security': 'Maintenance & Security',
  'knowledge-chatbot': 'Knowledge Chatbot',
  'llm-chatbot': 'LLM Chatbot',
  'ai-receptionist': 'AI Receptionist / CSR',
  'human-handoff': 'Human Handoff',
  'google-ads': 'Google Ads',
  'meta-ads': 'Meta Ads (Facebook & Instagram)',
  'social-media-reels': 'Social Media & Reels',
  'email-marketing': 'Email Marketing',
  'dashboards': 'Dashboards',
  'monthly-reporting': 'Monthly Reporting',
  'accessibility-improvements': 'Accessibility Improvements',
  'accessibility-testing': 'Accessibility Testing',
  'technical-support': 'Technical Support',
  'ai-content-updates': 'AI & Content Updates',
  'api-maintenance': 'API Maintenance',
  'other': 'Other / Not sure',
};

export const BUDGET_LABELS: Record<string, string> = {
  'under-25k': 'Under ₹25,000',
  '25k-50k': '₹25,000 – ₹50,000',
  '50k-1l': '₹50,000 – ₹1,00,000',
  '1l-3l': '₹1,00,000 – ₹3,00,000',
  '3l-plus': '₹3,00,000+',
  'not-sure': 'Not sure yet',
};

export const STATUS_LABELS: Record<string, string> = {
  'new': 'New',
  'contacted': 'Contacted',
  'qualified': 'Qualified',
  'won': 'Won',
  'lost': 'Lost',
};
