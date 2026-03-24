import { useState } from 'react'
import { supabase } from '../lib/supabase'
import type { FormData } from '../lib/schema'

interface UseSubmitReturn {
  submit: (data: FormData) => Promise<boolean>
  isLoading: boolean
  error: string | null
  reset: () => void
}

export function useSubmit(): UseSubmitReturn {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (data: FormData): Promise<boolean> => {
    setIsLoading(true)
    setError(null)

    const { error: sbError } = await supabase
      .from('waitlist_signups')
      .insert({
        name: data.fullName,
        email: data.email,
        phone_number: data.phone,
        role: data.role,
      })

    setIsLoading(false)

    if (sbError) {
      setError(
        sbError.code === '23505'
          ? 'This email is already on the list!'
          : 'Something went wrong. Please try again.'
      )
      return false
    }

    return true
  }

  const reset = () => {
    setError(null)
    setIsLoading(false)
  }

  return { submit, isLoading, error, reset }
}
