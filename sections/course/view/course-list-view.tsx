"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { deleteCourse, getCourses } from "@/services/course"
import { Course } from "@/types/course"
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
import { createColumns } from "../columns"
import { DataTable } from "../data-table"

export default function CourseListView() {
  const [courses, setCourses] = useState<Course[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [courseToDelete, setCourseToDelete] = useState<Course | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchCourses = useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await getCourses()
      setCourses(data.courses)
    } catch (error) {
      console.error("Error fetching courses:", error)
      toast.error("Failed to load courses.")
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const handleDelete = async () => {
    if (!courseToDelete) return
    setIsDeleting(true)
    try {
      await deleteCourse(courseToDelete.id)
      toast.success(
        `Course "${courseToDelete.course_title}" deleted successfully!`
      )
      setCourseToDelete(null)
      fetchCourses()
    } catch (error) {
      console.error("Error deleting course:", error)
      toast.error("Failed to delete course.")
    } finally {
      setIsDeleting(false)
    }
  }

  const columns = useMemo(
    () => createColumns({ onDelete: setCourseToDelete }),
    []
  )

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-muted-foreground">
        Loading courses...
      </div>
    )
  }

  return (
    <>
      <DataTable columns={columns} data={courses} />
      <Dialog
        open={!!courseToDelete}
        onOpenChange={(open) => {
          if (!open) setCourseToDelete(null)
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{" "}
              <strong className="font-semibold text-foreground">
                {courseToDelete?.course_title}
              </strong>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              disabled={isDeleting}
              onClick={() => setCourseToDelete(null)}
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
    </>
  )
}
