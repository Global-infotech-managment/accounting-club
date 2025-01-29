import React from 'react'
import Button from '../common/Button'

const NotFound = () => {
  return (
    <>
      <p className="mt-40 text-center text-4xl font-bold text-orange-red">
        404 Page Not Found
      </p>
      <div className="flex items-center justify-center mt-10">
        <Button path={'/'} transparentBtn="Back to Home Page" />
      </div>
    </>
  )
}

export default NotFound
