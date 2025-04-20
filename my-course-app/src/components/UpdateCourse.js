import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

const EditCourse = () => {
  const { courseId } = useParams()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [videoId, setVideoId] = useState('')
  const [level, setLevel] = useState('')
  const [energy, setEnergy] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [serverMessage, setServerMessage] = useState('') // Thêm state
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/courses/${courseId}/edit`)
        const course = response.data

        setName(course.name)
        setDescription(course.description)
        setVideoId(course.videoId)
        setLevel(course.level)
        setEnergy(course.energy)
        setLoading(false)
      } catch (err) {
        setError('Failed to load course details')
        setLoading(false)
      }
    }

    fetchCourse()
  }, [courseId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`http://localhost:5000/api/courses/${courseId}`, {
        name,
        description,
        videoId,
        image: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        level,
        energy,
      })

      // Lưu thông báo từ server
      setServerMessage(response.data.message || 'Course updated successfully')
      
      // Điều hướng sau khi cập nhật
      navigate('/')
    } catch (error) {
      console.error(error)
      setServerMessage('Failed to update course. Please try again.')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div className="mt-4">
      <h3>Edit Course</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Course Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Course Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="video" className="form-label">
            Video ID
          </label>
          <input
            type="text"
            className="form-control"
            id="video"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="level" className="form-label">
            Level
          </label>
          <input
            type="text"
            className="form-control"
            id="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="energy" className="form-label">
            Place
          </label>
          <input
            type="text"
            className="form-control"
            id="energy"
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
            required
          />
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Update Course
        </button>
        {serverMessage && <div className="alert alert-info mt-3">{serverMessage}</div>}
      </form>
    </div>
  )
}

export default EditCourse
