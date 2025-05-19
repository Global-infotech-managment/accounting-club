import { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [courseData, setCourseData] = useState({
    courseId: null,
    name: '',
    chapter: '',
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
    console.log('Previous courseData:', courseData) 
    console.log('New data received:', newData) 

    setCourseData((prevData) => {
      const updatedData = { ...prevData, ...newData }
      console.log('Updated courseData:', updatedData) 
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
