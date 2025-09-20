import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      contacts: {
        Row: {
          id: string
          nombre: string
          email: string
          telefono: string
          etapa: string
          fuente: string
          outcome: string | null
          valor_estimado: number | null
          ultima_interaccion: string
          proximo_paso: string | null
          due_en: number
          score: number
          etiquetas: string[]
          riesgos: string[]
          ciudad: string | null
          consents: Record<string, boolean>
          objetivos: string | null
          vertical: string | null
          objeciones: string | null
          presupuesto: number | null
          owner: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nombre: string
          email: string
          telefono: string
          etapa: string
          fuente: string
          outcome?: string | null
          valor_estimado?: number | null
          ultima_interaccion?: string
          proximo_paso?: string | null
          due_en?: number
          score?: number
          etiquetas?: string[]
          riesgos?: string[]
          ciudad?: string | null
          consents?: Record<string, boolean>
          objetivos?: string | null
          vertical?: string | null
          objeciones?: string | null
          presupuesto?: number | null
          owner?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          email?: string
          telefono?: string
          etapa?: string
          fuente?: string
          outcome?: string | null
          valor_estimado?: number | null
          ultima_interaccion?: string
          proximo_paso?: string | null
          due_en?: number
          score?: number
          etiquetas?: string[]
          riesgos?: string[]
          ciudad?: string | null
          consents?: Record<string, boolean>
          objetivos?: string | null
          vertical?: string | null
          objeciones?: string | null
          presupuesto?: number | null
          owner?: string
          created_at?: string
          updated_at?: string
        }
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
  }
}