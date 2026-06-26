import apiClient from '@/lib/api-client'
import { Student } from '@/types/student'

export interface CreateStudentPayload {
  full_name: string
  email: string
  age?: number
  joined_date?: string
}

export interface UpdateStudentPayload extends CreateStudentPayload {}

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
