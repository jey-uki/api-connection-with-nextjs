export type Course = {
  id: number
  course_title: string
  course_fee: number
  duration_months: number
  description?: string | null
  is_available: boolean
  created_at?: string | null
}
