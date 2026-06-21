"use client"

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
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

export default function StudentProfileView() {
  const { id } = useParams()
  const router = useRouter()

  const [student, setStudent] = useState<Student | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!student) return
    setIsDeleting(true)
    try {
      await axios.delete(
        `https://jey-student-api.up.railway.app/api/students/${student.id}`
      )
      toast.success(`Student "${student.full_name}" deleted successfully!`)
      router.push("/students")
    } catch (error) {
      console.error("Error deleting student:", error)
      toast.error("Failed to delete student.")
      setIsDeleting(false)
    }
  }

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
        <span className="text-gray-300">|</span>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="text-red-600 hover:underline bg-transparent border-0 cursor-pointer p-0 text-sm font-medium"
        >
          Delete Profile
        </button>
      </div>
      <h1 className="text-2xl font-bold">{student.full_name}</h1>

      <p>ID: {student.id}</p>
      <p>Email: {student.email}</p>
      <p>Age: {student.age}</p>
      <p>CGPA: {student.cgpa}</p>
      <p>Status: {student.is_active ? "Active" : "Inactive"}</p>
      <p>Joined Date: {student.joined_date}</p>
      <p>Created At: {student.created_at}</p>
      <Dialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Student Profile</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete student{" "}
              <strong className="text-foreground font-semibold">
                {student.full_name}
              </strong>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              disabled={isDeleting}
              onClick={() => setShowDeleteConfirm(false)}
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
