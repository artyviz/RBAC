'use client'

import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

export default function FacultyList() {
  const [faculty, setFaculty] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await fetch('/api/department/faculty')
        if (!response.ok) {
          throw new Error('Failed to fetch faculty list')
        }
        const data = await response.json()
        setFaculty(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFaculty()
  }, [])

  const handleContact = (id) => { //might use with api maybe
    console.log(`Contacting faculty member with id ${id}`)
  }

  if (loading) {
    return <div>Loading faculty list...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Faculty Members</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Subject</TableHead>
            <TableHead>Years of Service</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {faculty.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.subject}</TableCell>
              <TableCell>{member.yearsOfService}</TableCell>
              <TableCell>
                <Button onClick={() => handleContact(member.id)}>Contact</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

