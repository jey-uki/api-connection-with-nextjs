import StudentCreateView from "@/sections/student/view/student-create-view"
import React from "react"
import { AuthenticatedRoute } from "@/components/auth-guard"

export default function AdminStudentCreatePage() {
  return (
    <AuthenticatedRoute allowedRoles={["admin"]}>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Create Student</h1>
          <p className="text-muted-foreground text-sm">
            Add a new student profile into the system database.
          </p>
        </div>
        <StudentCreateView />
      </div>
    </AuthenticatedRoute>
  )
}
