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
      crossbid_auctions: {
        Row: {
          cents_bid_interval: number | null
          cents_current_bid: number | null
          cents_starting_price: number | null
          end_at: string | null
          id: string
          image_url: string | null
          name: string | null
          user_id: string | null
        }
        Insert: {
          cents_bid_interval?: number | null
          cents_current_bid?: number | null
          cents_starting_price?: number | null
          end_at?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
          user_id?: string | null
        }
        Update: {
          cents_bid_interval?: number | null
          cents_current_bid?: number | null
          cents_starting_price?: number | null
          end_at?: string | null
          id?: string
          image_url?: string | null
          name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      crossbid_bids: {
        Row: {
          auction_id: string | null
          cents_amount: number | null
          date_at: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          auction_id?: string | null
          cents_amount?: number | null
          date_at?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          auction_id?: string | null
          cents_amount?: number | null
          date_at?: string | null
          id?: number
          user_id?: string | null
        }
        Relationships: []
      }
      crossbid_users: {
        Row: {
          email: string | null
          id: string
          main_image_url: string | null
          name: string | null
        }
        Insert: {
          email?: string | null
          id: string
          main_image_url?: string | null
          name?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          main_image_url?: string | null
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "crossbid_users_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      mt_grams_array: {
        Args: {
          words: string
        }
        Returns: string[]
      }
      mt_grams_query: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      mt_grams_vector: {
        Args: {
          "": string
        }
        Returns: unknown
      }
      mt_immutable_timestamp: {
        Args: {
          value: string
        }
        Returns: string
      }
      mt_immutable_timestamptz: {
        Args: {
          value: string
        }
        Returns: string
      }
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
