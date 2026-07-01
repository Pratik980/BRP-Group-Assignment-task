/**
 * Canonical copy aligned with https://brpgroup.com.np/
 * B.R.P. Group founded 2019; family legacy spans 45+ years (2nd generation).
 */

export const siteMeta = {
  foundedYear: 2019,
  legacyYears: 45,
  businessCount: "10+",
  networkCount: "1000+",
  domain: "https://www.brpgroup.com.np",
  email: "info@brpgroup.com.np",
  phone: "+977 01 4535691, +977 01 4516390",
  headquarters: "Baluwatar, Kathmandu, Nepal 44600",
  linkedIn: "https://www.linkedin.com/company/brpgroupnepal/",
  facebook: "https://www.facebook.com/people/BRP-Group/61567890270047/",
  instagram: "https://www.instagram.com/brpgroup01/",
} as const;

export const ourHistory = {
  label: "Our History",
  body: "Founded in 2019, B.R.P. Group is a business enterprise focused on tech, real estate, education, and healthcare. From more resource-efficient education sectors, smarter buildings, and grids to advanced healthcare, we have been incorporating technology to add customer value. By combining the real and the digital worlds, we seek to revolutionize the industries and markets and transform every day for billions of people for the better.",
} as const;

export const valueStatements = {
  left: "B.R.P. Group strives to deliver value for all our stakeholders through continuous innovation, groundbreaking solutions, and trust. We offer consultation and the strategic approach to lay the foundations necessary for your business growth. We listen, understand your reality, and provide the technological solution that will truly work best.",
  right:
    "Combining the digital world with the real, we help meet the significant challenges of our time. We are geared towards creating technology with purpose and value for customers, ultimately changing the lives of billions of people for the better.",
} as const;

export const heritageStrip = {
  label: "Heritage & Impact",
} as const;

export const ourLegacy = {
  label: "Our Legacy",
  paragraphs: [
    "B.R.P. Group, such as its name is the legacy passed down by late Dr. Babu Ram Pokharel to the B.R.P. Group family. His principles and teachings continue to influence our corporate culture and the direction we are taking.",
    "The foundation of this organization are our Chairman Dr. Ubin Pokharel and Executive Director Ms. Bidushi Pandey Pokharel. They carry on the 45-year history of B.R.P. Group with their continuous effort to keep us aligned to the vision.",
  ],
} as const;

export const ourCommunity = {
  label: "Our Community",
  paragraphs: [
    "The B.R.P. Group understands its responsibility not just to its members but to the society. Our ambition to make an impact in society is not possible without being able to support and empower it.",
    "We continue to assist efforts that improve lives, and we firmly believe that the health and education sectors are crucial to achieving this goal. We have been providing financial or in-kind support to hospitals and schools that serve the community, particularly those where such services are in low supply.",
  ],
} as const;

/** https://brpgroup.com.np/Community */
export const communityPage = {
  heroTitle: "Our Community",
  heroIntro:
    "The B.R.P. Group understands its responsibility not just to its members but to the society. Our ambition to make an impact in society is not possible without being able to support and empower it. We continue to assist efforts that improve lives, and we firmly believe that the health and education sectors are crucial to achieving this goal. We have been providing financial or in-kind support to hospitals and schools that serve the community, particularly those where such services are in low supply.",
  heroHeadline: "Empowering through health & education",
  heroLocation: "Chhoprak · Siranchok Rural Municipality, Gorkha",
  highlights: [
    { value: "50+", label: "Scholarships" },
    { value: "1000+", label: "Happy Faces" },
  ],
  sections: [
    {
      headline: "Education",
      paragraphs: [
        "Established by the late Dr. Babu Ram Pokharel, Shree Mandali, a higher secondary school and Shree Janakalyan, a primary level school in Siranchok Rural Municipality, Gorkha has been serving to educate hundreds of children from Chhoprak and the nearby villages.",
        "B.R.P. Group has been continuously improving the infrastructure and facilities at these schools. We have also introduced a library room and computer lab in Shree Mandali to help students find more resources for their interests.",
      ],
    },
    {
      headline: "Healthcare",
      paragraphs: [
        "Similarly, we are also supporting the local healthcare center in Chhoprak village through means of infrastructure and resources. Working closely with the local community we supported the construction of the healthcare center and have been helping to expand their services.",
        "The health center is equipped with a maternity ward for pregnancy and post-natal care that has been providing health care services to ensure a safe and healthy environment for women and children.",
      ],
    },
    {
      headline: "Community Centre",
      paragraphs: [
        "Our activities show that we are proud of our heritage and have started a number of projects to advance Chhoprak. Local support has been essential to what we have accomplished in the region. We intended to inspire the neighborhood to get together and generate ideas for the common good after realizing the potential of local efforts.",
        "The construction of a community center in the village was one of these methods. The center created by the late Dr. Babu Ram Pokharel acts as a focal point for locals to share ideas, get help, work together, and foster inclusivity and solidarity.",
      ],
    },
  ],
  initiativesBadge: "Our initiatives",
  initiativesTitle: "Impact in Chhoprak",
  initiativesDescription:
    "Continuing the legacy of Dr. Babu Ram Pokharel through education, healthcare, and community infrastructure.",
  galleryBadge: "Gallery",
  galleryTitle: "Community in action",
  galleryImages: [
    { src: "childrents-1200.webp", label: "Supporting the next generation" },
    { src: "education-1-1200.webp", label: "School infrastructure & resources" },
    { src: "education-2-1200.webp", label: "Learning environments in Gorkha" },
    { src: "image-3-1200.webp", label: "Community outreach programs" },
    { src: "image-4-1200.webp", label: "Local partnerships" },
    { src: "image-5-1200.webp", label: "Regional initiatives" },
    { src: "image-6-1200.webp", label: "Village community programs" },
  ],
  ctaTitle: "Explore our legacy",
  ctaDescription:
    "Learn how B.R.P. Group&apos;s history and leadership shape our commitment to Nepal&apos;s communities.",
  ctaButtons: [
    { label: "Our history", href: "/history" },
    { label: "About B.R.P. Group", href: "/about" },
  ],
} as const;

export const heritageHighlights = ["45 Years", "2nd Generation"] as const;

/** https://brpgroup.com.np/About-Us */
export const aboutUs = {
  heroTitle: "About Us",
  communityIntro: ourCommunity.paragraphs,
  vision: {
    title: "Our Vision",
    body: "Investing and partnering with people to create a better tomorrow.",
  },
  mission: {
    title: "Our Mission",
    body: "Promoting great ideas and fueling the growth of various sectors anchored on the principle of economic development.",
  },
  executiveTeamTitle: "Our Executive Team",
} as const;

export const executiveTeam = [
  {
    name: "Dr. Babu Ram Pokharel",
    role: "Chairman Emeritus",
    imageKey: "babuRam" as const,
    bio: "Founder of the B.R.P. Group legacy. His principles in education, public service, and enterprise continue to shape our corporate culture and long-term direction.",
  },
  {
    name: "Dr. Ubin Pokharel",
    role: "Chairman",
    imageKey: "ubin" as const,
    bio: "Steering B.R.P. Group's diversified investments across technology, healthcare, education, and real estate — expanding the ecosystem through innovation and strategic US collaborations.",
  },
  {
    name: "Ms. Bidushi Pandey Pokharel",
    role: "Executive Director",
    imageKey: "bidushi" as const,
    bio: "Driving operations, organizational excellence, and strategic growth across all business verticals with a focus on sustainable, tech-enabled solutions.",
  },
] as const;

export const ourTeam = {
  title: "Our Team",
  members: [] as { name: string; role: string }[],
};
