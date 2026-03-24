import { z } from 'zod'

export const roleOptions = [
  { value: '', label: 'Select one...' },
  { value: 'crop_farmer', label: 'Crop Farmer / Grower' },
  { value: 'livestock', label: 'Livestock / Ranching' },
  { value: 'orchard_vineyard', label: 'Orchard / Vineyard' },
  { value: 'ag_business', label: 'Agricultural Business' },
  { value: 'land_owner', label: 'Land Developer / Owner' },
  { value: 'other', label: 'Other' },
] as const

export const formSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Please enter your full name')
    .max(80, 'Name is too long')
    .regex(/^[a-zA-Z\s'\-.]+$/, 'Name contains invalid characters'),

  email: z
    .string()
    .email('Please enter a valid email address')
    .max(254, 'Email address is too long'),

  phone: z
    .string()
    .min(1, 'Phone number is required')
    .refine(
      (val) => val.replace(/\D/g, '').length === 10,
      'Please enter a valid 10-digit phone number'
    ),

  role: z.string().min(1, 'Please select an option'),
})

export type FormData = z.infer<typeof formSchema>
