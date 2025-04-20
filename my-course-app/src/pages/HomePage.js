import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import styles from "./HomePage.module.scss"

const CourseList = () => {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/courses')
        setCourses(response.data)
      } catch (error) {
        console.error(error)
        alert('Error fetching courses')
      }
    }
    fetchCourses()
  }, [])

  return (
    <div className={styles.container}>
      <h2>Course List</h2>
      <div className={styles.courseGrid}>
        {courses.map((course) => (
          <div key={course._id} className={styles.courseItem}>
            <Card name={course.name} description={course.description} image={course.image} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CourseList
