import apiClient from '@/lib/api-client'
import { downloadBlob, getFilenameFromDisposition } from '@/lib/download-file'
import { Student } from '@/types/student'
import { ExportFormat } from '@/types/export'

export interface CreateStudentPayload {
  full_name: string
  email: string
  age?: number
  joined_date?: string
}

export interface UpdateStudentPayload extends CreateStudentPayload {}

export interface ImportResult {
  message: string
  created: number
  skipped: number
  errors?: { row: number; errors: string[] }[]
}

export const getStudents = async () => {
  const response = await apiClient.get<{ students: Student[] }>('/api/students')
  return response.data
}

export const getStudent = async (id: string | number) => {
  const response = await apiClient.get<{ student: Student }>(`/api/students/${id}`)
  return response.data
}

export const createStudent = async (payload: CreateStudentPayload) => {
  const response = await apiClient.post<{ message?: string; student?: Student }>('/api/students', payload)
  return response.data
}

export const updateStudent = async (id: string | number, payload: UpdateStudentPayload) => {
  const response = await apiClient.put<{ message?: string; student?: Student }>(`/api/students/${id}`, payload)
  return response.data
}

export const deleteStudent = async (id: string | number) => {
  const response = await apiClient.delete<{ message?: string }>(`/api/students/${id}`)
  return response.data
}

export const exportStudents = async (format: ExportFormat) => {
  const response = await apiClient.get('/api/students/export', {
    params: { format },
    responseType: 'blob',
  })
  const filename = getFilenameFromDisposition(
    response.headers['content-disposition'],
    `students.${format}`
  )
  downloadBlob(response.data, filename)
}

export const importStudents = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await apiClient.post<ImportResult>('/api/students/import', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}
