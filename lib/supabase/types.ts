// ─── Primitive helpers ───

export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = JsonValue[];
export type JsonObject = { [key: string]: JsonValue };
export type JsonValue = JsonPrimitive | JsonArray | JsonObject;

// ─── Row types (match Supabase schema 1:1) ───

export interface QuoteSubmission {
  id: string;
  created_at: string;
  locale: string;
  service_type: string | null;
  origin: string | null;
  destination: string | null;
  direction: string | null;
  cargo_weight: number | null;
  cargo_dimensions: string | null;
  cargo_description: string | null;
  special_requirements: string[];
  contact_name: string;
  contact_company: string | null;
  contact_email: string;
  contact_phone: string;
  contact_method: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  utm_term: string | null;
  referrer_url: string | null;
  landing_page: string | null;
  device_type: string | null;
  session_pages_viewed: number | null;
  status: string;
}

export interface ContactSubmission {
  id: string;
  created_at: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  message: string;
  locale: string | null;
  status: string;
}

export interface Article {
  id: string;
  slug_id: string;
  slug_en: string;
  title_id: string;
  title_en: string;
  excerpt_id: string | null;
  excerpt_en: string | null;
  body_id: string;
  body_en: string;
  category: string;
  tags: string[];
  seo_title_id: string | null;
  seo_title_en: string | null;
  seo_description_id: string | null;
  seo_description_en: string | null;
  og_image_url: string | null;
  featured: boolean;
  status: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ClientStory {
  id: string;
  industry_id: string;
  industry_en: string;
  challenge_id: string;
  challenge_en: string;
  solution_id: string;
  solution_en: string;
  result_id: string;
  result_en: string;
  display_quote_id: string | null;
  display_quote_en: string | null;
  service_tags: string[];
  featured: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SEOMetadata {
  id: string;
  page_key: string;
  title_id: string | null;
  title_en: string | null;
  description_id: string | null;
  description_en: string | null;
  og_image_url: string | null;
  updated_at: string;
}

export interface SiteSetting {
  key: string;
  value: JsonValue;
  updated_at: string;
}

export interface FileRecord {
  id: string;
  name: string;
  file_url: string;
  file_type: string | null;
  public: boolean;
  created_at: string;
}

export interface TrackingQuery {
  id: string;
  tracking_number_hash: string;
  result_found: boolean | null;
  locale: string | null;
  device_type: string | null;
  created_at: string;
}

// ─── Insert types (omit server-generated fields) ───

export type QuoteSubmissionInsert = Omit<QuoteSubmission, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type ContactSubmissionInsert = Omit<ContactSubmission, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type ArticleInsert = Omit<Article, "id" | "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type ClientStoryInsert = Omit<ClientStory, "id" | "created_at" | "updated_at"> & {
  id?: string;
  created_at?: string;
  updated_at?: string;
};

export type SEOMetadataInsert = Omit<SEOMetadata, "id" | "updated_at"> & {
  id?: string;
  updated_at?: string;
};

export type SiteSettingInsert = Omit<SiteSetting, "updated_at"> & {
  updated_at?: string;
};

export type FileRecordInsert = Omit<FileRecord, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

export type TrackingQueryInsert = Omit<TrackingQuery, "id" | "created_at"> & {
  id?: string;
  created_at?: string;
};

// ─── Update types (all fields optional except key identifiers) ───

export type QuoteSubmissionUpdate = Partial<Omit<QuoteSubmission, "id" | "created_at">>;
export type ContactSubmissionUpdate = Partial<Omit<ContactSubmission, "id" | "created_at">>;
export type ArticleUpdate = Partial<Omit<Article, "id" | "created_at">>;
export type ClientStoryUpdate = Partial<Omit<ClientStory, "id" | "created_at">>;
export type SEOMetadataUpdate = Partial<Omit<SEOMetadata, "id">>;
export type SiteSettingUpdate = Partial<Omit<SiteSetting, "key">>;
export type FileRecordUpdate = Partial<Omit<FileRecord, "id" | "created_at">>;
export type TrackingQueryUpdate = Partial<Omit<TrackingQuery, "id" | "created_at">>;

// ─── Database type (Supabase generic parameter) ───

export interface Database {
  public: {
    Tables: {
      quote_submissions: {
        Row: QuoteSubmission;
        Insert: QuoteSubmissionInsert;
        Update: QuoteSubmissionUpdate;
      };
      contact_submissions: {
        Row: ContactSubmission;
        Insert: ContactSubmissionInsert;
        Update: ContactSubmissionUpdate;
      };
      articles: {
        Row: Article;
        Insert: ArticleInsert;
        Update: ArticleUpdate;
      };
      client_stories: {
        Row: ClientStory;
        Insert: ClientStoryInsert;
        Update: ClientStoryUpdate;
      };
      seo_metadata: {
        Row: SEOMetadata;
        Insert: SEOMetadataInsert;
        Update: SEOMetadataUpdate;
      };
      site_settings: {
        Row: SiteSetting;
        Insert: SiteSettingInsert;
        Update: SiteSettingUpdate;
      };
      files: {
        Row: FileRecord;
        Insert: FileRecordInsert;
        Update: FileRecordUpdate;
      };
      tracking_queries: {
        Row: TrackingQuery;
        Insert: TrackingQueryInsert;
        Update: TrackingQueryUpdate;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
