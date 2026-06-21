"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'next/navigation'
import StudentNewEditForm from '../student-new-edit-form'
import { Student } from '@/types/student'

export default function StudentEditView() {
  const { id } = useParams()
  const [student, setStudent] = useState<Student | null>(null)

  useEffect(() => {
    if (id) {
      axios
        .get(`https://jey-student-api.up.railway.app/api/students/${id}`)
        .then((response) => {
          setStudent(response.data.student)
        })
        .catch((error) => {
          console.error("Error fetching student:", error)
        })
    }
  }, [id])

  if (!student) {
    return (
      <div className="flex justify-center items-center py-8">
        <div>Loading student details...</div>
      </div>
    )
  }

  return (
    <div className="flex justify-center py-8 px-4">
        <StudentNewEditForm currentStudent={student} />
    </div>
  )
}
