export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      albums: {
        Row: {
          active: boolean
          buy_url: string | null
          cover_url: string | null
          created_at: string
          id: string
          slug: string
          sort_order: number
          stream_url: string | null
          tagline: string | null
          title: string
          tracks: number
          type: string
          updated_at: string
          year: number
        }
        Insert: {
          active?: boolean
          buy_url?: string | null
          cover_url?: string | null
          created_at?: string
          id?: string
          slug: string
          sort_order?: number
          stream_url?: string | null
          tagline?: string | null
          title: string
          tracks?: number
          type?: string
          updated_at?: string
          year: number
        }
        Update: {
          active?: boolean
          buy_url?: string | null
          cover_url?: string | null
          created_at?: string
          id?: string
          slug?: string
          sort_order?: number
          stream_url?: string | null
          tagline?: string | null
          title?: string
          tracks?: number
          type?: string
          updated_at?: string
          year?: number
        }
        Relationships: []
      }
      compositions: {
        Row: {
          active: boolean
          created_at: string
          difficulty: string
          id: string
          key: string
          pages: number
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          difficulty?: string
          id?: string
          key: string
          pages?: number
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          difficulty?: string
          id?: string
          key?: string
          pages?: number
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      fan_club_members: {
        Row: {
          email: string
          id: string
          joined_at: string
          name: string | null
        }
        Insert: {
          email: string
          id?: string
          joined_at?: string
          name?: string | null
        }
        Update: {
          email?: string
          id?: string
          joined_at?: string
          name?: string | null
        }
        Relationships: []
      }
      merch: {
        Row: {
          active: boolean
          cover_url: string | null
          created_at: string
          id: string
          name: string
          price: string
          sort_order: number
          tag: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          cover_url?: string | null
          created_at?: string
          id?: string
          name: string
          price: string
          sort_order?: number
          tag?: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          cover_url?: string | null
          created_at?: string
          id?: string
          name?: string
          price?: string
          sort_order?: number
          tag?: string
          updated_at?: string
        }
        Relationships: []
      }
      news: {
        Row: {
          content: string | null
          created_at: string
          date: string
          excerpt: string
          id: string
          published: boolean
          slug: string
          tag: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          date?: string
          excerpt: string
          id?: string
          published?: boolean
          slug: string
          tag?: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          date?: string
          excerpt?: string
          id?: string
          published?: boolean
          slug?: string
          tag?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      orders: {
        Row: {
          created_at: string
          customer_email: string
          id: string
          items: Json
          status: string
          total: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_email: string
          id?: string
          items?: Json
          status?: string
          total: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_email?: string
          id?: string
          items?: Json
          status?: string
          total?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tour_dates: {
        Row: {
          active: boolean
          city: string
          country: string
          created_at: string
          date: string
          id: string
          status: string
          ticket_url: string | null
          updated_at: string
          venue: string
          vip: boolean
        }
        Insert: {
          active?: boolean
          city: string
          country: string
          created_at?: string
          date: string
          id?: string
          status?: string
          ticket_url?: string | null
          updated_at?: string
          venue: string
          vip?: boolean
        }
        Update: {
          active?: boolean
          city?: string
          country?: string
          created_at?: string
          date?: string
          id?: string
          status?: string
          ticket_url?: string | null
          updated_at?: string
          venue?: string
          vip?: boolean
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      videos: {
        Row: {
          active: boolean
          created_at: string
          director: string | null
          era: string | null
          id: string
          sort_order: number
          thumb_url: string | null
          title: string
          updated_at: string
          youtube_id: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          director?: string | null
          era?: string | null
          id?: string
          sort_order?: number
          thumb_url?: string | null
          title: string
          updated_at?: string
          youtube_id: string
        }
        Update: {
          active?: boolean
          created_at?: string
          director?: string | null
          era?: string | null
          id?: string
          sort_order?: number
          thumb_url?: string | null
          title?: string
          updated_at?: string
          youtube_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
