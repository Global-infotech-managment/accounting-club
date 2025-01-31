import { useParams } from 'react-router-dom'

const EnrolledCourseDetail = () => {
  const { slug } = useParams()

  return (
    <div>
      <h1>Enrolled Course Detail</h1>
      <p>
        Showing details for course: <strong>{slug}</strong>
      </p>
    </div>
  )
}

export default EnrolledCourseDetail
