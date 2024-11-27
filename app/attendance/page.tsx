import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Role, hasPermission } from "@/lib/rbac"
import { AttendanceForm } from "@/components/attendance-form"

// This would typically come from a database
const mockStudents = [
  { id: 1, name: "STUDENT A", attendance: 85 },
  { id: 2, name: "STUDENT B", attendance: 92 },
  { id: 3, name: "STUDENT C", attendance: 78 },
  { id: 4, name: "STUDENT D", attendance: 88 },
]

export default async function ManageAttendance() {
  const session = await getServerSession(authOptions)
  
  if (!session || !hasPermission(session.user.role as Role, Role.FACULTY)) {
    redirect('/dashboard')
  }

  const handleAttendanceSubmit = async (updatedStudents: typeof mockStudents) => {
    'use server'
    // Here you would typically update the database with the new attendance data
    console.log('Updating attendance:', updatedStudents)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Attendance</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <AttendanceForm students={mockStudents} onSubmit={handleAttendanceSubmit} />
          </div>
        </div>
      </main>
    </div>
  )
}

