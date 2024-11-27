import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Role, hasPermission } from "@/lib/rbac"
import DepartmentStats from "./department-stats"
import FacultyList from "./faculty-list"

export default async function DepartmentOverview() {
  const session = await getServerSession(authOptions)
  
  if (!session || !hasPermission(session.user.role as Role, Role.DEPARTMENT_HEAD)) {
    redirect('/dashboard')
  }

  return (
    <div className="space-y-6">
      <DepartmentStats />
      <FacultyList />
    </div>
  )
}

