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
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function StudentListView() {
  const [students, setStudents] = useState<Student[]>([])
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!studentToDelete) return
    setIsDeleting(true)
    try {
      await axios.delete(
        `https://jey-student-api.up.railway.app/api/students/${studentToDelete.id}`
      )
      toast.success(`Student "${studentToDelete.full_name}" deleted successfully!`)
      setStudentToDelete(null)
      fetchStudents()
    } catch (error) {
      console.error("Error deleting student:", error)
      toast.error("Failed to delete student.")
    } finally {
      setIsDeleting(false)
    }
  }

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
    axios
      .get("https://jey-student-api.up.railway.app/api/students")
      .then((response) => {
        setStudents(response.data.students)
      })
      .catch((error) => {
        console.error("Error fetching students:", error)
      })
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
                <div className="flex justify-end gap-3 items-center">
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
                  <button
                    onClick={() => setStudentToDelete(student)}
                    className="text-red-600 hover:underline bg-transparent border-0 cursor-pointer p-0 font-medium text-sm"
                  >
                    Delete
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={!!studentToDelete}
        onOpenChange={(open) => {
          if (!open) setStudentToDelete(null)
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete student{" "}
              <strong className="text-foreground font-semibold">
                {studentToDelete?.full_name}
              </strong>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              disabled={isDeleting}
              onClick={() => setStudentToDelete(null)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
