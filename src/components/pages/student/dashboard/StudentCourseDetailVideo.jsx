import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../../../utils/AppContext'
import { accordionData } from '../../../../utils/helper'
import Paragraph from '../../../common/Paragraph'
import ReactPlayer from 'react-player'

const StudentCourseDetailVideo = () => {
  const { activeVideoIndex } = useContext(AppContext)
  const { slug } = useParams()

  const activeChapter = accordionData[activeVideoIndex.chapter]
  const activeLesson = activeChapter?.lessons[activeVideoIndex.lesson]
  const videoUrl = activeLesson?.videoUrl || null

  return (
    <>
      <div className="my-4 w-full overflow-hidden rounded-xl border border-primary">
        <ReactPlayer
          url={videoUrl}
          className="h-full min-h-[400px] !w-full md:min-h-[551px]"
        />
      </div>
      <div className="overflow-auto">
        <div className="flex items-center justify-between">
          <Paragraph
            className={'text-sm'}
            text={
              <>
                <span className="font-semibold">Description of class :</span>
                {activeLesson?.description ||
                  'Description of class not available'}
              </>
            }
          />
        </div>
      </div>
    </>
  )
}

export default StudentCourseDetailVideo
