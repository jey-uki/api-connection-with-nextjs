"use client"

import React from "react"
import Link from "next/link"
import { useAuth } from "@/providers/auth-provider"
import { AuthenticatedRoute } from "@/components/auth-guard"
import { Button } from "@/components/ui/button"
import { GraduationCap, BookOpen, User, LogOut, ArrowLeft } from "lucide-react"

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth()

  return (
    <AuthenticatedRoute allowedRoles={["student"]}>
      <div className="min-h-screen bg-linear-to-b from-background to-zinc-50/30 dark:to-zinc-950/10 flex flex-col">
        {/* Student Top Header */}
        <header className="sticky top-0 z-40 w-full border-b border-border bg-card/85 backdrop-blur-md">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500 text-white">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <span className="font-bold text-lg tracking-tight hidden sm:inline-block">
                  Student Portal
                </span>
              </Link>

              <nav className="flex items-center gap-4 sm:gap-6">
                <Link
                  href="/students/dashboard"
                  className="text-sm font-medium hover:text-primary transition-colors text-foreground"
                >
                  Dashboard
                </Link>
                <Link
                  href="/students/courses"
                  className="text-sm font-medium hover:text-primary transition-colors text-muted-foreground hover:text-foreground"
                >
                  Courses
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted text-xs text-muted-foreground border border-border/60">
                <User className="h-3.5 w-3.5" />
                <span>{user?.email}</span>
              </div>
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Public Site
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="gap-1.5 text-xs border-destructive/20 text-destructive hover:bg-destructive/10"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </Button>
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 container mx-auto px-4 sm:px-6 py-8">
          {children}
        </main>
      </div>
    </AuthenticatedRoute>
  )
}
