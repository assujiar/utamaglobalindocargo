import type { Dictionary } from "./type";

const en: Dictionary = {
  metadata: {
    title: "UGC Logistics (Utama Globalindo Cargo) - Freight Forwarding & Logistics Indonesia",
    description:
      "One point of coordination for domestic distribution, international freight forwarding, customs brokerage, warehousing, project cargo, and charter. Based in Jakarta.",
  },
  nav: {
    home: "Home",
    services: "Services",
    industries: "Industries",
    caseStudies: "Case Studies",
    about: "About",
    faq: "FAQ",
    contact: "Contact Us",
  },
  hero: {
    headline: "One line of control across every handoff.",
    subHeadline:
      "From domestic trucking to international freight, customs clearance to warehousing, one team handles the full coordination. No more juggling multiple vendors.",
    ctaPrimary: "Discuss Your Requirements",
    ctaSecondary: "View Our Services",
  },
  trustStrip: {
    heading: "Trusted by companies across industries",
    description:
      "Serving manufacturing, FMCG, e-commerce, pharmaceutical, commodities, and energy sectors across Indonesia and international routes.",
  },
  servicesOverview: {
    heading: "Our Services",
    subHeading:
      "Six service categories covering the full supply chain, from first mile to last mile.",
    cta: "View All Services",
  },
  howItWorks: {
    heading: "How We Work",
    subHeading:
      "A structured process, from initial enquiry to delivery report. One contact, one workflow.",
    steps: [
      {
        title: "Initial Consultation",
        description:
          "Tell us your logistics requirements. Our team analyzes the best routes, modes, and timelines.",
      },
      {
        title: "Planning & Booking",
        description:
          "We build your shipping plan, reserve capacity, and prepare all required documentation.",
      },
      {
        title: "Execution & Monitoring",
        description:
          "Cargo moves according to plan. You get status updates without chasing multiple parties.",
      },
      {
        title: "Delivery & Documentation",
        description:
          "Goods arrive at destination. Documentation complete, customs cleared, report delivered.",
      },
      {
        title: "Review & Reporting",
        description:
          "Shipment performance review. Data you can use for your next planning cycle.",
      },
    ],
  },
  proof: {
    heading: "How We Help",
    subHeading:
      "Real examples of logistics coordination for clients across industries.",
    cta: "View More Case Studies",
  },
  industriesTeaser: {
    heading: "Industries We Serve",
    subHeading:
      "Every industry has different logistics challenges. We know the specific requirements of each.",
    cta: "Learn More",
  },
  secondaryCta: {
    heading: "Need better logistics coordination?",
    subHeading:
      "Tell us what you need. Our team will analyze your best route and mode options within 1 business day.",
    cta: "Talk to Our Team",
  },
  footer: {
    tagline: "We Care What We Deliver",
    servicesLabel: "Services",
    companyLabel: "Company",
    contactLabel: "Contact",
    copyright: "PT Utama Globalindo Cargo. All rights reserved.",
    address: "Jakarta, Indonesia",
  },
  contact: {
    heading: "Let's Talk Logistics",
    subHeading:
      "Tell us what you need, and one of our specialists will get back to you within 1 business day.",
    step1Title: "What service do you need?",
    step2Title: "Estimated shipping volume?",
    step3Title: "Who should we contact?",
    stepOf: "of",
    next: "Continue",
    back: "Back",
    submit: "Submit & Schedule a Call",
    submitting: "Submitting...",
    successTitle: "Thank You.",
    successMessage:
      "Our team will respond within 1 business day to schedule an initial discussion based on your requirements.",
    directContact: "Or contact us directly",
    orContactDirectly: "Or reach us directly via email or WhatsApp.",
    privacyConsent:
      "I agree that the data I submit will be used by PT Utama Globalindo Cargo to respond to this request and contact me regarding logistics services. Data will not be shared with third parties without consent.",
    fields: {
      contactPerson: "Full Name",
      companyName: "Company Name",
      email: "Work Email",
      phone: "Phone / WhatsApp",
      cargoDescription: "Cargo Description",
      originDestination: "Route / Origin - Destination",
      timeline: "Target Timeline",
    },
    placeholders: {
      contactPerson: "Your full name",
      companyName: "Your company name",
      email: "name@company.com",
      phone: "+62 812 xxxx xxxx",
      cargoDescription: "e.g. electronic components, chemicals, heavy machinery...",
      originDestination: "e.g. Shanghai to Jakarta, Surabaya to Makassar...",
      timeline: "e.g. within 2 weeks, monthly regular, ASAP...",
    },
    errors: {
      serviceRequired: "Select the service you need",
      volumeRequired: "Select your estimated shipping volume",
      nameRequired: "Full name is required",
      companyRequired: "Company name is required",
      emailInvalid: "Invalid email format",
      phoneRequired: "Phone / WhatsApp number is required",
      consentRequired: "You must agree to the privacy policy",
    },
  },
  about: {
    heading: "About UGC Logistics",
    subHeading:
      "A Jakarta-based freight forwarder and logistics company serving domestic and international routes.",
    missionHeading: "What We Do",
    missionText:
      "UGC Logistics (Utama Globalindo Cargo) manages end-to-end logistics coordination. Our clients deal with one team for transport, documentation, customs, and warehousing. No juggling multiple vendors.",
    storyHeading: "Why One Point of Coordination",
    storyText:
      "In freight forwarding, problems most often surface at handoff points: from one mode to another, from one vendor to the next. Every handoff is a risk. Our approach is simple: reduce the number of parties involved, and you reduce the points of failure.",
    valuesHeading: "How We Operate",
    values: [
      {
        title: "Transparency",
        description:
          "You know where your cargo is, what it costs, and when it arrives. No hidden fees or inflated estimates.",
      },
      {
        title: "Reliability",
        description:
          "We select partners and routes based on track record, not the lowest price. Consistency matters more than one cheap shipment.",
      },
      {
        title: "Responsiveness",
        description:
          "An operations team you can reach when you need them. Logistics problems don't wait for office hours.",
      },
      {
        title: "Documentation Accuracy",
        description:
          "Smooth customs clearance starts with correct documents. We verify HS classification, invoices, and packing lists before cargo moves.",
      },
    ],
    ctaHeading: "Ready to Talk?",
    ctaText:
      "Tell us about your logistics needs. Our team is ready to analyze your best options.",
    ctaButton: "Contact Us",
  },
  faq: {
    heading: "Frequently Asked Questions",
    subHeading:
      "Straight answers to common questions about our logistics services.",
    items: [
      {
        question: "What services does UGC Logistics offer?",
        answer:
          "We handle domestic distribution (FTL, LTL, FCL, LCL, airfreight), international freight forwarding (export and import via sea and air), import door-to-door, customs brokerage, warehousing and fulfillment, project cargo for special handling, and blocspace and charter for guaranteed capacity.",
      },
      {
        question: "How long does customs clearance typically take?",
        answer:
          "For standard imports with complete documentation, customs clearance usually takes 2-5 business days at major ports. Duration varies depending on goods type, document completeness, and inspection channel (red, yellow, green). We prepare documents before cargo arrives to speed up the process.",
      },
      {
        question: "Can UGC handle dangerous goods?",
        answer:
          "Yes. We handle dangerous goods shipments in compliance with IATA (air) and IMDG (sea) regulations. Our team assists with classification, packaging, labeling, and required documentation. Certain DG types may require longer booking lead times due to carrier restrictions.",
      },
      {
        question: "How do I get a price quote?",
        answer:
          "Fill out our contact form with basic information: cargo type, origin-destination route, estimated volume, and timeline. Our team will get back to you within 1 business day with options and cost estimates. For urgent needs, contact us directly via WhatsApp or phone.",
      },
      {
        question: "Does UGC provide warehousing services?",
        answer:
          "Yes, we offer general warehousing, bonded warehouse for imported goods with deferred duties, pick and pack fulfillment for e-commerce, and cross-docking for rapid distribution. Warehouse locations are available in the Jakarta metropolitan area.",
      },
      {
        question: "What is the difference between FCL and LCL?",
        answer:
          "FCL (Full Container Load) means you book an entire container exclusively for your cargo. LCL (Less than Container Load) means your cargo is consolidated with other shippers in one container. FCL suits large volumes, LCL is more economical for smaller volumes.",
      },
      {
        question: "Does UGC ship to areas outside Java?",
        answer:
          "Yes. Our domestic distribution covers all of Indonesia, including Sumatra, Kalimantan, Sulawesi, Bali, Nusa Tenggara, Maluku, and Papua. Transport modes are adapted: trucks for Java, vessels and aircraft for inter-island routes.",
      },
      {
        question: "Is there a minimum shipping volume?",
        answer:
          "No absolute minimum. For LCL and LTL, we accept small volumes. For shipments where cost efficiency matters at lower volumes, we recommend consolidation options that fit your budget and timeline.",
      },
    ],
    ctaHeading: "Have another question?",
    ctaButton: "Contact Our Team",
  },
  caseStudies: {
    heading: "Case Studies",
    subHeading:
      "Real examples of how we help clients solve their logistics challenges.",
    filterAll: "All",
    ctaHeading: "Facing a similar logistics challenge?",
    ctaButton: "Discuss with Our Team",
  },
  services: {
    landing: {
      heading: "Logistics Services",
      subHeading:
        "Six service categories covering your full supply chain needs, from factory pickup to final warehouse delivery.",
    },
    cta: "Discuss Your Requirements",
    process: "How It Works",
    bestFor: "Best For",
    subServices: "Services in This Category",
  },
  industries: {
    heading: "Industries We Serve",
    subHeading:
      "Every industry has unique logistics needs. Here is how we tailor our services for each sector.",
    challenge: "Logistics Challenge",
    solution: "How UGC Helps",
    cta: "Discuss Your Industry Needs",
  },
  common: {
    learnMore: "Learn More",
    getQuote: "Get a Quote",
    viewAll: "View All",
    readMore: "Read More",
    language: "Bahasa Indonesia",
  },
};

export default en;
