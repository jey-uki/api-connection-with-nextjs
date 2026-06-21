"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { format } from "date-fns"

import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const formSchema = z.object({
  fullName: z
    .string("Full name is required.")
    .min(2, "Full name must be at least 2 characters."),
  email: z
    .string("Email is required.")
    .email("Please enter a valid email address."),
  age: z.string(),
  joinDate: z.date(),
})

export default function StudentNewEditForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      age: undefined,
      joinDate: undefined,
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const payload = {
      full_name: data.fullName,
      email: data.email,
      age: data.age ? parseInt(data.age) : undefined,
      joined_date: format(data.joinDate, "yyyy-MM-dd"),
    }

    // console.log("Prepared payload for submission:", payload)

    try {
      await axios.post(
        "https://jey-student-api.up.railway.app/api/students",
        payload
      )
      // console.log("Submitting student data:", payload)
      toast.success("Student information submitted successfully!")
      form.reset()
    } catch (errors) {
      console.error("Error submitting student data:", errors)
      toast.error("Failed to submit student information.")
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Student Information</CardTitle>
        <CardDescription>Please fill in the details below.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-student" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="fullName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-full-name">
                    Full Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-full-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter full name"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* email */}
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter email"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* age */}
            <Controller
              name="age"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Age</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="number"
                    value={field.value ?? ""}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter age"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* join date */}
            <Controller
              name="joinDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field className="mx-auto">
                  <FieldLabel htmlFor="date-picker-simple">
                    Join Date
                  </FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date-picker-simple"
                        className="justify-start font-normal"
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        defaultMonth={field.value}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-student">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
