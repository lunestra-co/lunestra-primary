export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1";
  };
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          extensions?: Json;
          operationName?: string;
          query?: string;
          variables?: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string | null;
          slug: string | null;
          statement: string | null;
          description: string | null;
          image: string | null;
          type: string | null;
        };
        Insert: {
          id?: string;
          name?: string | null;
          slug?: string | null;
          statement?: string | null;
          description?: string | null;
          image?: string | null;
          type?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          slug?: string | null;
          statement?: string | null;
          description?: string | null;
          image?: string | null;
          type?: string | null;
        };
        Relationships: [];
      };
      gem_articles: {
        Row: {
          id: string;
          name: string | null;
          headline: string | null;
          introduction: string | null;
          slug: string | null;
          hero_image: string | null;
          sections: Json | null;
          subtitle: string | null;
        };
        Insert: {
          id?: string;
          name?: string | null;
          headline?: string | null;
          introduction?: string | null;
          slug?: string | null;
          hero_image?: string | null;
          sections?: Json | null;
          subtitle?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          headline?: string | null;
          introduction?: string | null;
          slug?: string | null;
          hero_image?: string | null;
          sections?: Json | null;
          subtitle?: string | null;
        };
        Relationships: [];
      };
      gem_products: {
        Row: {
          id: string;
          name: string | null;
          slug: string | null;
          category_id: string | null;
          price: number | null;
          sale_price: number | null;
          weight: number | null;
          shape: string | null;
          image: string | null;
          gallery: Json | null;
          description: string | null;
          videoUrl: string | null;
          available: boolean | null;
          badge: string | null;
          origin: string | null;
          color: string | null;
          dimensions: string | null;
          transparency: string | null;
          treatment: string | null;
          rarity_score: number | null;
          rarity_percentile: number | null;
          rarity_scope: string | null;
          clarity: string | null;
          certification: string | null;
          pricing_type: string | null;
          can_get_certificate: boolean | null;
          certificate_price: number | null;
          certificate_description: string | null;
        };
        Insert: {
          id?: string;
          name?: string | null;
          slug?: string | null;
          category_id?: string | null;
          price?: number | null;
          sale_price?: number | null;
          weight?: number | null;
          shape?: string | null;
          image?: string | null;
          gallery?: Json | null;
          description?: string | null;
          videoUrl?: string | null;
          available?: boolean | null;
          badge?: string | null;
          origin?: string | null;
          color?: string | null;
          dimensions?: string | null;
          transparency?: string | null;
          treatment?: string | null;
          rarity_score?: number | null;
          rarity_percentile?: number | null;
          rarity_scope?: string | null;
          clarity?: string | null;
          certification?: string | null;
          pricing_type?: string | null;
          can_get_certificate?: boolean | null;
          certificate_price?: number | null;
          certificate_description?: string | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          slug?: string | null;
          category_id?: string | null;
          price?: number | null;
          sale_price?: number | null;
          weight?: number | null;
          shape?: string | null;
          image?: string | null;
          gallery?: Json | null;
          description?: string | null;
          videoUrl?: string | null;
          available?: boolean | null;
          badge?: string | null;
          origin?: string | null;
          color?: string | null;
          dimensions?: string | null;
          transparency?: string | null;
          treatment?: string | null;
          rarity_score?: number | null;
          rarity_percentile?: number | null;
          rarity_scope?: string | null;
          clarity?: string | null;
          certification?: string | null;
          pricing_type?: string | null;
          can_get_certificate?: boolean | null;
          certificate_price?: number | null;
          certificate_description?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      jewellery_products: {
        Row: {
          id: string;
          name: string | null;
          slug: string | null;
          category_id: string | null;
          price: number | null;
          sale_price: number | null;
          metal_type: string | null;
          collection: string | null;
          primary_gem_type: string | null;
          style: string | null;
          secondary_gem_details: string | null;
          hallmark_details: string | null;
          setting_type: string | null;
          craftsmanship: string | null;
          image: string | null;
          gallery: Json | null;
          description: string | null;
          videoUrl: string | null;
          available: boolean | null;
          badge: string | null;
          pricing_type: string | null;
          can_get_certificate: boolean | null;
          certificate_price: number | null;
          certificate_description: string | null;
          size_type: string | null;
          sizes: Json | null;
        };
        Insert: {
          id: string;
          name?: string | null;
          slug?: string | null;
          category_id?: string | null;
          price?: number | null;
          sale_price?: number | null;
          metal_type?: string | null;
          collection?: string | null;
          primary_gem_type?: string | null;
          style?: string | null;
          secondary_gem_details?: string | null;
          hallmark_details?: string | null;
          setting_type?: string | null;
          craftsmanship?: string | null;
          image?: string | null;
          gallery?: Json | null;
          description?: string | null;
          videoUrl?: string | null;
          available?: boolean | null;
          badge?: string | null;
          pricing_type?: string | null;
          can_get_certificate?: boolean | null;
          certificate_price?: number | null;
          certificate_description?: string | null;
          size_type?: string | null;
          sizes?: Json | null;
        };
        Update: {
          id?: string;
          name?: string | null;
          slug?: string | null;
          category_id?: string | null;
          price?: number | null;
          sale_price?: number | null;
          metal_type?: string | null;
          collection?: string | null;
          primary_gem_type?: string | null;
          style?: string | null;
          secondary_gem_details?: string | null;
          hallmark_details?: string | null;
          setting_type?: string | null;
          craftsmanship?: string | null;
          image?: string | null;
          gallery?: Json | null;
          description?: string | null;
          videoUrl?: string | null;
          available?: boolean | null;
          badge?: string | null;
          pricing_type?: string | null;
          can_get_certificate?: boolean | null;
          certificate_price?: number | null;
          certificate_description?: string | null;
          size_type?: string | null;
          sizes?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "jewellery_products_category_id_fkey";
            columns: ["category_id"];
            isOneToOne: false;
            referencedRelation: "categories";
            referencedColumns: ["id"];
          },
        ];
      };
      orders: {
        Row: {
          id: string;
          order_number: string;
          order_seq: number;
          user_id: string | null;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          address1: string;
          address2: string | null;
          city: string;
          postal: string;
          items: Json;
          add_crafting_voucher: boolean;
          selected_shop: string | null;
          voucher_price: number | null;
          coupon_code: string | null;
          coupon_discount: number | null;
          payment_method: string;
          payment_slip_url: string | null;
          total: number;
          shipping: number;
          status: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          order_number?: string;
          order_seq?: number;
          user_id?: string | null;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          address1: string;
          address2?: string | null;
          city: string;
          postal: string;
          items: Json;
          add_crafting_voucher?: boolean;
          selected_shop?: string | null;
          voucher_price?: number | null;
          coupon_code?: string | null;
          coupon_discount?: number | null;
          payment_method: string;
          payment_slip_url?: string | null;
          total: number;
          shipping?: number;
          status?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          order_number?: string;
          order_seq?: number;
          user_id?: string | null;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string;
          address1?: string;
          address2?: string | null;
          city?: string;
          postal?: string;
          items?: Json;
          add_crafting_voucher?: boolean;
          selected_shop?: string | null;
          voucher_price?: number | null;
          coupon_code?: string | null;
          coupon_discount?: number | null;
          payment_method?: string;
          payment_slip_url?: string | null;
          total?: number;
          shipping?: number;
          status?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      product_inquiries: {
        Row: {
          id: string;
          inquiry_seq: number;
          product_id: string;
          product_type: string;
          product_name: string;
          product_details: string | null;
          customer_name: string;
          email: string;
          whatsapp_number: string;
          message: string | null;
          status: string;
          created_at: string | null;
          updated_at: string | null;
        };
        Insert: {
          id?: string;
          inquiry_seq?: number;
          product_id: string;
          product_type: string;
          product_name: string;
          product_details?: string | null;
          customer_name: string;
          email: string;
          whatsapp_number: string;
          message?: string | null;
          status: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Update: {
          id?: string;
          inquiry_seq?: number;
          product_id?: string;
          product_type?: string;
          product_name?: string;
          product_details?: string | null;
          customer_name?: string;
          email?: string;
          whatsapp_number?: string;
          message?: string | null;
          status?: string;
          created_at?: string | null;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          first_name: string | null;
          last_name: string | null;
        };
        Insert: {
          id: string;
          first_name?: string | null;
          last_name?: string | null;
        };
        Update: {
          id?: string;
          first_name?: string | null;
          last_name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
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

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

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
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
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

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {},
  },
} as const;
