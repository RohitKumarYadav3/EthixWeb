export interface BlogArticle {
  slug: string;
  title: string;
  category: 'AI' | 'Growth' | 'Design' | 'SEO' | 'Local SEO' | 'Engineering';
  summary: string;
  readTime: string;
  date: string;
  content: { heading?: string; paragraphs: string[]; list?: string[] }[];
}

export const blogArticles: BlogArticle[] = [
  {
    slug: 'why-your-landing-page-isnt-converting',
    title: 'Why your landing page isn\'t converting',
    category: 'Design',
    summary: 'Most landing pages fail for the same handful of reasons — and none of them are about the design looking pretty. Here is what actually moves the needle.',
    readTime: '5 min read',
    date: '2026-10-08',
    content: [
      {
        paragraphs: [
          'A landing page has one job: turn a visitor into an enquiry, a booking, or a sale. When it does not do that, the instinct is often to redesign — change the colors, swap the hero image, add more sections. But conversion problems are almost never visual problems. They are messaging, clarity, and friction problems.',
          'Before you redesign anything, check these five things.',
        ],
      },
      {
        heading: '1. The headline does not answer "what is in it for me?"',
        paragraphs: [
          'Your headline is the first thing a visitor reads. If it describes your company instead of the outcome the visitor gets, they will leave. "We are a full-service digital agency" is about you. "Get more enquiries from your website" is about them. The second one converts.',
          'A good headline states the benefit, names the audience, or both. It should be readable in under three seconds and understood without scrolling.',
        ],
      },
      {
        heading: '2. The call to action is vague or buried',
        paragraphs: [
          '"Learn more" and "Submit" are not calls to action. They are instructions to a form. "Get a free quote" or "Book a consultation" tells the visitor exactly what happens next. Be specific about the outcome of clicking.',
          'The button should also be visible without scrolling. If a visitor has to hunt for the action you want them to take, they will not take it.',
        ],
      },
      {
        heading: '3. You are asking for too much information',
        paragraphs: [
          'Every field in your form is a reason for the visitor to leave. Name and email is enough for a first contact. Phone is useful if you sell by phone. Company, budget, project timeline, and preferred contact method can come later — after you have the conversation started.',
          'A form with three fields converts better than a form with ten. Every field you remove will increase your submission rate.',
        ],
      },
      {
        heading: '4. There is no proof',
        paragraphs: [
          'Visitors do not trust you by default. They have been to websites that overpromise and underdeliver. Show them evidence: a specific result, a real testimonial, a project preview, or even a clear explanation of how you work. Anything that demonstrates you have solved this problem before for someone like them.',
          'If you do not have testimonials yet, show your process. A clear, detailed explanation of how you approach the problem is itself a form of proof — it shows competence.',
        ],
      },
      {
        heading: '5. The page is slow',
        paragraphs: [
          'A page that takes five seconds to load will lose half its visitors before they see anything. In India, where many users are on mobile networks, speed matters even more. Check your Lighthouse score. Optimize your images. Remove unnecessary scripts. Every second you shave off load time improves conversion.',
          'If your page scores below 50 on Lighthouse performance, fixing that will do more for conversion than any design change.',
        ],
      },
      {
        heading: 'What to do next',
        paragraphs: [
          'Audit your landing page against these five points. Fix the headline first — it has the biggest impact. Then simplify the form. Then make the call to action specific and visible. Then add proof. Then optimize speed. You will see more enquiries without touching the visual design.',
        ],
      },
    ],
  },
  {
    slug: 'building-an-ai-support-agent',
    title: 'Building an AI support agent',
    category: 'AI',
    summary: 'A practical guide to deploying an AI chatbot that actually helps customers — from knowledge base to human handoff.',
    readTime: '7 min read',
    date: '2026-10-05',
    content: [
      {
        paragraphs: [
          'An AI support agent is not a magic button you press and forget. It is a system with three parts: a knowledge base, a model that answers from it, and a handoff path for when the model should not answer. Get all three right and your customers get instant help at any hour. Get any one wrong and you create a worse experience than no bot at all.',
        ],
      },
      {
        heading: 'Start with the knowledge base',
        paragraphs: [
          'The quality of your AI agent depends almost entirely on the quality of the information you give it. Before touching any model, write down the answers to the questions your customers actually ask. What are your hours? What services do you offer? What are your prices? What is your service area? How does booking work?',
          'Format these as clear, concise answers — not marketing copy. The model needs facts, not adjectives. If your knowledge base says "We offer world-class plumbing solutions," the model will echo that vagueness. If it says "We offer plumbing repair, installation, and maintenance in Pune and surrounding areas," the model can answer specific questions.',
        ],
      },
      {
        heading: 'Choose the right model approach',
        paragraphs: [
          'There are two common approaches. A knowledge chatbot retrieves answers from your FAQ and presents them — simple, predictable, and hard to get wrong. An LLM chatbot uses a large language model to generate contextual responses grounded in your business information — more flexible, but requires guardrails.',
          'For most Indian businesses, start with the knowledge chatbot approach. It answers 80% of common questions accurately and predictably. Add an LLM layer for complex, multi-turn conversations once the basics are working.',
        ],
      },
      {
        heading: 'Design the human handoff',
        paragraphs: [
          'Every AI agent needs a way to reach a person. Without it, you create dead-ends that frustrate customers. Define the signals that trigger a handoff: the customer asks for a human, the conversation goes in circles, the question is outside the knowledge base, or the enquiry involves money or sensitive information.',
          'When the handoff happens, transfer the full conversation history to your team so the customer does not have to repeat themselves. This is the single most important detail — a smooth handoff makes the bot feel like a helpful assistant, not a wall.',
        ],
      },
      {
        heading: 'Review unanswered questions weekly',
        paragraphs: [
          'Your bot will encounter questions it cannot answer. That is expected and useful. Log every unanswered question and review them weekly. Each one is a gap in your knowledge base. Add the answer, and the bot gets smarter over time.',
          'This is the loop that makes an AI agent get better rather than going stale. Without it, the bot will keep failing on the same questions and your customers will learn to avoid it.',
        ],
      },
      {
        heading: 'Where to deploy it',
        paragraphs: [
          'The two highest-impact channels for Indian businesses are your website and WhatsApp. A website widget catches visitors in the moment of curiosity. A WhatsApp bot catches the majority of Indian customers who prefer messaging over calling. Deploy to both if you can — the knowledge base serves both channels.',
        ],
      },
    ],
  },
  {
    slug: 'why-lead-follow-up-matters',
    title: 'Why lead follow-up matters',
    category: 'Growth',
    summary: 'The difference between a business that grows and one that stagnates is often not lead volume — it is how fast and how consistently you follow up.',
    readTime: '4 min read',
    date: '2026-10-02',
    content: [
      {
        paragraphs: [
          'Most businesses focus on getting more leads. More ads, more SEO, more social media. But the data is clear: the businesses that convert the most leads are not the ones with the most leads — they are the ones that follow up fastest and most consistently.',
          'A study by Harvard Business Review found that companies that contact leads within an hour are seven times more likely to qualify the lead than those that wait even an hour longer. After 24 hours, the odds drop dramatically.',
        ],
      },
      {
        heading: 'The problem with manual follow-up',
        paragraphs: [
          'If you are following up manually, you will miss leads. Not because you are lazy — because you are busy. A lead comes in at 7pm while you are with a customer. You see it at 9pm. You plan to call in the morning. By morning, the lead has already contacted two competitors.',
          'This is not a discipline problem. It is a systems problem. The solution is automation.',
        ],
      },
      {
        heading: 'What automated follow-up looks like',
        paragraphs: [
          'When a lead submits an enquiry form or sends a WhatsApp message, three things should happen automatically, within seconds:',
        ],
        list: [
          'An instant response confirming receipt and setting expectations ("Thank you for your enquiry. We will call you within one business day.")',
          'A CRM entry that logs the lead with source, timestamp, and service interest',
          'A notification to your team via WhatsApp or email with the lead details',
        ],
      },
      {
        heading: 'The second touch',
        paragraphs: [
          'If the lead has not been contacted within a set time — say, 4 hours — an automated reminder goes to your team. If 24 hours pass, a second automated message goes to the lead with a gentle nudge: "We noticed you enquired about our services. Would you like to schedule a call?"',
          'These automated touches do not replace human contact. They ensure no lead is forgotten while you are busy with other work.',
        ],
      },
      {
        heading: 'The impact',
        paragraphs: [
          'Businesses that implement automated lead follow-up typically see a significant increase in conversion rate — not because they are getting more leads, but because they are responding to the leads they already have. If you are spending money on ads or SEO but not following up within minutes, you are wasting most of that spend.',
          'Start by automating the first response. Then add the reminder. Then add the second touch. Each step compounds.',
        ],
      },
    ],
  },
  {
    slug: 'google-business-profile-local-search',
    title: 'Google Business Profile and local search',
    category: 'Local SEO',
    summary: 'For Indian service businesses, Google Business Profile is often more important than the website itself. Here is how to use it properly.',
    readTime: '6 min read',
    date: '2026-09-28',
    content: [
      {
        paragraphs: [
          'If you run a local service business in India — a plumber, an electrician, a salon, a clinic, a tutor — your Google Business Profile is probably your most important digital asset. Not your website. Not your Instagram. Your Google Business Profile.',
          'When someone in your city searches for your service, Google shows the Maps pack before any website results. If you are not in that pack, you are invisible to the majority of local customers.',
        ],
      },
      {
        heading: 'Claim and complete your profile',
        paragraphs: [
          'If you have not claimed your Google Business Profile, do it today. It is free. Go to business.google.com, verify your business, and fill out every field. This is not a place to cut corners.',
          'The businesses that rank in the Maps pack are the ones with complete profiles: accurate categories, a detailed description, service areas, hours, photos, and a service list. Incomplete profiles rank lower.',
        ],
      },
      {
        heading: 'Choose the right primary category',
        paragraphs: [
          'Your primary category is the single most important field. Google uses it to determine which searches to show you in. A plumber should choose "Plumber" as the primary category, not "Contractor" or "Home improvement." Be specific.',
          'Add secondary categories for related services, but do not overdo it. Three relevant categories are better than ten irrelevant ones.',
        ],
      },
      {
        heading: 'Get and respond to reviews',
        paragraphs: [
          'Reviews are the second most important ranking factor for the Maps pack. Ask every satisfied customer to leave a review. Make it easy — send them a direct link to your review page via WhatsApp.',
          'Respond to every review, positive and negative. A simple "Thank you for your feedback" on positive reviews and a professional response on negative ones signals to Google that you are active and engaged.',
        ],
      },
      {
        heading: 'Post regularly',
        paragraphs: [
          'Google Business Profile has a posting feature that most businesses ignore. Use it. Post updates, offers, and photos at least once a week. These posts appear in your profile and in search results, and they signal to Google that your profile is active.',
          'Posts do not need to be long. A photo with a one-line update about a service or offer is enough. The point is consistency.',
        ],
      },
      {
        heading: 'Connect it to your website',
        paragraphs: [
          'Your Google Business Profile should link to your website, and your website should reinforce the same information: same business name, same address, same phone number, same services. This consistency is called NAP (Name, Address, Phone) and it is a local SEO ranking factor.',
          'Add a WhatsApp button to your profile so customers can message you directly from Google search results. This is especially important in India, where WhatsApp is the preferred communication channel for most people.',
        ],
      },
    ],
  },
  {
    slug: 'designing-websites-that-build-trust',
    title: 'Designing websites that build trust',
    category: 'Design',
    summary: 'Trust is the foundation of every online conversion. Here is how to design a website that makes visitors feel confident choosing you.',
    readTime: '5 min read',
    date: '2026-09-25',
    content: [
      {
        paragraphs: [
          'Every visitor to your website is asking one question, consciously or not: "Can I trust this business with my money, my time, or my problem?" If the answer is not clearly yes within a few seconds, they leave.',
          'Trust is not a single element. It is the cumulative effect of dozens of small signals that together tell the visitor: this business is real, competent, and reliable.',
        ],
      },
      {
        heading: 'Show your face',
        paragraphs: [
          'Stock photos of smiling models in business suits do not build trust. Real photos of you, your team, your office, or your work do. If you are a service business, show photos of jobs you have completed. If you are a professional, show your face and your office. Authenticity converts better than polish.',
          'If you cannot take professional photos, use a good phone camera. A real, slightly imperfect photo of an actual job site is more trustworthy than a perfect stock photo of a generic workspace.',
        ],
      },
      {
        heading: 'Be specific about what you do and who you serve',
        paragraphs: [
          'Vague descriptions erode trust. "We provide quality solutions for all your needs" tells the visitor nothing. "We install and repair water heaters in Pune and surrounding areas, with same-day service available" tells them exactly what to expect.',
          'Specificity signals competence. A business that can describe exactly what it does sounds like it knows what it is doing. A business that hides behind jargon sounds like it does not.',
        ],
      },
      {
        heading: 'Make contact information prominent',
        paragraphs: [
          'A website with no visible phone number, no email, and no address looks like it might not be a real business. Put your contact information in the header, in the footer, and on a dedicated contact page. Include a WhatsApp link if you use it.',
          'The ability to reach a real person is one of the strongest trust signals you can provide. It tells the visitor: we are here, we are accessible, and we will answer.',
        ],
      },
      {
        heading: 'Show proof of competence',
        paragraphs: [
          'Testimonials from real customers are powerful, but only if they are real. Do not fabricate reviews. If you do not have testimonials yet, show your process instead. A detailed explanation of how you approach a project demonstrates expertise more credibly than a generic quote from "Rahul, Mumbai."',
          'If you have certifications, licenses, or partnerships, display them. If you have been featured in any publication, mention it. If you have completed a notable project, describe it. Each piece of evidence compounds.',
        ],
      },
      {
        heading: 'Be fast and functional',
        paragraphs: [
          'A slow, broken, or janky website actively destroys trust. If your site takes five seconds to load, has broken links, or looks broken on mobile, visitors will assume your service is equally sloppy. Performance is a trust signal.',
          'Invest in speed. Fix broken links. Test on a real phone. These are not technical details — they are trust decisions.',
        ],
      },
    ],
  },
  {
    slug: 'technical-seo-core-web-vitals',
    title: 'Technical SEO and Core Web Vitals',
    category: 'SEO',
    summary: 'Google measures how fast your page loads and how stable it is while loading. These metrics directly affect your search ranking.',
    readTime: '6 min read',
    date: '2026-09-20',
    content: [
      {
        paragraphs: [
          'Core Web Vitals are three specific metrics Google uses to measure page experience: how fast the main content loads, how quickly the page becomes interactive, and how visually stable it is while loading. They are ranking factors — not the most important ones, but important enough that fixing them can move you up without any content changes.',
        ],
      },
      {
        heading: 'Largest Contentful Paint (LCP)',
        paragraphs: [
          'LCP measures how long it takes for the largest element on your page to appear. For most pages, this is a hero image or a large headline. Google wants this under 2.5 seconds.',
          'The most common causes of poor LCP are oversized images, slow server response, and render-blocking scripts. Optimize your images (use modern formats like WebP, compress them, and serve them at the right size), use a CDN, and defer non-critical JavaScript.',
        ],
      },
      {
        heading: 'Interaction to Next Paint (INP)',
        paragraphs: [
          'INP replaced FID in 2024. It measures how quickly your page responds when a user interacts with it — clicks a button, opens a menu, submits a form. Google wants this under 200 milliseconds.',
          'Heavy JavaScript is the usual culprit. If your page loads large bundles of JavaScript, the main thread is busy and cannot respond to user input. Minimize JavaScript, split your bundles, and defer anything that is not needed immediately.',
        ],
      },
      {
        heading: 'Cumulative Layout Shift (CLS)',
        paragraphs: [
          'CLS measures how much the page layout shifts while loading. If images load and push content down, or fonts swap and text jumps, your CLS score suffers. Google wants this under 0.1.',
          'The fixes are straightforward: always specify width and height on images and videos, reserve space for ads, and use font-display: swap in your CSS so text is visible immediately in a fallback font.',
        ],
      },
      {
        heading: 'How to measure',
        paragraphs: [
          'Use Google PageSpeed Insights to check your Core Web Vitals. It reports both lab data (a simulated test) and field data (real user data from the Chrome User Experience Report). Field data is what Google actually uses for ranking.',
          'If your field data is poor, the fix is almost always the same: reduce JavaScript, optimize images, and improve server response time. These are not glamorous changes, but they directly affect your search ranking.',
        ],
      },
      {
        heading: 'Why this matters for Indian businesses',
        paragraphs: [
          'In India, where many users are on mid-range phones and mobile networks, Core Web Vitals matter even more. A page that loads in 2 seconds on a fast connection might take 6 seconds on a 3G network. Optimizing for speed is not just about SEO — it is about reaching customers who do not have flagship devices and fiber internet.',
        ],
      },
    ],
  },
  {
    slug: 'connecting-crm-forms-analytics',
    title: 'Connecting CRM, forms, and analytics',
    category: 'Engineering',
    summary: 'When your website forms, CRM, and analytics talk to each other, you stop guessing and start measuring. Here is how to set it up.',
    readTime: '5 min read',
    date: '2026-09-15',
    content: [
      {
        paragraphs: [
          'Most businesses have the tools but not the connections. They have a website with a contact form, a CRM for tracking leads, and Google Analytics for tracking traffic — but the three do not talk to each other. Leads come in and sit in an email inbox. Analytics shows traffic but not which sources produce enquiries. The CRM has leads but no data about where they came from.',
          'Connecting these three systems is one of the highest-impact changes you can make. It turns guesswork into measurement.',
        ],
      },
      {
        heading: 'Step 1: Connect forms to CRM',
        paragraphs: [
          'Every form submission on your website should create a record in your CRM automatically. Not a forwarded email that someone copies into the CRM later — a direct API connection that creates the record in real time.',
          'This means every enquiry is logged with a timestamp, the form it came from, and the information the customer provided. No leads are lost. No manual data entry.',
        ],
      },
      {
        heading: 'Step 2: Pass attribution data',
        paragraphs: [
          'When a visitor arrives on your site from a Google ad, an organic search, or a social media post, that information should travel with them through the form and into the CRM. This is done by capturing URL parameters (like UTM tags) when the visitor lands on your site and passing them into a hidden field in the form.',
          'Now your CRM knows not just that a lead came in, but where they came from. Over time, this tells you which channels produce the most and best leads — so you can spend your marketing budget where it actually works.',
        ],
      },
      {
        heading: 'Step 3: Send conversion events to analytics',
        paragraphs: [
          'When a form is submitted, send a conversion event to Google Analytics. This closes the loop: Analytics knows about traffic sources, and now it also knows which visits resulted in enquiries. You can see the full funnel — from search to visit to form submission — for each channel.',
          'This is done with Google Tag Manager or by adding a GA4 event on form submission. The event should include the form name and any relevant data (service type, value) so you can segment conversions in your reports.',
        ],
      },
      {
        heading: 'Step 4: Set up dashboards',
        paragraphs: [
          'Once the data is flowing, build a dashboard that shows the metrics that matter: total enquiries, enquiries by source, conversion rate by channel, and lead status distribution from the CRM. This is your single source of truth for marketing performance.',
          'Review it monthly. You will quickly see which channels are worth investing in and which are wasting money. Without this data, you are guessing. With it, you are making decisions.',
        ],
      },
      {
        heading: 'The result',
        paragraphs: [
          'When forms, CRM, and analytics are connected, you can answer questions that most businesses cannot: How many enquiries did Google Ads produce last month? What is the conversion rate of organic search traffic? Which service page generates the most leads? How long does it take for a lead to become a customer?',
          'These answers are the difference between marketing that works and marketing that burns money.',
        ],
      },
    ],
  },
];

export const blogCategories = ['All', 'AI', 'Growth', 'Design', 'SEO', 'Local SEO', 'Engineering'] as const;

export function getArticleBySlug(slug: string): BlogArticle | undefined {
  return blogArticles.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string, limit = 2): BlogArticle[] {
  const article = getArticleBySlug(slug);
  if (!article) return [];
  return blogArticles
    .filter((a) => a.slug !== slug && a.category === article.category)
    .slice(0, limit)
    .concat(
      blogArticles.filter((a) => a.slug !== slug && a.category !== article.category).slice(0, limit)
    )
    .slice(0, limit);
}
