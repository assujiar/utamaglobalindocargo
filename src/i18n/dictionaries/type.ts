export interface Dictionary {
  metadata: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    services: string;
    industries: string;
    caseStudies: string;
    about: string;
    faq: string;
    contact: string;
  };
  hero: {
    headline: string;
    subHeadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  trustStrip: {
    heading: string;
    description: string;
  };
  servicesOverview: {
    heading: string;
    subHeading: string;
    cta: string;
  };
  howItWorks: {
    heading: string;
    subHeading: string;
    steps: { title: string; description: string }[];
  };
  proof: {
    heading: string;
    subHeading: string;
    cta: string;
  };
  industriesTeaser: {
    heading: string;
    subHeading: string;
    cta: string;
  };
  secondaryCta: {
    heading: string;
    subHeading: string;
    cta: string;
  };
  footer: {
    tagline: string;
    servicesLabel: string;
    companyLabel: string;
    contactLabel: string;
    copyright: string;
    address: string;
  };
  contact: {
    heading: string;
    subHeading: string;
    step1Title: string;
    step2Title: string;
    step3Title: string;
    stepOf: string;
    next: string;
    back: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    directContact: string;
    orContactDirectly: string;
    privacyConsent: string;
    fields: {
      contactPerson: string;
      companyName: string;
      email: string;
      phone: string;
      cargoDescription: string;
      originDestination: string;
      timeline: string;
    };
    placeholders: {
      contactPerson: string;
      companyName: string;
      email: string;
      phone: string;
      cargoDescription: string;
      originDestination: string;
      timeline: string;
    };
    errors: {
      serviceRequired: string;
      volumeRequired: string;
      nameRequired: string;
      companyRequired: string;
      emailInvalid: string;
      phoneRequired: string;
      consentRequired: string;
    };
  };
  about: {
    heading: string;
    subHeading: string;
    missionHeading: string;
    missionText: string;
    storyHeading: string;
    storyText: string;
    valuesHeading: string;
    values: { title: string; description: string }[];
    ctaHeading: string;
    ctaText: string;
    ctaButton: string;
  };
  faq: {
    heading: string;
    subHeading: string;
    items: { question: string; answer: string }[];
    ctaHeading: string;
    ctaButton: string;
  };
  caseStudies: {
    heading: string;
    subHeading: string;
    filterAll: string;
    ctaHeading: string;
    ctaButton: string;
  };
  services: {
    landing: {
      heading: string;
      subHeading: string;
    };
    cta: string;
    process: string;
    bestFor: string;
    subServices: string;
  };
  industries: {
    heading: string;
    subHeading: string;
    challenge: string;
    solution: string;
    cta: string;
  };
  common: {
    learnMore: string;
    getQuote: string;
    viewAll: string;
    readMore: string;
    language: string;
  };
}
