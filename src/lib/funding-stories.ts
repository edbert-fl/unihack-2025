import { formatDistanceToNow } from 'date-fns';

export interface Transaction {
  id: string;
  amount: number;
  donor: string;
  timestamp: string;
  message?: string;
}

export interface FundingStory {
  id: number;
  slug: string;
  name: string;
  title: string;
  story: string;
  detailedStory: string;
  goal: number;
  raised: number;
  image: string;
  gallery: string[];
  category: 'medical' | 'education' | 'disaster' | 'community' | 'environment' | 'business';
  location: string;
  createdAt: string;
  updatedAt: string;
  transactions: Transaction[];
  updates: {
    date: string;
    title: string;
    content: string;
  }[];
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
}

const DONOR_NAMES = [
  "Emma Thompson",
  "James Wilson",
  "Sofia Rodriguez",
  "Michael Chen",
  "Olivia Parker",
  "Liam O'Connor",
  "Ava Patel",
  "Noah Kim",
  "Isabella Santos",
  "William Zhang",
  "Mia Johnson",
  "Lucas Garcia",
  "Sophia Lee",
  "Ethan Murphy",
  "Charlotte Wu"
];

const SUPPORT_MESSAGES = [
  "Stay strong! We're with you! 💪",
  "Wishing you all the best! 🙏",
  "Every little bit helps. Keep going!",
  "You're not alone in this journey ❤️",
  "Sending love and support your way",
  "Hope this helps! Keep fighting!",
  "Together we can make a difference",
  "Rooting for your success! 🌟",
  "You've got this! Stay positive",
  "Our community stands with you 🤝"
];

// Helper function to generate random transactions
const generateTransactions = (count: number, maxAmount: number): Transaction[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `tx-${Math.random().toString(36).substr(2, 9)}`,
    amount: Math.floor(Math.random() * maxAmount) + 10,
    donor: DONOR_NAMES[Math.floor(Math.random() * DONOR_NAMES.length)],
    timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    message: Math.random() < 0.7 ? SUPPORT_MESSAGES[Math.floor(Math.random() * SUPPORT_MESSAGES.length)] : undefined
  }));
};

export const FUNDING_STORIES: FundingStory[] = [
  {
    id: 1,
    slug: 'sarah-johnson-cancer-treatment',
    name: "Sarah Johnson",
    title: "Fighting Stage 3 Cancer",
    story: "Sarah, a single mother of two, was recently diagnosed with stage 3 breast cancer. She needs support for her medical treatments and to provide for her children during this difficult time.",
    detailedStory: `Sarah Johnson's world turned upside down when she was diagnosed with stage 3 breast cancer. As a single mother of two young children, ages 8 and 11, she faces not only the challenge of fighting cancer but also maintaining stability for her family.

The diagnosis came after months of feeling unusually tired and discovering a lump during a self-examination. The subsequent tests and biopsies confirmed the devastating news: stage 3 breast cancer requiring immediate aggressive treatment.

Sarah works as a elementary school teacher but has had to take extended leave for her treatment. While she has basic health insurance, it doesn't cover all the specialized treatments she needs, and the out-of-pocket expenses are mounting quickly.

The funds raised will help cover:
- Specialized cancer treatments and medications
- Regular hospital visits and consultations
- Childcare support during treatment days
- Basic living expenses during reduced work hours
- Educational support for her children

Sarah has always been the one helping others, dedicating her life to teaching and raising her children. Now, she needs our community's support to fight this battle and return to her passion for education and her role as a mother.`,
    goal: 50000,
    raised: 32450,
    image: "/images/fund_1_1.webp",
    gallery: [
      "/images/fund_1_1.webp",
      "/images/fund_1_2.webp",
      "/images/fund_1_3.webp"
    ],
    category: "medical",
    location: "Newcastle, NSW, Australia",
    createdAt: "2024-02-15T08:00:00Z",
    updatedAt: "2024-03-20T15:30:00Z",
    transactions: generateTransactions(25, 2000),
    updates: [
      {
        date: "2024-03-15T10:00:00Z",
        title: "First Round of Treatment Complete",
        content: "Thank you everyone for your support! I've completed my first round of chemotherapy. The journey is challenging, but your support keeps me going."
      },
      {
        date: "2024-02-28T14:00:00Z",
        title: "Treatment Plan Finalized",
        content: "Met with my oncology team today. We've finalized the treatment plan, which includes 6 rounds of chemotherapy followed by surgery."
      }
    ],
    socialLinks: {
      facebook: "https://facebook.com/sarahjfight",
      instagram: "https://instagram.com/sarah.j.journey"
    }
  },
  {
    id: 2,
    slug: 'martinez-family-hurricane-recovery',
    name: "The Martinez Family",
    title: "Rebuilding After Hurricane",
    story: "The Martinez family lost everything when Hurricane Maria destroyed their home. They're seeking help to rebuild their house and restore their lives.",
    detailedStory: `The Martinez family - Carlos, Maria, and their three children - lost everything when Hurricane Maria devastated their community. Their home of 15 years was completely destroyed, leaving them with nothing but the clothes on their backs and a few salvaged possessions.

The hurricane's destructive force tore through their neighborhood, causing catastrophic damage to their home's structure, roof, and foundation. All their belongings, including family heirlooms, furniture, and essential items, were either destroyed or severely damaged by wind and flooding.

Carlos works in construction, and Maria is a healthcare worker. While they both maintain their jobs, the cost of rebuilding their home far exceeds their savings and insurance coverage. The family is currently living in a temporary shelter, which is taking a toll on their children's education and emotional well-being.

The funds will be used for:
- Structural repairs to their home
- Replacing essential appliances and furniture
- Temporary housing costs while rebuilding
- School supplies for the children
- Basic necessities and clothing

Despite their circumstances, the Martinez family remains hopeful and determined to rebuild their lives. They've been active members of their community for decades, always helping neighbors in need, and now they need our support to get back on their feet.`,
    goal: 35000,
    raised: 12800,
    image: "/images/fund_2_1.webp",
    gallery: [
      "/images/fund_2_1.webp",
      "/images/fund_2_2.webp",
      "/images/fund_2_3.webp"
    ],
    category: "disaster",
    location: "Brisbane, Queensland, Australia",
    createdAt: "2024-03-01T10:00:00Z",
    updatedAt: "2024-03-18T16:45:00Z",
    transactions: generateTransactions(15, 1500),
    updates: [
      {
        date: "2024-03-15T09:00:00Z",
        title: "Temporary Housing Secured",
        content: "Thanks to your generous donations, we've secured temporary housing closer to the children's school. This gives us stability while we work on rebuilding our home."
      }
    ],
    socialLinks: {
      facebook: "https://facebook.com/martinez.rebuilding"
    }
  },
  {
    id: 3,
    slug: 'david-chen-heart-surgery',
    name: "David Chen",
    title: "Emergency Heart Surgery",
    story: "David needs an urgent heart surgery that his insurance won't fully cover. Your support will help save his life and support his recovery journey.",
    detailedStory: `David Chen, a 45-year-old software developer and father of two, recently discovered he needs urgent heart surgery after experiencing severe chest pains. Doctors diagnosed him with a critical heart condition requiring immediate intervention, but his insurance will only cover a portion of the expensive procedure.

The diagnosis was unexpected and devastating for David and his family. While he has always maintained a healthy lifestyle, genetic factors have contributed to his heart condition. The recommended surgery is a complex procedure that requires specialized care and an extended recovery period.

David has been the primary provider for his family, but the medical leave required for surgery and recovery will significantly impact their financial stability. His wife works part-time to care for their young children, making it difficult to manage the mounting medical expenses.

The funds raised will help cover:
- Surgical procedure costs
- Post-operative care and medications
- Rehabilitation therapy
- Living expenses during recovery
- Insurance deductibles and copayments

Time is critical for David's condition, and every contribution brings him closer to receiving the life-saving surgery he needs. The family is grateful for any support that can help them through this challenging time.`,
    goal: 75000,
    raised: 45600,
    image: "/images/fund_3_1.webp",
    gallery: [
      "/images/fund_3_1.webp",
      "/images/fund_3_2.webp",
      "/images/fund_3_3.webp"
    ],
    category: "medical",
    location: "Perth, Western Australia, Australia",
    createdAt: "2024-02-20T15:00:00Z",
    updatedAt: "2024-03-19T11:20:00Z",
    transactions: generateTransactions(35, 2500),
    updates: [
      {
        date: "2024-03-18T14:00:00Z",
        title: "Surgery Date Scheduled",
        content: "Great news! With the funds raised so far, we've been able to schedule the surgery for next month. Thank you all for your incredible support!"
      },
      {
        date: "2024-03-05T11:00:00Z",
        title: "Pre-Surgery Consultations",
        content: "Completed all pre-surgery consultations. The medical team is confident about the procedure, but we still need help with the remaining costs."
      }
    ],
    socialLinks: {
      twitter: "https://twitter.com/davidchen_heart",
      instagram: "https://instagram.com/david.chen.journey"
    }
  },
  {
    id: 4,
    slug: 'stem-education-initiative',
    name: "Future Tech Foundation",
    title: "STEM Education for Underserved Youth",
    story: "Help us bring cutting-edge STEM education to underserved communities, providing equipment, training, and opportunities for the next generation of innovators.",
    detailedStory: `The Future Tech Foundation is launching an ambitious initiative to bridge the digital divide and bring comprehensive STEM education to underserved communities. Our program targets schools in low-income areas where access to technology and advanced educational resources is limited.

Many students in these communities have never had the opportunity to work with modern technology or participate in hands-on science experiments. This lack of exposure not only limits their educational development but also affects their future career prospects in our increasingly technology-driven world.

Our comprehensive program includes:
- Setting up fully equipped computer labs with modern hardware
- Providing robotics and coding equipment
- Training teachers in modern STEM education techniques
- Creating after-school programs and workshops
- Organizing science fairs and tech competitions

The initial phase will benefit three schools serving over 1,500 students.

The funds raised will be used for:
- Computer hardware and software licenses
- Robotics kits and programming tools
- Scientific equipment and supplies
- Teacher training programs
- Educational materials and curriculum development
- After-school program coordination

We've already secured partnerships with local tech companies who will provide mentorship and internship opportunities for students. This program isn't just about providing equipment – it's about creating a sustainable ecosystem of learning and opportunity.`,
    goal: 85000,
    raised: 31200,
    image: "/images/fund_4_1.webp",
    gallery: [
      "/images/fund_4_1.webp",
      "/images/fund_4_2.webp",
      "/images/fund_4_3.webp"
    ],
    category: "education",
    location: "Broken Hill, NSW, Australia",
    createdAt: "2024-03-01T09:00:00Z",
    updatedAt: "2024-03-21T14:20:00Z",
    transactions: generateTransactions(20, 5000),
    updates: [
      {
        date: "2024-03-20T15:00:00Z",
        title: "First School Lab Setup Complete",
        content: "We've successfully installed the first computer lab at Washington Heights Elementary! The students are already showing incredible enthusiasm for their new learning opportunities."
      },
      {
        date: "2024-03-10T11:00:00Z",
        title: "Corporate Partnership Secured",
        content: "Exciting news! Local tech giant TechCorp has agreed to provide mentorship and internship opportunities for our high school students."
      }
    ],
    socialLinks: {
      twitter: "https://twitter.com/futuretechfound",
      instagram: "https://instagram.com/futuretechfoundation"
    }
  },
  {
    id: 5,
    slug: 'sustainable-farming-project',
    name: "Green Earth Collective",
    title: "Community Sustainable Farming Initiative",
    story: "Help us transform abandoned urban lots into productive community gardens, providing fresh food access and environmental education to local residents.",
    detailedStory: `The Green Earth Collective is embarking on an innovative project to convert vacant urban lots into thriving community gardens and educational spaces. This initiative aims to address food insecurity while promoting environmental sustainability and community engagement in our city's most affected neighborhoods.

Our city has over 50 acres of vacant lots in food desert areas, where access to fresh, healthy food is limited. By transforming these spaces into productive gardens, we can provide fresh produce to local families while creating green spaces that enhance community well-being.

The project encompasses:
- Converting 5 vacant lots (approximately 2 acres total)
- Installing sustainable irrigation systems
- Building greenhouse facilities for year-round growing
- Creating composting stations
- Developing educational programs for local schools
- Training community members in sustainable farming practices

Expected Annual Impact:
- Production of 12,000+ pounds of fresh produce
- Serving 200+ families directly
- Engaging 500+ students in environmental education
- Training 50+ community members in urban farming
- Reducing local carbon footprint by 15 tons

The funds will support:
- Land preparation and soil rehabilitation
- Equipment and tools
- Greenhouse construction
- Irrigation system installation
- Educational program development
- Part-time staff for maintenance and education

This project isn't just about growing food – it's about growing community, knowledge, and a sustainable future for our city.`,
    goal: 65000,
    raised: 28900,
    image: "/images/fund_5_1.webp",
    gallery: [
      "/images/fund_5_1.webp",
      "/images/fund_5_2.webp",
      "/images/fund_5_3.webp"
    ],
    category: "environment",
    location: "Melbourne, Victoria, Australia",
    createdAt: "2024-02-25T12:00:00Z",
    updatedAt: "2024-03-19T16:45:00Z",
    transactions: generateTransactions(30, 2000),
    updates: [
      {
        date: "2024-03-18T09:00:00Z",
        title: "First Plot Cleared",
        content: "We've successfully cleared and prepared our first plot! Soil testing shows excellent potential for organic farming after some amendments."
      },
      {
        date: "2024-03-05T14:30:00Z",
        title: "Community Workshop Success",
        content: "Over 50 community members attended our first urban farming workshop. The enthusiasm and support from the neighborhood has been overwhelming!"
      }
    ],
    socialLinks: {
      facebook: "https://facebook.com/greenearthcollective",
      instagram: "https://instagram.com/greenearthcollective"
    }
  },
  {
    id: 6,
    slug: 'veterans-mental-health',
    name: "Veterans Healing Center",
    title: "Mental Health Support for Veterans",
    story: "Support our initiative to provide free mental health services, therapy, and community support programs for veterans struggling with PTSD and transition challenges.",
    detailedStory: `The Veterans Healing Center is expanding its mental health support services to meet the growing needs of our veteran community. Many veterans face significant challenges transitioning to civilian life, dealing with PTSD, and accessing quality mental health care. Our center aims to bridge this gap by providing comprehensive, veteran-focused mental health services at no cost to those who've served our country.

The statistics are alarming: approximately 20% of veterans from recent conflicts experience PTSD, yet many don't receive the support they need due to various barriers, including cost, stigma, and limited access to specialized care.

Our expanded program will provide:
- Individual therapy sessions with trauma-informed specialists
- Group therapy and peer support meetings
- Family counseling services
- Art and music therapy programs
- Mindfulness and meditation workshops
- Career transition counseling
- 24/7 crisis support hotline

The funds will help us:
- Hire additional mental health professionals
- Expand our facility to accommodate more veterans
- Purchase therapeutic equipment and supplies
- Develop online support resources
- Cover operational costs for one year
- Provide transportation assistance for veterans

We've already helped over 200 veterans in our current program, with a 85% reported improvement in quality of life. With your support, we can extend these services to 500+ veterans annually.`,
    goal: 120000,
    raised: 67800,
    image: "/images/fund_6_1.webp",
    gallery: [
      "/images/fund_6_1.webp",
      "/images/fund_6_2.webp",
      "/images/fund_6_3.webp"
    ],
    category: "medical",
    location: "All across Australia",
    createdAt: "2024-02-10T10:00:00Z",
    updatedAt: "2024-03-20T13:15:00Z",
    transactions: generateTransactions(40, 3000),
    updates: [
      {
        date: "2024-03-19T11:00:00Z",
        title: "New Therapist Joined",
        content: "We're excited to welcome Dr. Sarah Martinez, a specialist in PTSD treatment, to our team. This addition will help us serve 30% more veterans monthly."
      },
      {
        date: "2024-03-08T16:00:00Z",
        title: "Art Therapy Program Launch",
        content: "Our new art therapy program has begun with 15 veterans participating. The initial feedback has been incredibly positive, with participants reporting reduced anxiety levels."
      }
    ],
    socialLinks: {
      twitter: "https://twitter.com/vethealingcenter",
      facebook: "https://facebook.com/veteranshealingcenter"
    }
  }
  // ... Add more stories here
];

// Helper function to get a story by slug
export function getStoryBySlug(slug: string): FundingStory | undefined {
  return FUNDING_STORIES.find(story => story.slug === slug);
}

// Helper function to get recent transactions
export function getRecentTransactions(storyId: number): Transaction[] {
  const story = FUNDING_STORIES.find(s => s.id === storyId);
  return story?.transactions.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  ) ?? [];
}

// Helper function to format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Helper function to calculate progress percentage
export function calculateProgress(raised: number, goal: number): number {
  return Math.min(Math.round((raised / goal) * 100), 100);
}

// Helper function to format relative time
export function formatRelativeTime(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
} 