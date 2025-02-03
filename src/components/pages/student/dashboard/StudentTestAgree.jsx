import React from 'react'
import Heading from '../../../common/Heading'
import Paragraph from '../../../common/Paragraph'
import Button from '../../../common/Button'

const StudentTestAgree = () => {
  return (
    <>
      <div className="mt-6 rounded-lg border border-[#0000001A]">
        <div className="bg-[#00000008] py-3">
          <Heading
            firstText="Class Test"
            className="mx-auto text-center !text-lg"
          />
        </div>
        <div className="flex min-h-[517px] flex-col justify-between p-4">
          <div className="flex items-center justify-between">
            <Paragraph
              text={
                <>
                  <span className="font-semibold">Durations :</span> 00:05:00
                </>
              }
            />
            <Paragraph
              text={
                <>
                  <span className="font-semibold">Total Questions : </span>5
                </>
              }
            />
          </div>
          <div>
            <Paragraph
              text={
                <>
                  <span className="font-semibold">Declaration: </span>
                </>
              }
            />
            <div className="mb-[18px] mt-[6px] flex items-start gap-[10px]">
              <input type="checkbox" className="mt-[10px]" />
              <Paragraph
                text={
                  "I have read all the instructions carefully and have understood them. I agree not to cheat or use unfair means in this examination. I understand that using unfair means of any sort for my own or someone else's advantage will lead to my immediate disqualification. The decision of administrator will be final in these matters and cannot be appealed."
                }
              />
            </div>
            <Button
              className={'rounded-[10px] !py-2 px-5 !text-sm'}
              bgBtn={'I am ready to begin'}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default StudentTestAgree
