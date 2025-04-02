import { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [courseData, setCourseData] = useState({
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
