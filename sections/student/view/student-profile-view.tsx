"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Student } from "@/types/student"

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
      <div className="flex gap-4 mb-4 items-center">
        <Link
          href="/students"
          className="text-blue-500 hover:underline"
        >
          &larr; Back to Students
        </Link>
        <span className="text-gray-300">|</span>
        <Link
          href={`/students/${student.id}/edit`}
          className="text-amber-600 hover:underline"
        >
          Edit Profile
        </Link>
      </div>
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
