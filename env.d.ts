declare namespace NodeJS {
  interface ProcessEnv {
    // Supabase
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_ROLE_KEY: string;

    // SMTP (Nodemailer)
    SMTP_HOST: string;
    SMTP_PORT: string;
    SMTP_USER: string;
    SMTP_PASS: string;

    // Google Tag Manager
    NEXT_PUBLIC_GTM_ID: string;

    // WhatsApp
    NEXT_PUBLIC_WA_NUMBER: string;
  }
}
