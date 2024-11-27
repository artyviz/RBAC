import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Create a department
  const department = await prisma.department.create({
    data: {
      name: 'Computer Science',
    },
  })

  // Create faculty members
  const facultyData = [
    { name: 'Dr. A', subject: 'Algorithms', yearsOfService: 10 },
    { name: 'Prof. B', subject: 'Database Systems', yearsOfService: 15 },
    { name: 'Dr. C', subject: 'Machine Learning', yearsOfService: 8 },
    { name: 'Prof. D', subject: 'Computer Networks', yearsOfService: 12 },
  ]

  for (const faculty of facultyData) {
    await prisma.faculty.create({
      data: {
        ...faculty,
        departmentId: department.id,
      },
    })
  }

  const studentData = [
    'STUDENT A',
    'STUDENT B',
    'STUDENT C',
    'STUDENT D',
    'STUDENT E',
  ]

  for (const studentName of studentData) {
    const student = await prisma.student.create({
      data: {
        name: studentName,
        departmentId: department.id,
      },
    })
    for (let i = 0; i < 30; i++) {
      await prisma.attendance.create({
        data: {
          date: new Date(Date.now() - i * 24 * 60 * 60 * 1000),
          present: Math.random() > 0.2,
          studentId: student.id,
        },
      })
    }


    const subjects = ['Algorithms', 'Database Systems', 'Machine Learning', 'Computer Networks']
    for (const subject of subjects) {
      await prisma.grade.create({
        data: {
          subject,
          score: Math.floor(Math.random() * 41) + 60, 
          studentId: student.id,
        },
      })
    }
  }

  console.log('Database has been seeded.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

