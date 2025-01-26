import React from 'react'
import Paragraph from './common/Paragraph'

const ChooseUsCard = ({ obj }) => {
  return (
    <article className="h-full rounded-5 border border-white/20 p-6">
      <span>{obj.icon}</span>
      <h6 className="mb-1.5 mt-2.5 text-xl font-semibold leading-150 text-white">
        {obj.title}
      </h6>
      <Paragraph className="!text-white opacity-80" text={obj.para} />
    </article>
  )
}

export default ChooseUsCard
