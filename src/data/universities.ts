export interface Program {
  name: string;
  level: 'Undergraduate' | 'Postgraduate' | 'Diploma' | 'Doctorate';
  duration: string;
  tuitionFee: string;
  description: string;
}

export interface University {
  id: string;
  name: string;
  country: string;
  city: string;
  rating: number;
  globalRanking: string;
  shortDescription: string;
  description: string;
  popularCourse: string;
  intake: string;
  ieltsScore: number;
  gpaRequirement: string;
  averageTuition: string;
  visaSuccessBase: number;
  accentGradient: string[];
  programs: Program[];
}

export const UNIVERSITIES: University[] = [
  {
    id: 'univ_01',
    name: 'Cardiff University International Study Centre',
    country: 'United Kingdom',
    city: 'Cardiff, Wales',
    rating: 4.8,
    globalRanking: '#154 globally',
    shortDescription: 'A world-leading research university offering premium pathway programs for international students in the heart of Wales.',
    description: 'Cardiff University is a prestigious Russell Group institution in the UK, combining a long-standing reputation for academic excellence with state-of-the-art facilities. The International Study Centre offers custom preparation courses tailored specifically for overseas candidates, ensuring a smooth transition to full degree studies.',
    popularCourse: 'Advertising and Marketing Communications',
    intake: 'Sept, Jan',
    ieltsScore: 6.5,
    gpaRequirement: '3.0/4.0 or 70%',
    averageTuition: '£18,500 - £23,000 / year',
    visaSuccessBase: 92,
    accentGradient: ['#3B82F6', '#1D4ED8'],
    programs: [
      {
        name: 'MSc International Relations',
        level: 'Postgraduate',
        duration: '1 Year',
        tuitionFee: '£20,800',
        description: 'Advanced analysis of global systems, conflicts, and international organization structures.'
      },
      {
        name: 'BSc Business Management and Marketing',
        level: 'Undergraduate',
        duration: '3 Years',
        tuitionFee: '£19,500',
        description: 'Focuses on strategic marketing, brand placement, consumer behavior, and enterprise growth.'
      },
      {
        name: 'Diploma in Media & Communications',
        level: 'Diploma',
        duration: '1 Year',
        tuitionFee: '£17,000',
        description: 'Practical training in modern journalism, digital journalism, and screen communications.'
      }
    ]
  },
  {
    id: 'univ_02',
    name: 'Aston University',
    country: 'United Kingdom',
    city: 'Birmingham, England',
    rating: 4.6,
    globalRanking: '#446 globally',
    shortDescription: 'Renowned for employability, industry placements, and a gold-standard student experience in Birmingham.',
    description: 'Aston University is situated in the vibrant city center of Birmingham. Known for its strong industry links, Aston pioneers professional placements and is rated Gold in the UK Teaching Excellence Framework (TEF), preparing students for high-impact global careers.',
    popularCourse: 'Business Administration & Management',
    intake: 'Sept, Jan, May',
    ieltsScore: 6.0,
    gpaRequirement: '2.8/4.0 or 65%',
    averageTuition: '£16,000 - £21,500 / year',
    visaSuccessBase: 88,
    accentGradient: ['#0EA5E9', '#0369A1'],
    programs: [
      {
        name: 'MBA (Master of Business Administration)',
        level: 'Postgraduate',
        duration: '1 Year (Full-time)',
        tuitionFee: '£25,800',
        description: 'A world-class MBA featuring integrated executive coaching and professional consulting projects.'
      },
      {
        name: 'BSc Computer Science with Business',
        level: 'Undergraduate',
        duration: '4 Years (with placement)',
        tuitionFee: '£18,200',
        description: 'In-depth software engineering studies paired with essential management and financial skills.'
      }
    ]
  },
  {
    id: 'univ_03',
    name: 'BITS Pilani',
    country: 'India',
    city: 'Pilani, Rajasthan',
    rating: 4.9,
    globalRanking: '#20 in India',
    shortDescription: 'One of India\'s premier private institutes for engineering, technology, and sciences with a world-renowned alumni network.',
    description: 'Birla Institute of Technology & Science (BITS), Pilani, is a deemed university under Section 3 of the UGC Act. BITS offers highly competitive admissions and an unmatched cooperative education (Practice School) curriculum, producing world-class engineers, founders, and scientists.',
    popularCourse: 'Computer Science and Software Systems',
    intake: 'August',
    ieltsScore: 6.5,
    gpaRequirement: '7.5/10.0 CGPA',
    averageTuition: '₹4,50,000 - ₹6,000,000 / year',
    visaSuccessBase: 95,
    accentGradient: ['#8B5CF6', '#5B21B6'],
    programs: [
      {
        name: 'B.E. (Hons) Computer Science',
        level: 'Undergraduate',
        duration: '4 Years',
        tuitionFee: '₹5,20,000',
        description: 'Rigorous training in algorithms, systems programming, artificial intelligence, and compiler design.'
      },
      {
        name: 'M.E. Microelectronics & VLSI Design',
        level: 'Postgraduate',
        duration: '2 Years',
        tuitionFee: '₹4,80,000',
        description: 'Advanced chip design, semiconductor physics, and hardware descriptive language modeling.'
      }
    ]
  },
  {
    id: 'univ_04',
    name: 'Bath Spa University, Ras Al-Khaimah',
    country: 'United Arab Emirates',
    city: 'Ras Al-Khaimah, UAE',
    rating: 4.5,
    globalRanking: '#801+ globally',
    shortDescription: 'A state-of-the-art campus offering British degrees with affordable tuition in the secure environment of the UAE.',
    description: 'Bath Spa University Ras Al Khaimah (UAE Campus) brings UK-quality higher education to the Middle East. It is recognized for creative, business, and tech programs, allowing students to study in the UAE and graduate with an authentic, internationally respected British degree.',
    popularCourse: 'Creative Computing & Information Technology',
    intake: 'Sept, Feb, June',
    ieltsScore: 5.5,
    gpaRequirement: '2.5/4.0 or 60%',
    averageTuition: 'AED 38,000 - 45,000 / year',
    visaSuccessBase: 91,
    accentGradient: ['#EC4899', '#BE185D'],
    programs: [
      {
        name: 'BSc (Hons) Creative Computing',
        level: 'Undergraduate',
        duration: '3 Years',
        tuitionFee: 'AED 39,000',
        description: 'Intersection of computer programming, web design, UI/UX, and multimedia production.'
      },
      {
        name: 'MSc Business Management',
        level: 'Postgraduate',
        duration: '1 Year',
        tuitionFee: 'AED 44,000',
        description: 'Designed for professionals looking to transition to leadership roles in dynamic enterprise markets.'
      }
    ]
  },
  {
    id: 'univ_05',
    name: 'Canadian University Toronto',
    country: 'Canada',
    city: 'Toronto, Ontario',
    rating: 4.7,
    globalRanking: '#280 globally',
    shortDescription: 'A thriving urban campus in downtown Toronto known for co-op programs and extensive settlement opportunities.',
    description: 'Canadian University Toronto is a premier learning destination offering hands-on curricula, diverse multicultural student bodies, and direct integration into the Canadian job market. Programs are aligned with Post-Graduation Work Permit (PGWP) pathways.',
    popularCourse: 'Data Analytics & Cloud Computing',
    intake: 'Sept, Jan, May',
    ieltsScore: 6.5,
    gpaRequirement: '3.0/4.0 or 73%',
    averageTuition: '$21,000 - $28,500 CAD / year',
    visaSuccessBase: 85,
    accentGradient: ['#F43F5E', '#9F1239'],
    programs: [
      {
        name: 'Post-Graduate Certificate in Data Science',
        level: 'Postgraduate',
        duration: '2 Years (with Co-op)',
        tuitionFee: '$23,500 CAD',
        description: 'Hands-on training in machine learning, statistics, SQL databases, and business intelligence.'
      },
      {
        name: 'Bachelor of Software Engineering',
        level: 'Undergraduate',
        duration: '4 Years',
        tuitionFee: '$26,000 CAD',
        description: 'Rigorous engineering of complex distributed software, cloud deployment, and system safety.'
      }
    ]
  },
  {
    id: 'univ_06',
    name: 'Amity University Dubai',
    country: 'United Arab Emirates',
    city: 'Dubai International Academic City',
    rating: 4.4,
    globalRanking: '#950+ globally',
    shortDescription: 'A massive premium campus in Dubai offering multi-disciplinary programs with industry-focused internship pipelines.',
    description: 'Amity University Dubai Campus is situated in Dubai International Academic City. Spread over a state-of-the-art 700,000 sq ft campus, it offers degrees licensed by KHDA in engineering, management, hospitality, architecture, and media.',
    popularCourse: 'Hospitality & Luxury Management',
    intake: 'Sept, Jan',
    ieltsScore: 6.0,
    gpaRequirement: '2.7/4.0 or 60%',
    averageTuition: 'AED 45,000 - 60,000 / year',
    visaSuccessBase: 94,
    accentGradient: ['#10B981', '#047857'],
    programs: [
      {
        name: 'MBA in General Management',
        level: 'Postgraduate',
        duration: '2 Years',
        tuitionFee: 'AED 52,000',
        description: 'Comprehensive business administration with optional streams in Finance, HR, or Marketing.'
      },
      {
        name: 'Bachelor of Business Administration (BBA)',
        level: 'Undergraduate',
        duration: '3 Years',
        tuitionFee: 'AED 42,000',
        description: 'Lays the foundation for modern global businesses, focusing on economics, trading, and startups.'
      }
    ]
  }
];
