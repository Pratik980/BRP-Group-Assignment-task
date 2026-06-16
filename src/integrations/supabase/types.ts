export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      about_content: {
        Row: {
          section_key: string;
          title: string | null;
          content: string | null;
          image_url: string | null;
          metadata: Json;
          updated_at: string;
        };
        Insert: {
          section_key: string;
          title?: string | null;
          content?: string | null;
          image_url?: string | null;
          metadata?: Json;
          updated_at?: string;
        };
        Update: {
          section_key?: string;
          title?: string | null;
          content?: string | null;
          image_url?: string | null;
          metadata?: Json;
          updated_at?: string;
        };
        Relationships: [];
      };
      blog_categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string | null;
          featured_image_url: string | null;
          category_id: string | null;
          tags: string[];
          status: string;
          published_at: string | null;
          seo_title: string | null;
          seo_description: string | null;
          og_image_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content?: string | null;
          featured_image_url?: string | null;
          category_id?: string | null;
          tags?: string[];
          status?: string;
          published_at?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          og_image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: string | null;
          featured_image_url?: string | null;
          category_id?: string | null;
          tags?: string[];
          status?: string;
          published_at?: string | null;
          seo_title?: string | null;
          seo_description?: string | null;
          og_image_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "blog_posts_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "blog_categories";
            referencedColumns: ["id"];
          },
        ];
      };
      contact_submissions: {
        Row: {
          id: string;
          name: string;
          email: string;
          message: string;
          organization: string | null;
          phone: string | null;
          subject: string | null;
          is_read: boolean;
          is_starred: boolean;
          admin_note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          message: string;
          organization?: string | null;
          phone?: string | null;
          subject?: string | null;
          is_read?: boolean;
          is_starred?: boolean;
          admin_note?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          message?: string;
          organization?: string | null;
          phone?: string | null;
          subject?: string | null;
          is_read?: boolean;
          is_starred?: boolean;
          admin_note?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      footer_link_groups: {
        Row: {
          id: string;
          title: string;
          links: Json;
          display_order: number;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          links?: Json;
          display_order?: number;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          links?: Json;
          display_order?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      gallery_albums: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      gallery_images: {
        Row: {
          id: string;
          album_id: string;
          image_url: string;
          caption: string | null;
          alt_text: string | null;
          display_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          album_id: string;
          image_url: string;
          caption?: string | null;
          alt_text?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          album_id?: string;
          image_url?: string;
          caption?: string | null;
          alt_text?: string | null;
          display_order?: number;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "gallery_images_album_id_fkey";
            columns: ["album_id"];
            isOneToOne: false;
            referencedRelation: "gallery_albums";
            referencedColumns: ["id"];
          },
        ];
      };
      hero_slides: {
        Row: {
          id: string;
          headline: string;
          subheadline: string | null;
          cta_text: string | null;
          cta_url: string | null;
          background_image_url: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          headline: string;
          subheadline?: string | null;
          cta_text?: string | null;
          cta_url?: string | null;
          background_image_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          headline?: string;
          subheadline?: string | null;
          cta_text?: string | null;
          cta_url?: string | null;
          background_image_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      impact_stats: {
        Row: {
          id: string;
          label: string;
          value: string;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          label: string;
          value: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          label?: string;
          value?: string;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      job_applications: {
        Row: {
          id: string;
          vacancy_id: string | null;
          full_name: string;
          email: string;
          phone: string;
          address: string;
          position: string;
          experience: string;
          portfolio_url: string | null;
          cover_letter: string | null;
          resume_path: string;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          vacancy_id?: string | null;
          full_name: string;
          email: string;
          phone: string;
          address: string;
          position: string;
          experience: string;
          portfolio_url?: string | null;
          cover_letter?: string | null;
          resume_path: string;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          vacancy_id?: string | null;
          full_name?: string;
          email?: string;
          phone?: string;
          address?: string;
          position?: string;
          experience?: string;
          portfolio_url?: string | null;
          cover_letter?: string | null;
          resume_path?: string;
          status?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "job_applications_vacancy_id_fkey";
            columns: ["vacancy_id"];
            isOneToOne: false;
            referencedRelation: "job_vacancies";
            referencedColumns: ["id"];
          },
        ];
      };
      job_vacancies: {
        Row: {
          id: string;
          title: string;
          department: string;
          location: string;
          employment_type: string;
          experience_required: string;
          description: string;
          requirements: string[];
          salary_range: string;
          is_active: boolean;
          application_deadline: string;
          apply_email: string | null;
          apply_url: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          department: string;
          location: string;
          employment_type: string;
          experience_required: string;
          description: string;
          requirements?: string[];
          salary_range?: string;
          is_active?: boolean;
          application_deadline: string;
          apply_email?: string | null;
          apply_url?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          department?: string;
          location?: string;
          employment_type?: string;
          experience_required?: string;
          description?: string;
          requirements?: string[];
          salary_range?: string;
          is_active?: boolean;
          application_deadline?: string;
          apply_email?: string | null;
          apply_url?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      media_files: {
        Row: {
          id: string;
          file_name: string;
          storage_path: string;
          public_url: string;
          mime_type: string | null;
          file_size_bytes: number | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          file_name: string;
          storage_path: string;
          public_url: string;
          mime_type?: string | null;
          file_size_bytes?: number | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          file_name?: string;
          storage_path?: string;
          public_url?: string;
          mime_type?: string | null;
          file_size_bytes?: number | null;
          created_at?: string;
        };
        Relationships: [];
      };
      seo_settings: {
        Row: {
          page_slug: string;
          meta_title: string | null;
          meta_description: string | null;
          og_image_url: string | null;
          updated_at: string;
        };
        Insert: {
          page_slug: string;
          meta_title?: string | null;
          meta_description?: string | null;
          og_image_url?: string | null;
          updated_at?: string;
        };
        Update: {
          page_slug?: string;
          meta_title?: string | null;
          meta_description?: string | null;
          og_image_url?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          key: string;
          value: string | null;
          updated_at: string;
        };
        Insert: {
          key: string;
          value?: string | null;
          updated_at?: string;
        };
        Update: {
          key?: string;
          value?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      team_members: {
        Row: {
          id: string;
          full_name: string;
          role: string;
          department: string;
          bio: string | null;
          photo_url: string | null;
          linkedin_url: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          full_name: string;
          role: string;
          department?: string;
          bio?: string | null;
          photo_url?: string | null;
          linkedin_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string;
          role?: string;
          department?: string;
          bio?: string | null;
          photo_url?: string | null;
          linkedin_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      ventures: {
        Row: {
          id: string;
          name: string;
          slug: string;
          tagline: string | null;
          description: string | null;
          logo_url: string | null;
          cover_image_url: string | null;
          category: string;
          external_url: string | null;
          display_order: number;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          tagline?: string | null;
          description?: string | null;
          logo_url?: string | null;
          cover_image_url?: string | null;
          category?: string;
          external_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          tagline?: string | null;
          description?: string | null;
          logo_url?: string | null;
          cover_image_url?: string | null;
          category?: string;
          external_url?: string | null;
          display_order?: number;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;
