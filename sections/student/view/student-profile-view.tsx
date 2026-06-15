"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"

interface Student {
  id: number
  full_name: string
  email: string
  age: number
  cgpa: number
  is_active: boolean
  joined_date: string
  created_at: string
}

export default function StudentProfileView() {
  const { id } = useParams()

  const [student, setStudent] = useState<Student | null>(null)

  const fetchStudent = async () => {
    try {
      const response = await axios.get(
        `https://jey-student-api.up.railway.app/api/students/${id}`
      )
      setStudent(response.data.student)
    } catch (error) {
      console.error("Error fetching student:", error)
    }
  }

  useEffect(() => {
    fetchStudent()
  }, [id])  

  if (!student) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-2 p-6">
      <h1 className="text-2xl font-bold">{student.full_name}</h1>

      <p>ID: {student.id}</p>
      <p>Email: {student.email}</p>
      <p>Age: {student.age}</p>
      <p>CGPA: {student.cgpa}</p>
      <p>Status: {student.is_active ? "Active" : "Inactive"}</p>
      <p>Joined Date: {student.joined_date}</p>
      <p>Created At: {student.created_at}</p>
    </div>
  )
}
