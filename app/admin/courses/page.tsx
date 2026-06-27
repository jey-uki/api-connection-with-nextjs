import CourseListView from "@/sections/course/view/course-list-view"
import { AuthenticatedRoute } from "@/components/auth-guard"

export default function AdminCoursesPage() {
  return (
    <AuthenticatedRoute allowedRoles={["admin", "lecturer"]}>
      <div className="space-y-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Course Directory
          </h1>
          <p className="text-sm text-muted-foreground">
            Browse, search, import, export, and manage all courses in the curriculum.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-4 shadow-xs sm:p-6">
          <CourseListView />
        </div>
      </div>
    </AuthenticatedRoute>
  )
}
