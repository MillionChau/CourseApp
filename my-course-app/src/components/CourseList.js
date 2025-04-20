import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Modal from "react-bootstrap/Modal"

const DeleteCourseModal = ({ showModal, handleClose, handleDelete }) => (
  <Modal show={showModal} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Are you sure?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>This course will be deleted from the list permanently!</p>
    </Modal.Body>
    <Modal.Footer>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
      <button className="btn btn-secondary" onClick={handleClose}>
        Cancel
      </button>
    </Modal.Footer>
  </Modal>
)

const CourseList = () => {
  const [courses, setCourses] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState(null)
  const navigate = useNavigate()
  const role = localStorage.getItem("role")

  const handleNavigateUpdate = (id) => navigate(`/courses/${id}/edit`)
  const handleNavigateDelete = (id) => {
    setCourseToDelete(id)
    setShowModal(true)
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/courses/${courseToDelete}`)
      setCourses(courses.filter((course) => course._id !== courseToDelete))
      toast.success("Course deleted successfully!")
    } catch (error) {
      console.error(error)
      toast.error("Error deleting course")
    } finally {
      setShowModal(false)
    }
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses")
        setCourses(response.data)
      } catch (error) {
        console.error(error)
        toast.error("Error fetching courses")
      }
    }
    fetchCourses()
  }, [])

  return (
    <div className="container">
      <h2>Course List</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Created At</th>
            {role === "admin" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={course._id}>
              <td className="courseItem">{index + 1}</td>
              <td className="courseItem">{course.name}</td>
              <td className="courseItem">{course.description}</td>
              <td className="courseItem">{new Date(course.createdAt).toLocaleDateString()}</td>
              {role === "admin" && (
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => handleNavigateUpdate(course._id)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleNavigateDelete(course._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {role === "admin" && (
        <button className="btn btn-primary" onClick={() => navigate("/add-course")}>
          Add Course
        </button>
      )}
      <DeleteCourseModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default CourseList
