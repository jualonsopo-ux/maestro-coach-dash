import { useState, useEffect } from 'react'
import { supabase, type Database } from '@/lib/supabase'

type Contact = Database['public']['Tables']['contacts']['Row']

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('updated_at', { ascending: false })

      if (error) throw error

      setContacts(data || [])
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
      console.error('Error fetching contacts:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateContactStage = async (contactId: string, newStage: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ 
          etapa: newStage,
          updated_at: new Date().toISOString()
        })
        .eq('id', contactId)

      if (error) throw error

      // Update local state
      setContacts(prev => 
        prev.map(contact => 
          contact.id === contactId 
            ? { ...contact, etapa: newStage, updated_at: new Date().toISOString() }
            : contact
        )
      )
    } catch (err) {
      console.error('Error updating contact stage:', err)
      throw err
    }
  }

  const updateContactField = async (contactId: string, field: string, value: any) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ 
          [field]: value,
          updated_at: new Date().toISOString()
        })
        .eq('id', contactId)

      if (error) throw error

      // Update local state
      setContacts(prev => 
        prev.map(contact => 
          contact.id === contactId 
            ? { ...contact, [field]: value, updated_at: new Date().toISOString() }
            : contact
        )
      )
    } catch (err) {
      console.error('Error updating contact:', err)
      throw err
    }
  }

  const addContact = async (contactData: Omit<Contact, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([{
          ...contactData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) throw error

      setContacts(prev => [data, ...prev])
      return data
    } catch (err) {
      console.error('Error adding contact:', err)
      throw err
    }
  }

  useEffect(() => {
    fetchContacts()

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('contacts')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'contacts' 
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setContacts(prev => [payload.new as Contact, ...prev])
        } else if (payload.eventType === 'UPDATE') {
          setContacts(prev => 
            prev.map(contact => 
              contact.id === payload.new.id ? payload.new as Contact : contact
            )
          )
        } else if (payload.eventType === 'DELETE') {
          setContacts(prev => 
            prev.filter(contact => contact.id !== payload.old.id)
          )
        }
      })
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return {
    contacts,
    loading,
    error,
    updateContactStage,
    updateContactField,
    addContact,
    refetch: fetchContacts
  }
}