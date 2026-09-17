/**
 * Database type definitions for all 22 tables in the Tazcal Supabase schema.
 *
 * This is a hand-written placeholder that mirrors the exact schema provided.
 * It can be replaced later with `npx supabase gen types typescript` output.
 */

export type UserRole = 'user' | 'admin';
export type LanguageCode = 'en' | 'fa' | 'ar' | 'es' | 'de' | 'fr' | 'ru';

export type BlogPostStatus = 'draft' | 'published' | 'scheduled' | 'archived';
export type CommentStatus = 'pending' | 'approved' | 'spam' | 'rejected';
export type FeatureRequestStatus =
  | 'new'
  | 'under_review'
  | 'planned'
  | 'in_progress'
  | 'completed'
  | 'declined';
export type SupportTicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type SupportTicketPriority = 'low' | 'normal' | 'high' | 'urgent';
export type ChangelogType = 'feature' | 'improvement' | 'fix' | 'breaking';
export type RoadmapStatus = 'in_progress' | 'planned' | 'completed';

export interface ProfileRow {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  preferred_language: LanguageCode | null;
  role: UserRole | null;
  bio: string | null;
  website: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPostRow {
  id: string;
  slug: string;
  cover_image_url: string | null;
  author_id: string | null;
  status: BlogPostStatus;
  featured: boolean;
  view_count: number;
  reading_time_minutes: number | null;
  published_at: string | null;
  scheduled_for: string | null;
  created_at: string;
  updated_at: string;
}

export interface BlogPostTranslationRow {
  id: string;
  post_id: string;
  language_code: LanguageCode;
  title: string;
  excerpt: string | null;
  content: string | null;
  content_html: string | null;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  og_image_url: string | null;
  canonical_url: string | null;
}

export interface BlogCategoryRow {
  id: string;
  slug: string;
  icon: string | null;
  sort_order: number;
  created_at: string;
}

export interface BlogCategoryTranslationRow {
  id: string;
  category_id: string;
  language_code: LanguageCode;
  name: string;
  description: string | null;
}

export interface BlogTagRow {
  id: string;
  slug: string;
  created_at: string;
}

export interface BlogTagTranslationRow {
  id: string;
  tag_id: string;
  language_code: LanguageCode;
  name: string;
}

export interface BlogPostCategoryRow {
  post_id: string;
  category_id: string;
}

export interface BlogPostTagRow {
  post_id: string;
  tag_id: string;
}

export interface BlogCommentRow {
  id: string;
  post_id: string;
  user_id: string | null;
  parent_id: string | null;
  author_name: string;
  author_email: string | null;
  content: string;
  status: CommentStatus;
  likes_count: number;
  created_at: string;
  updated_at: string;
}

export interface FeatureRequestRow {
  id: string;
  user_id: string | null;
  author_name: string | null;
  author_email: string | null;
  title: string;
  description: string;
  category: string | null;
  status: FeatureRequestStatus;
  admin_note: string | null;
  votes_count: number;
  language_code: LanguageCode | null;
  created_at: string;
  updated_at: string;
}

export interface FeatureRequestVoteRow {
  request_id: string;
  user_id: string;
  created_at: string;
}

export interface SupportTicketRow {
  id: string;
  user_id: string | null;
  email: string;
  subject: string;
  message: string;
  category: string | null;
  status: SupportTicketStatus;
  priority: SupportTicketPriority;
  admin_reply: string | null;
  language_code: LanguageCode | null;
  created_at: string;
  updated_at: string;
}

export interface FaqRow {
  id: string;
  category: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface FaqTranslationRow {
  id: string;
  faq_id: string;
  language_code: LanguageCode;
  question: string;
  answer: string;
}

export interface ChangelogEntryRow {
  id: string;
  version: string;
  release_date: string;
  type: ChangelogType;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ChangelogTranslationRow {
  id: string;
  entry_id: string;
  language_code: LanguageCode;
  title: string;
  description: string;
}

export interface RoadmapItemRow {
  id: string;
  status: RoadmapStatus;
  sort_order: number;
  is_published: boolean;
  icon: string | null;
  created_at: string;
  updated_at: string;
}

export interface RoadmapTranslationRow {
  id: string;
  item_id: string;
  language_code: LanguageCode;
  title: string;
  description: string;
}

export interface SiteSettingsRow {
  key: string;
  value: Record<string, unknown>;
  description: string | null;
  updated_at: string;
}

export interface WaitlistEmailRow {
  id: string;
  email: string;
  language_code: LanguageCode | null;
  platform: string | null;
  is_notified: boolean;
  created_at: string;
}

export interface BlogPostViewRow {
  id: string;
  post_id: string;
  language_code: LanguageCode | null;
  ip_hash: string | null;
  user_agent: string | null;
  viewed_at: string;
}

/**
 * Aggregate type mapping table names to their row shapes,
 * compatible with the Supabase JS client generic.
 */
export interface Database {
  public: {
    Tables: {
      profiles: { Row: ProfileRow; Insert: Partial<ProfileRow>; Update: Partial<ProfileRow> };
      blog_posts: { Row: BlogPostRow; Insert: Partial<BlogPostRow>; Update: Partial<BlogPostRow> };
      blog_post_translations: {
        Row: BlogPostTranslationRow;
        Insert: Partial<BlogPostTranslationRow>;
        Update: Partial<BlogPostTranslationRow>;
      };
      blog_categories: {
        Row: BlogCategoryRow;
        Insert: Partial<BlogCategoryRow>;
        Update: Partial<BlogCategoryRow>;
      };
      blog_category_translations: {
        Row: BlogCategoryTranslationRow;
        Insert: Partial<BlogCategoryTranslationRow>;
        Update: Partial<BlogCategoryTranslationRow>;
      };
      blog_tags: { Row: BlogTagRow; Insert: Partial<BlogTagRow>; Update: Partial<BlogTagRow> };
      blog_tag_translations: {
        Row: BlogTagTranslationRow;
        Insert: Partial<BlogTagTranslationRow>;
        Update: Partial<BlogTagTranslationRow>;
      };
      blog_post_categories: {
        Row: BlogPostCategoryRow;
        Insert: Partial<BlogPostCategoryRow>;
        Update: Partial<BlogPostCategoryRow>;
      };
      blog_post_tags: {
        Row: BlogPostTagRow;
        Insert: Partial<BlogPostTagRow>;
        Update: Partial<BlogPostTagRow>;
      };
      blog_comments: {
        Row: BlogCommentRow;
        Insert: Partial<BlogCommentRow>;
        Update: Partial<BlogCommentRow>;
      };
      feature_requests: {
        Row: FeatureRequestRow;
        Insert: Partial<FeatureRequestRow>;
        Update: Partial<FeatureRequestRow>;
      };
      feature_request_votes: {
        Row: FeatureRequestVoteRow;
        Insert: Partial<FeatureRequestVoteRow>;
        Update: Partial<FeatureRequestVoteRow>;
      };
      support_tickets: {
        Row: SupportTicketRow;
        Insert: Partial<SupportTicketRow>;
        Update: Partial<SupportTicketRow>;
      };
      faqs: { Row: FaqRow; Insert: Partial<FaqRow>; Update: Partial<FaqRow> };
      faq_translations: {
        Row: FaqTranslationRow;
        Insert: Partial<FaqTranslationRow>;
        Update: Partial<FaqTranslationRow>;
      };
      changelog_entries: {
        Row: ChangelogEntryRow;
        Insert: Partial<ChangelogEntryRow>;
        Update: Partial<ChangelogEntryRow>;
      };
      changelog_translations: {
        Row: ChangelogTranslationRow;
        Insert: Partial<ChangelogTranslationRow>;
        Update: Partial<ChangelogTranslationRow>;
      };
      roadmap_items: {
        Row: RoadmapItemRow;
        Insert: Partial<RoadmapItemRow>;
        Update: Partial<RoadmapItemRow>;
      };
      roadmap_translations: {
        Row: RoadmapTranslationRow;
        Insert: Partial<RoadmapTranslationRow>;
        Update: Partial<RoadmapTranslationRow>;
      };
      site_settings: {
        Row: SiteSettingsRow;
        Insert: Partial<SiteSettingsRow>;
        Update: Partial<SiteSettingsRow>;
      };
      waitlist_emails: {
        Row: WaitlistEmailRow;
        Insert: Partial<WaitlistEmailRow>;
        Update: Partial<WaitlistEmailRow>;
      };
      blog_post_views: {
        Row: BlogPostViewRow;
        Insert: Partial<BlogPostViewRow>;
        Update: Partial<BlogPostViewRow>;
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_admin: { Args: Record<string, never>; Returns: boolean };
      handle_updated_at: { Args: Record<string, never>; Returns: unknown };
      handle_new_user: { Args: Record<string, never>; Returns: unknown };
      update_feature_request_votes: { Args: Record<string, never>; Returns: unknown };
    };
    Enums: {
      user_role: UserRole;
      blog_post_status: BlogPostStatus;
      comment_status: CommentStatus;
      feature_request_status: FeatureRequestStatus;
      support_ticket_status: SupportTicketStatus;
      support_ticket_priority: SupportTicketPriority;
      changelog_type: ChangelogType;
      roadmap_status: RoadmapStatus;
      language_code: LanguageCode;
    };
  };
}
