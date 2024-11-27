'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

type Student = {
  id: number
  name: string
  attendance: number
}

type AttendanceFormProps = {
  students: Student[]
  onSubmit: (updatedStudents: Student[]) => void
}

export function AttendanceForm({ students, onSubmit }: AttendanceFormProps) {
  const [attendanceData, setAttendanceData] = useState<Student[]>(students)

  const handleAttendanceChange = (studentId: number, isPresent: boolean) => {
    setAttendanceData(prevData =>
      prevData.map(student =>
        student.id === studentId
          ? { ...student, attendance: isPresent ? student.attendance + 1 : student.attendance }
          : student
      )
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(attendanceData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {attendanceData.map(student => (
        <div key={student.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
          <span>{student.name}</span>
          <div>
            <Button
              type="button"
              variant={student.attendance > attendanceData.find(s => s.id === student.id)!.attendance ? "default" : "outline"}
              onClick={() => handleAttendanceChange(student.id, true)}
              className="mr-2"
            >
              Present
            </Button>
            <Button
              type="button"
              variant={student.attendance === attendanceData.find(s => s.id === student.id)!.attendance ? "default" : "outline"}
              onClick={() => handleAttendanceChange(student.id, false)}
            >
              Absent
            </Button>
          </div>
        </div>
      ))}
      <Button type="submit" className="w-full">Submit Attendance</Button>
    </form>
  )
}

