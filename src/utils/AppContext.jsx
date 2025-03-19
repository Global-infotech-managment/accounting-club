import { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState({
    chapter: 0,
    lesson: 0,
  })

  return (
    <AppContext.Provider value={{ activeVideoIndex, setActiveVideoIndex }}>
      {children}
    </AppContext.Provider>
  )
}
