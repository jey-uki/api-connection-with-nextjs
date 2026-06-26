import StudentProfileView from "@/sections/student/view/student-profile-view"
import React from "react"
import { AuthenticatedRoute } from "@/components/auth-guard"

export default function AdminStudentProfilePage() {
  return (
    <AuthenticatedRoute allowedRoles={["admin", "lecturer"]}>
      <StudentProfileView />
    </AuthenticatedRoute>
  )
}
