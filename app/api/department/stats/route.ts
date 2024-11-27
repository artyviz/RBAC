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

    const totalStudents = await prisma.student.count({
      where: { departmentId }
    })

    const totalFaculty = await prisma.faculty.count({
      where: { departmentId }
    })

    const attendanceStats = await prisma.attendance.aggregate({
      where: {
        student: { departmentId }
      },
      _avg: {
        present: true
      }
    })

    const gradeStats = await prisma.grade.aggregate({
      where: {
        student: { departmentId }
      },
      _avg: {
        score: true
      }
    })

    const averageAttendance = Math.round((attendanceStats._avg.present || 0) * 100)
    const averageGrade = gradeStats._avg.score ? gradeStats._avg.score.toFixed(2) : 'N/A'

    return NextResponse.json({
      totalStudents,
      totalFaculty,
      averageAttendance,
      averageGrade
    })
  } catch (error) {
    console.error('Error fetching department stats:', error)
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500 }
    )
  }
}

