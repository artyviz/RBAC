import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { Role, hasPermission } from "@/lib/rbac"
import Link from "next/link"
import { LogoutButton } from "@/components/logout-button"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)
  const userRole = session?.user?.role as Role

  if (!session) {
    return null // or redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <LogoutButton />
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-900">Welcome, {session.user.email}</h2>
            <p className="mt-2 text-gray-600">Your role: {userRole}</p>
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {hasPermission(userRole, Role.STUDENT) && (
                <Link href="/dashboard/view-marks" className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">View Marks</h3>
                    <p className="mt-1 text-sm text-gray-500">Check your academic performance</p>
                  </div>
                </Link>
              )}
              {hasPermission(userRole, Role.FACULTY) && (
                <>
                  <Link href="/attendance" className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900">Manage Attendance</h3>
                      <p className="mt-1 text-sm text-gray-500">Record and view student attendance</p>
                    </div>
                  </Link>
                  <Link href="/marks" className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <h3 className="text-lg font-medium text-gray-900">Manage Marks</h3>
                      <p className="mt-1 text-sm text-gray-500">Enter and update student marks</p>
                    </div>
                  </Link>
                </>
              )}
              {hasPermission(userRole, Role.DEPARTMENT_HEAD) && (
                <Link href="/department" className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">Department Overview</h3>
                    <p className="mt-1 text-sm text-gray-500">View department statistics and reports</p>
                  </div>
                </Link>
              )}
              {hasPermission(userRole, Role.DIRECTOR) && (
                <Link href="/admin" className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-lg font-medium text-gray-900">Admin Panel</h3>
                    <p className="mt-1 text-sm text-gray-500">Manage university-wide settings and reports</p>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

