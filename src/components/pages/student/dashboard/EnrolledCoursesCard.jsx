import React from 'react'
import Heading from '../../../common/Heading'
import Paragraph from '../../../common/Paragraph'
import Button from '../../../common/Button'

const EnrolledCoursesCard = ({
  image,
  heading,
  description,
}) => {
  return (
    <div className="rounded-[20px] border border-black border-opacity-5 p-4 transition-all duration-300 hover:border-primary">
      <img
        className="min-h-[200px] w-full rounded-[20px] object-cover"
        src={image}
        alt="course image"
      />
      <Heading
        className="py-2.5 !text-xl !font-semibold !text-black xl:mb-0"
        middleText={heading}
      />
      <Paragraph
        className="mx-auto mb-3 line-clamp-3 max-w-[590px] !text-base font-normal text-black"
        text={description}
      />
    
    </div>
  )
}

export default EnrolledCoursesCard
