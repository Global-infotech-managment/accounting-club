import { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [courseData, setCourseData] = useState({
    courseId: null,
    name: '',
    description: '',
    fileId: null,
    price: 1,
    validity: 1,
    status: true,
  })

  const [activeVideoIndex, setActiveVideoIndex] = useState({
    chapter: 0,
    lesson: 0,
  })

  const updateCourseData = (newData) => {
    console.log('Previous courseData:', courseData) // Log before updating
    console.log('New data received:', newData) // Log what is being updated

    setCourseData((prevData) => {
      const updatedData = { ...prevData, ...newData }
      console.log('Updated courseData:', updatedData) // Log after update
      return updatedData
    })
  }

  return (
    <AppContext.Provider
      value={{
        courseData,
        updateCourseData,
        activeVideoIndex,
        setActiveVideoIndex,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
