import apiClient from "@/lib/api-client"
import { downloadBlob, getFilenameFromDisposition } from "@/lib/download-file"
import { Course } from "@/types/course"
import { ExportFormat } from "@/types/export"

export interface CreateCoursePayload {
  course_title: string
  course_fee: number
  duration_months: number
  description?: string
  is_available?: boolean
}

export interface UpdateCoursePayload extends CreateCoursePayload {}

export interface ImportResult {
  message: string
  created: number
  skipped: number
  errors?: { row: number; errors: string[] }[]
}

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

export const exportCourses = async (format: ExportFormat) => {
  const response = await apiClient.get("/api/courses/export", {
    params: { format },
    responseType: "blob",
  })
  const filename = getFilenameFromDisposition(
    response.headers["content-disposition"],
    `courses.${format}`
  )
  downloadBlob(response.data, filename)
}

export const importCourses = async (file: File) => {
  const formData = new FormData()
  formData.append("file", file)
  const response = await apiClient.post<ImportResult>("/api/courses/import", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
  return response.data
}
