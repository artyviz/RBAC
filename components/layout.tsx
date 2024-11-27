import Link from 'next/link'
import { LogoutButton } from './logout-button'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { Role, hasPermission } from "@/lib/rbac"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  const userRole = session?.user?.role as Role

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link href="/dashboard" className="flex-shrink-0 flex items-center">
                University Portal
              </Link>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {hasPermission(userRole, Role.STUDENT) && (
                  <Link href="/dashboard/view-marks" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    View Marks
                  </Link>
                )}
                {hasPermission(userRole, Role.FACULTY) && (
                  <>
                    <Link href="/attendance" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Manage Attendance
                    </Link>
                    <Link href="/marks" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                      Manage Marks
                    </Link>
                  </>
                )}
                {hasPermission(userRole, Role.DEPARTMENT_HEAD) && (
                  <Link href="/department" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Department Overview
                  </Link>
                )}
                {hasPermission(userRole, Role.DIRECTOR) && (
                  <Link href="/admin" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Admin Panel
                  </Link>
                )}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <LogoutButton />
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">
              {children.type.name}
            </h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

