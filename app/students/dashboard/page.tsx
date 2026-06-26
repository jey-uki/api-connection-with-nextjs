"use client"

import { useAuth } from "@/providers/auth-provider"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function StudentDashboard() {
  const { user } = useAuth()

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="flex flex-col justify-between gap-6 rounded-2xl border border-primary/20 bg-linear-to-r from-primary/10 via-violet-500/5 to-transparent p-6 sm:p-8 md:flex-row md:items-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Welcome back, student!
          </h1>
          <p className="max-w-xl text-sm text-muted-foreground">
            You are logged in as{" "}
            <span className="font-semibold text-foreground">{user?.email}</span>
            . Here is your academic progress update and class schedule for this
            week.
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/students/courses">
            <Button className="gap-1.5 font-semibold shadow-sm">
              Browse Courses
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
