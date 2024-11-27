import { getServerSession } from "next-auth/next"
import { authOptions } from "../../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { Role, hasPermission } from "@/lib/rbac"
import { Suspense } from "react"

const mockMarks = [
  { subject: "DAA", mark: 85 },
  { subject: "DSP", mark: 92 },
  { subject: "ML", mark: 78 },
  { subject: "Python", mark: 88 },
]

async function fetchMarks() {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return mockMarks
}

function MarksList({ marks }: { marks: typeof mockMarks }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subject
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mark
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {marks.map((mark, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {mark.subject}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {mark.mark}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function MarksLoader() {
  return <div className="text-center py-4">Loading marks...</div>
}

export default async function ViewMarks() {
  const session = await getServerSession(authOptions)
  
  if (!session || !hasPermission(session.user.role as Role, Role.STUDENT)) {
    redirect('/dashboard')
  }

  const marks = await fetchMarks()

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Marks</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Suspense fallback={<MarksLoader />}>
              <MarksList marks={marks} />
            </Suspense>
          </div>
        </div>
      </main>
    </div>
  )
}

