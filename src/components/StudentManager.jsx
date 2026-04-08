import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './StudentManager.css'
function StudentManager() {
  const [students, setStudents] = useState([])
  const [student, setStudent] = useState({
    name: '',
    email: '',
    course: ''
  })
  const [editId, setEditId] = useState(null)
  useEffect(() => {
    fetchStudents()
  }, [])
  const fetchStudents = async () => {
    const response = await axios.get('http://localhost:8080/students')
    setStudents(response.data)
  }
  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async () => {
    if (editId) {
      await axios.put(
        `http://localhost:8080/students/${editId}`,
        student
      )
      setEditId(null)
    } else {
      await axios.post(
        'http://localhost:8080/students',
        student
      )
    }
    setStudent({
      name: '',
      email: '',
      course: ''
    })

    fetchStudents()
  }
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/students/${id}`)
    fetchStudents()
  }
  const handleEdit = (stu) => {
    setStudent({
      name: stu.name,
      email: stu.email,
      course: stu.course
    })
    setEditId(stu.id)
  }
  return (
    <div className="container">
      <h2>Student CRUD Application</h2>

      <div className="form-box">
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={student.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={student.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="course"
          placeholder="Enter Course"
          value={student.course}
          onChange={handleChange}
        />
        <button onClick={handleSubmit}>
          {editId ? 'Update Student' : 'Add Student'}
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu) => (
            <tr key={stu.id}>
              <td>{stu.id}</td>
              <td>{stu.name}</td>
              <td>{stu.email}</td>
              <td>{stu.course}</td>
              <td>
                <button onClick={() => handleEdit(stu)}>
                  Update
                </button>
                <button onClick={() => handleDelete(stu.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default StudentManager