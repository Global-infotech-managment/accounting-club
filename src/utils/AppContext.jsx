import { createContext, useState, useMemo } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [courseData, setCourseData] = useState({
    courseId: null,
    lessonId: null,
    testId: '',
    name: '',
    chapter: '',
    description: '',
    fileId: null,
    price: 1,
    validity: 1,
    status: true,
    testCode: '',
    exerciseName: '',
    topic: '',
    totalQuestions: '',
    passingPercentage: '',
    timeAllowed: '',
    maxAttempts: '',
    resultDeclaration: '',
    otherInfo: '',
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

  const value = useMemo(
    () => ({
      courseData,
      updateCourseData,
      activeVideoIndex,
      setActiveVideoIndex,
    }),
    [courseData, activeVideoIndex]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
