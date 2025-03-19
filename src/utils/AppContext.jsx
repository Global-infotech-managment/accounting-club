import { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [courseData, setCourseData] = useState({
    courseName: '',
    sectionName: '', // New field
    sectionDescription: '', // New field
    validity: '', // New field
    isMandatory: 'Yes', // New field
    status: 'Active', // New field
    description: '',
    price: '',
    selectedFile: null,
    dragActive: false,
  })

  const [activeVideoIndex, setActiveVideoIndex] = useState({
    chapter: 0,
    lesson: 0,
  })

  const updateCourseData = (newData) => {
    setCourseData((prevData) => ({ ...prevData, ...newData }))
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
