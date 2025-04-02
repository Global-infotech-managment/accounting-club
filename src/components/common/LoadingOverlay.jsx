'use client'
import React from 'react'

const LoadingOverlay = ({ isVisible, text = 'Loading...' }) => {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="flex flex-col items-center">
        <div className="border-t-transparent h-12 w-12 animate-spin rounded-full border-4 border-solid border-orange-red"></div>
        <p className="text-lg mt-4 text-white">{text}</p>
      </div>
    </div>
  )
}

export default LoadingOverlay
