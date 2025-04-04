export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      conversations: {
        Row: {
          created_at: string
          feedback_id: string | null
          id: string
          message: string | null
          sender: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          feedback_id?: string | null
          id?: string
          message?: string | null
          sender?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          feedback_id?: string | null
          id?: string
          message?: string | null
          sender?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "conversations_feedback_id_fkey"
            columns: ["feedback_id"]
            isOneToOne: false
            referencedRelation: "feedbacks"
            referencedColumns: ["id"]
          },
        ]
      }
      feedbacks: {
        Row: {
          created_at: string
          feedback_text: string | null
          feedback_title: string | null
          id: string
          read: boolean | null
          resume_id: string | null
          target_position: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          feedback_text?: string | null
          feedback_title?: string | null
          id?: string
          read?: boolean | null
          resume_id?: string | null
          target_position?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          feedback_text?: string | null
          feedback_title?: string | null
          id?: string
          read?: boolean | null
          resume_id?: string | null
          target_position?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feedbacks_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
        ]
      }
      generated_resumes: {
        Row: {
          certifications: Json | null
          created_at: string
          education: Json | null
          experience: Json | null
          id: string
          interests: Json | null
          languages: Json | null
          personal_info: Json | null
          projects: Json | null
          resume_id: string | null
          skills: Json | null
          summary: string | null
          template_id: string | null
          user_id: string | null
        }
        Insert: {
          certifications?: Json | null
          created_at?: string
          education?: Json | null
          experience?: Json | null
          id?: string
          interests?: Json | null
          languages?: Json | null
          personal_info?: Json | null
          projects?: Json | null
          resume_id?: string | null
          skills?: Json | null
          summary?: string | null
          template_id?: string | null
          user_id?: string | null
        }
        Update: {
          certifications?: Json | null
          created_at?: string
          education?: Json | null
          experience?: Json | null
          id?: string
          interests?: Json | null
          languages?: Json | null
          personal_info?: Json | null
          projects?: Json | null
          resume_id?: string | null
          skills?: Json | null
          summary?: string | null
          template_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "generated_resumes_resume_id_fkey"
            columns: ["resume_id"]
            isOneToOne: false
            referencedRelation: "resumes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "generated_resumes_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "templates"
            referencedColumns: ["id"]
          },
        ]
      }
      resumes: {
        Row: {
          certifications: Json | null
          created_at: string
          education: Json | null
          experience: Json | null
          file_url: string | null
          id: string
          interests: Json | null
          languages: Json | null
          personal_info: Json | null
          projects: Json | null
          skills: Json | null
          summary: string | null
          user_id: string | null
        }
        Insert: {
          certifications?: Json | null
          created_at?: string
          education?: Json | null
          experience?: Json | null
          file_url?: string | null
          id?: string
          interests?: Json | null
          languages?: Json | null
          personal_info?: Json | null
          projects?: Json | null
          skills?: Json | null
          summary?: string | null
          user_id?: string | null
        }
        Update: {
          certifications?: Json | null
          created_at?: string
          education?: Json | null
          experience?: Json | null
          file_url?: string | null
          id?: string
          interests?: Json | null
          languages?: Json | null
          personal_info?: Json | null
          projects?: Json | null
          skills?: Json | null
          summary?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      templates: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
