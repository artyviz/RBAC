import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { Role, hasPermission } from "@/lib/rbac"
import prisma from '@/lib/prisma'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || !hasPermission(session.user.role as Role, Role.DEPARTMENT_HEAD)) {
    return new NextResponse(
      JSON.stringify({ error: 'Not authorized' }),
      { status: 403 }
    )
  }

  try {
    const departmentId = 1 // In a real app, you'd get this from the session or request

    const faculty = await prisma.faculty.findMany({
      where: { departmentId },
      select: {
        id: true,
        name: true,
        subject: true,
        yearsOfService: true
      }
    })

    return NextResponse.json(faculty)
  } catch (error) {
    console.error('Error fetching faculty list:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    )
  }
}

