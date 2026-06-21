"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { Student } from "@/types/student"

export default function StudentListView() {
  const [students, setStudents] = useState<Student[]>([])

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "https://jey-student-api.up.railway.app/api/students"
      )
      setStudents(response.data.students)
    } catch (error) {
      console.error("Error fetching students:", error)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

  return (
    <div className="p-6">
      <Link
        href="/"
        className="mb-4 inline-block text-blue-500 hover:underline"
      >
        &larr; Back to Home
      </Link>
      <Table>
        <TableCaption>A list of students fetched from the API.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">CGPA</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.id}</TableCell>
              <TableCell>{student.full_name}</TableCell>
              <TableCell>{student.email}</TableCell>
              <TableCell className="text-right">{student.cgpa}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-3">
                  <Link
                    href={`/students/${student.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    href={`/students/${student.id}/edit`}
                    className="text-amber-600 hover:underline"
                  >
                    Edit
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
