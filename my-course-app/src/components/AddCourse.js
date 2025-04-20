import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const AddCourse = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [videoId, setVideoId] = useState('')
  const [level, setLevel] = useState('')
  const [energy, setEnergy] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/courses/', {
        name,
        description,
        videoId,
        image: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
        level,
        energy,
      })
      navigate('/')
    } catch (error) {
      console.error(error)
      alert(error)
    }
  }

  return (
    <div className="mt-4">
      <h3>Add Course</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Course Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Course Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="video" className="form-label">Video ID</label>
          <input
            type="text"
            className="form-control"
            id="video"
            name="video"
            value={videoId}
            onChange={e => setVideoId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="level" className="form-label">Level</label>
          <input
            type="text"
            className="form-control"
            id="level"
            name="level"
            value={level}
            onChange={e => setLevel(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="energy" className="form-label">Place</label>
          <input
            type="text"
            className="form-control"
            id="energy"
            name="energy"
            value={energy}
            onChange={e => setEnergy(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Add Course
        </button>
      </form>
    </div>
  )
}

export default AddCourse
