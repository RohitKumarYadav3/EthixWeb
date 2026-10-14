import {
  Globe, Bot, TrendingUp, BarChart3, Shield, Wrench,
  type LucideIcon,
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  problem: string;
  deliverables: string[];
  benefits: string[];
  integrations?: string[];
}

export interface ServiceCategory {
  id: string;
  label: string;
  icon: LucideIcon;
  tagline: string;
  services: ServiceItem[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'websites',
    label: 'Websites',
    icon: Globe,
    tagline: 'Conversion-focused websites, redesigns, landing pages, and maintenance.',
    services: [
      {
        id: 'website-redesign',
        title: 'Website Redesign',
        desc: 'Modernize the experience, messaging, and conversion flow of an existing site.',
        problem: 'Your current website looks dated, loads slowly, or does not convert visitors into enquiries.',
        deliverables: ['Full visual redesign', 'Updated copy and messaging', 'Conversion-optimized layouts', 'Mobile-first responsive build', 'SEO migration plan'],
        benefits: ['Higher engagement and enquiry rates', 'Faster page loads', 'A look that matches your brand today'],
      },
      {
        id: 'headless-architecture',
        title: 'Headless Architecture',
        desc: 'Flexible frontend and content architecture where appropriate, enabling speed and scalability.',
        problem: 'Your CMS-driven site is slow, hard to extend, or limited in what it can display.',
        deliverables: ['Decoupled frontend build', 'Content modeling strategy', 'API-based content delivery', 'Performance optimization'],
        benefits: ['Significantly faster load times', 'Easier to scale and extend', 'Content team can publish without touching code'],
      },
      {
        id: 'landing-pages',
        title: 'Landing Pages',
        desc: 'Focused pages for ad campaigns, product launches, and lead generation.',
        problem: 'Your ad traffic lands on a generic homepage and bounces without converting.',
        deliverables: ['Campaign-specific landing pages', 'A/B test-ready variants', 'Form and tracking integration', 'Fast deployment'],
        benefits: ['Higher conversion from paid traffic', 'Lower cost per lead', 'Clear measurement of campaign performance'],
      },
      {
        id: 'maintenance-security',
        title: 'Maintenance & Security',
        desc: 'Updates, monitoring, and ongoing protection for your website.',
        problem: 'Your site is outdated, has broken links, or you worry about security vulnerabilities.',
        deliverables: ['Regular updates and patches', 'Uptime monitoring', 'Security hardening', 'Backup management', 'Monthly health report'],
        benefits: ['Peace of mind knowing your site is protected', 'No surprise downtime', 'Always running the latest, safest version'],
      },
    ],
  },
  {
    id: 'ai',
    label: 'AI',
    icon: Bot,
    tagline: 'Knowledge chatbots, AI agents, receptionist workflows, and human handoff.',
    services: [
      {
        id: 'knowledge-chatbot',
        title: 'Knowledge Chatbot',
        desc: 'Answer questions from an approved FAQ or knowledge base automatically.',
        problem: 'Your team answers the same questions repeatedly — about hours, pricing, services, or policies.',
        deliverables: ['Chatbot widget for your website', 'Knowledge base setup from your FAQs', 'Conversation logging', 'Weekly unanswered-question report'],
        benefits: ['Instant answers for visitors', 'Reduced repetitive enquiries for your team', '24/7 availability'],
      },
      {
        id: 'llm-chatbot',
        title: 'LLM Chatbot',
        desc: 'Contextual responses grounded in your business information for more natural conversations.',
        problem: 'A simple FAQ bot is not enough — customers ask nuanced questions that need contextual understanding.',
        deliverables: ['LLM-powered chatbot with your business context', 'Guardrails for safe responses', 'Conversation analytics', 'Integration with your enquiry system'],
        benefits: ['Handles complex, multi-turn questions', 'Feels like talking to a knowledgeable assistant', 'Routes serious enquiries to your team'],
      },
      {
        id: 'ai-receptionist',
        title: 'AI Receptionist / CSR',
        desc: 'Handle enquiries, qualify requests, and support booking workflows.',
        problem: 'You miss calls and enquiries outside business hours, or your front desk is overwhelmed.',
        deliverables: ['AI receptionist on web and WhatsApp', 'Lead qualification logic', 'Appointment booking integration', 'Automated follow-up messages'],
        benefits: ['Never miss an enquiry', 'Qualified leads reach your team faster', 'Bookings happen even after hours'],
        integrations: ['WhatsApp Business API', 'Google Calendar', 'CRM'],
      },
      {
        id: 'human-handoff',
        title: 'Human Handoff',
        desc: 'Route complex or sensitive conversations to a person seamlessly.',
        problem: 'Your AI bot handles common questions but some conversations need a human touch.',
        deliverables: ['Handoff logic based on conversation signals', 'Notification system for your team', 'Full conversation history transfer', 'Fallback response configuration'],
        benefits: ['Customers always get the right level of help', 'Your team focuses on high-value conversations', 'No frustrating dead-ends with the bot'],
        integrations: ['WhatsApp', 'Email', 'CRM'],
      },
    ],
  },
  {
    id: 'growth',
    label: 'Growth',
    icon: TrendingUp,
    tagline: 'SEO, Google Ads, Meta Ads, social, email, and CRM integration.',
    services: [
      {
        id: 'seo',
        title: 'SEO',
        desc: 'Technical optimization, content, and organic visibility on Google.',
        problem: 'Your website does not appear when potential customers search for your services.',
        deliverables: ['Technical site audit', 'Keyword research and strategy', 'On-page optimization', 'Content recommendations', 'Monthly ranking report'],
        benefits: ['More organic traffic over time', 'Higher visibility for local searches', 'Sustainable, compounding growth'],
      },
      {
        id: 'google-ads',
        title: 'Google Ads',
        desc: 'Campaign setup, conversion tracking, and ongoing optimization.',
        problem: 'You are spending on Google Ads but not sure if it is driving real enquiries.',
        deliverables: ['Campaign structure and setup', 'Conversion tracking', 'Ad copy and extensions', 'Bid management', 'Monthly performance review'],
        benefits: ['Targeted traffic from high-intent searches', 'Clear ROI on ad spend', 'Optimized budget allocation'],
      },
      {
        id: 'meta-ads',
        title: 'Meta Ads',
        desc: 'Facebook and Instagram campaigns for awareness and conversion.',
        problem: 'Your customers are on Facebook and Instagram, but you do not have a structured ad strategy.',
        deliverables: ['Audience research and targeting', 'Ad creative direction', 'Campaign setup and management', 'Conversion tracking', 'Monthly performance report'],
        benefits: ['Reach customers where they spend time', 'Build brand awareness', 'Drive targeted traffic to your site or offers'],
      },
      {
        id: 'social-media-reels',
        title: 'Social Media & Reels',
        desc: 'Content planning and creative production for social channels.',
        problem: 'You know you should post regularly, but you lack a strategy and consistent content.',
        deliverables: ['Monthly content calendar', 'Reel and post creation', 'Caption and hashtag strategy', 'Performance reporting'],
        benefits: ['Consistent, professional social presence', 'More engagement from your audience', 'Content that supports your growth goals'],
      },
      {
        id: 'email-marketing',
        title: 'Email Marketing',
        desc: 'Segmented campaigns and automated follow-ups.',
        problem: 'You collect customer emails but never use them, or your emails feel generic.',
        deliverables: ['Email template design', 'Audience segmentation', 'Automated drip sequences', 'Campaign performance tracking'],
        benefits: ['Repeat business from existing customers', 'Nurture leads until they are ready to buy', 'Low-cost, high-ROI channel'],
      },
      {
        id: 'crm-integration',
        title: 'CRM Integration',
        desc: 'Connect lead forms, pipelines, and business tools into one system.',
        problem: 'Leads come in from multiple channels and you have no single view of your pipeline.',
        deliverables: ['CRM setup or integration', 'Lead capture from website and WhatsApp', 'Pipeline stages and automation', 'Team training and documentation'],
        benefits: ['No lead falls through the cracks', 'Clear visibility into your sales pipeline', 'Automated follow-ups save time'],
        integrations: ['HubSpot', 'Zoho', 'Notion', 'Custom APIs'],
      },
    ],
  },
  {
    id: 'data',
    label: 'Data',
    icon: BarChart3,
    tagline: 'Dashboards, analytics, tracking, and monthly reporting.',
    services: [
      {
        id: 'dashboards',
        title: 'Dashboards',
        desc: 'Consolidated business performance views in one place.',
        problem: 'Your data is scattered across Google Analytics, ads, CRM, and WhatsApp — nothing connects.',
        deliverables: ['Custom dashboard design', 'Data source integration', 'Key metric selection', 'Automated data refresh'],
        benefits: ['See your entire business at a glance', 'Make faster, data-driven decisions', 'No more manual spreadsheet work'],
        integrations: ['GA4', 'Google Ads', 'Meta Ads', 'CRM'],
      },
      {
        id: 'analytics',
        title: 'Analytics',
        desc: 'Website, campaign, and conversion tracking setup and configuration.',
        problem: 'You do not know which channels drive enquiries or how visitors behave on your site.',
        deliverables: ['GA4 and GTM setup', 'Conversion event tracking', 'Goal funnels', 'Cross-domain tracking if needed'],
        benefits: ['Know exactly what is working', 'Attribute enquiries to the right channel', 'Optimize spend based on real data'],
        integrations: ['GA4', 'Google Tag Manager', 'Google Search Console'],
      },
      {
        id: 'monthly-reporting',
        title: 'Monthly Reporting',
        desc: 'Clear reports that explain performance, changes, and next actions.',
        problem: 'You get data but no context — numbers without understanding what they mean or what to do next.',
        deliverables: ['Monthly performance report', 'Plain-language summary of changes', 'Actionable recommendations', '30-minute review call'],
        benefits: ['Always know where you stand', 'Clear next steps every month', 'No jargon — just useful insight'],
      },
    ],
  },
  {
    id: 'accessibility',
    label: 'Accessibility',
    icon: Shield,
    tagline: 'Improve and test your site for all users.',
    services: [
      {
        id: 'accessibility-improvements',
        title: 'Accessibility Improvements',
        desc: 'Improve structure, contrast, and navigation for users of all abilities.',
        problem: 'Your site may be difficult for users with disabilities to navigate, which limits your audience and creates legal risk.',
        deliverables: ['Accessibility audit', 'Code and design fixes', 'Keyboard navigation improvements', 'Screen reader compatibility', 'Contrast and readability improvements'],
        benefits: ['Reach a wider audience', 'Comply with accessibility guidelines', 'Better SEO as a side benefit'],
      },
      {
        id: 'accessibility-testing',
        title: 'Accessibility Testing',
        desc: 'Evaluate common accessibility issues and get a clear remediation plan.',
        problem: 'You want to know where your site stands on accessibility before committing to fixes.',
        deliverables: ['Automated and manual testing', 'WCAG checklist report', 'Prioritized remediation plan', 'Stakeholder debrief'],
        benefits: ['Clear understanding of current state', 'Know exactly what to fix and in what order', 'Demonstrable commitment to inclusive design'],
      },
    ],
  },
  {
    id: 'support',
    label: 'Support',
    icon: Wrench,
    tagline: 'Technical support, AI and content updates, and API maintenance.',
    services: [
      {
        id: 'technical-support',
        title: 'Technical Support',
        desc: 'Troubleshooting and ongoing assistance for your website and systems.',
        problem: 'When something breaks, you need someone who understands your setup to fix it quickly.',
        deliverables: ['Priority response channel', 'Bug fixing and troubleshooting', 'System health checks', 'Monthly support hours'],
        benefits: ['Fast resolution when issues arise', 'No need to find a new developer each time', 'Your systems stay healthy'],
      },
      {
        id: 'ai-content-updates',
        title: 'AI & Content Updates',
        desc: 'Maintain business information and AI knowledge sources as your business evolves.',
        problem: 'Your chatbot gives outdated answers, or your site content is no longer accurate.',
        deliverables: ['Regular content reviews', 'AI knowledge base updates', 'Pricing and service info sync', 'Change documentation'],
        benefits: ['Always-accurate information for customers', 'AI stays current with your business', 'No stale content hurting your credibility'],
      },
      {
        id: 'api-maintenance',
        title: 'API Maintenance',
        desc: 'Monitor integrations and handle failures before they impact your business.',
        problem: 'Your CRM, WhatsApp, or analytics integrations break silently and you find out from customer complaints.',
        deliverables: ['Integration monitoring', 'Failure alerts and resolution', 'API version updates', 'Integration health dashboard'],
        benefits: ['Integrations stay connected', 'Proactive fixes before customers notice', 'Reliable data flow between systems'],
        integrations: ['WhatsApp API', 'CRM APIs', 'Payment gateways'],
      },
    ],
  },
];

export const allServicesFlat = serviceCategories.flatMap((cat) =>
  cat.services.map((s) => ({ ...s, category: cat.label, categoryId: cat.id }))
);
