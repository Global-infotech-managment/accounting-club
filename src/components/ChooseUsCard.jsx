import React from 'react'
import Paragraph from './common/Paragraph'

const ChooseUsCard = ({ obj }) => {
  return (
    <article className="h-full bg-primary max-sm:min-h-[192px] rounded-5 border border-white/20 p-4 lg:p-6">
      <span>{obj.icon}</span>
      <h6 className="mb-1.5 mt-2.5 text-xl font-semibold leading-150 text-white">
        {obj.title}
      </h6>
      <Paragraph
        className="text-sm !text-white opacity-80 xl:text-base"
        text={obj.para}
      />
    </article>
  )
}

export default ChooseUsCard
