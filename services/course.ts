import apiClient from "@/lib/api-client"
import { Course } from "@/types/course"

export interface CreateCoursePayload {
  course_title: string
  course_fee: number
  duration_months: number
  description?: string
  is_available?: boolean
}

export interface UpdateCoursePayload extends CreateCoursePayload {}

export const getCourses = async () => {
  const response = await apiClient.get<{ courses: Course[] }>("/api/courses")
  return response.data
}

export const getCourse = async (id: string | number) => {
  const response = await apiClient.get<{ course: Course }>(`/api/courses/${id}`)
  return response.data
}

export const createCourse = async (payload: CreateCoursePayload) => {
  const response = await apiClient.post<{ message?: string; course?: Course }>(
    "/api/courses",
    payload
  )
  return response.data
}

export const updateCourse = async (id: string | number, payload: UpdateCoursePayload) => {
  const response = await apiClient.put<{ message?: string; course?: Course }>(
    `/api/courses/${id}`,
    payload
  )
  return response.data
}

export const deleteCourse = async (id: string | number) => {
  const response = await apiClient.delete<{ message?: string }>(`/api/courses/${id}`)
  return response.data
}
