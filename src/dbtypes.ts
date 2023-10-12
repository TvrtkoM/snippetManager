export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      snippets: {
        Row: {
          id: number
          lang: Database["public"]["Enums"]["language"] | null
          name: string
          snippet: string | null
          user_id: string | null
        }
        Insert: {
          id?: number
          lang?: Database["public"]["Enums"]["language"] | null
          name: string
          snippet?: string | null
          user_id?: string | null
        }
        Update: {
          id?: number
          lang?: Database["public"]["Enums"]["language"] | null
          name?: string
          snippet?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "snippets_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      language: "javascript" | "python"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
