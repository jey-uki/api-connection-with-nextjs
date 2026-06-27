"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Course } from "@/types/course"
import { DataTableColumnHeader } from "./data-table-column-header"

interface CreateColumnsOptions {
  onDelete: (course: Course) => void
}

export function createColumns({
  onDelete,
}: CreateColumnsOptions): ColumnDef<Course>[] {
  return [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="ID" />
      ),
      cell: ({ row }) => (
        <span className="font-medium text-muted-foreground">
          #{row.getValue("id")}
        </span>
      ),
    },
    {
      accessorKey: "course_title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => (
        <span className="font-semibold">{row.getValue("course_title")}</span>
      ),
    },
    {
      accessorKey: "course_fee",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Fee"
          className="justify-end"
        />
      ),
      cell: ({ row }) => {
        const fee = parseFloat(row.getValue("course_fee"))
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(fee)

        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "duration_months",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Duration"
          className="justify-end"
        />
      ),
      cell: ({ row }) => {
        const months = row.getValue("duration_months") as number
        return (
          <div className="text-right text-muted-foreground">
            {months} {months === 1 ? "month" : "months"}
          </div>
        )
      },
    },
    {
      accessorKey: "is_available",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      filterFn: (row, id, value) => {
        if (value === "available") return row.getValue(id) === true
        if (value === "unavailable") return row.getValue(id) === false
        return true
      },
      cell: ({ row }) => {
        const isAvailable = row.getValue("is_available") as boolean
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              isAvailable
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                : "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400"
            }`}
          >
            {isAvailable ? "Available" : "Unavailable"}
          </span>
        )
      },
    },
    {
      accessorKey: "description",
      header: "Description",
      enableSorting: false,
      cell: ({ row }) => {
        const description = row.getValue("description") as string | null
        if (!description) {
          return <span className="text-muted-foreground">—</span>
        }
        return (
          <span className="line-clamp-1 max-w-[240px] text-muted-foreground">
            {description}
          </span>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const course = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="size-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(String(course.id))}
              >
                Copy course ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                variant="destructive"
                onClick={() => onDelete(course)}
              >
                <Trash2 className="size-4" />
                Delete course
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
