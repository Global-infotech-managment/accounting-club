import React from 'react'
import { useParams } from 'react-router-dom'
import Heading from '../../../common/Heading'
import Button from '../../../common/Button'
import Paragraph from '../../../common/Paragraph'

const StudentCourseDetailVideo = () => {
  const totalCourses = 5
  const completedCourses = 3
  const { slug } = useParams()
  const completionPercentage = (completedCourses / totalCourses) * 100
  return (
    <>
      <div className="my-4 w-full overflow-hidden rounded-xl border border-primary">
        <iframe
          className="h-full min-h-[551px] w-full"
          src="https://www.youtube.com/embed/nxL5tPgqft4?si=IpCMIvzZwoJDz-SI&rel=0"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="overflow-auto">
        <div className="flex min-w-[970px] items-center justify-between">
          <Paragraph
            className={'text-sm'}
            text={
              <>
                <span className="font-semibold">Description of class :</span>
                This lesson is updated in Feb. 2024
              </>
            }
          />
          <div className="h-[21px] w-[1px] bg-black opacity-60"></div>
          <Paragraph
            className={'text-sm'}
            text={
              <>
                <span className="font-semibold">Discussions</span>
                (0)
              </>
            }
          />
          <div className="h-[21px] w-[1px] bg-black opacity-60"></div>
          <Paragraph
            className={'text-sm'}
            text={
              <>
                <span className="font-semibold">Test Score = </span>
                4/5 (80%)
              </>
            }
          />
          <div className="h-[21px] w-[1px] bg-black opacity-60"></div>
          <div className="flex items-center justify-between">
            <div className="h-[6px] w-full min-w-[100px] overflow-hidden rounded-[20px] bg-[#00000008]">
              <div
                className="h-full rounded-[20px] bg-primary transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
            <Paragraph
              className="ms-[10px] text-nowrap"
              text={`${completionPercentage}% Complete`}
            />
          </div>{' '}
        </div>
      </div>
      <Button
        className={
          'mt-4 max-h-10 rounded-[10px] !py-2 px-5 !text-sm !leading-normal'
        }
        bgBtn={'Create New Post'}
      />
    </>
  )
}

export default StudentCourseDetailVideo
