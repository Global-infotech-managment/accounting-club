import React, { useState } from 'react'
import Heading from '../../../common/Heading'
import Paragraph from '../../../common/Paragraph'
import Button from '../../../common/Button'
import IncomeTaxQuestion from './IncomeTaxQuestion'
import TotalScoreTable from './TotalScoreTable'

const StudentTestAgree = ({ showTotalScore, setShowTotalScore }) => {
  const [isChecked, setIsChecked] = useState(false)
  const [error, setError] = useState('')
  const [showQuestion, setShowQuestion] = useState(false)
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked)
    if (e.target.checked) {
      setError('')
    }
  }

  const handleButtonClick = () => {
    if (!isChecked) {
      setError('You must agree to the declaration before proceeding.')
    } else {
      setShowQuestion(true)
    }
  }
  const questions = [
    {
      question: 'What is income tax?',
      options: ['IT', 'GST', 'TDS', 'None'],
    },
  ]
  return (
    <div className="flex flex-wrap">
      <div
        className={`mt-6 rounded-lg sm:w-6/12 md:w-8/12 w-full ${showQuestion === false && "!w-full"} ${showTotalScore === false && 'border border-[#0000001A]'} ${showTotalScore === true&&"!w-full"}`}
      >
        {showTotalScore === false ? (
          <>
            {' '}
            <div className="bg-[#00000008] py-3">
              <Heading
                firstText="Class Test"
                className="!text-lg mx-auto text-center"
              />
            </div>
            <div
              className={`flex min-h-[400px] flex-col justify-between p-4 md:min-h-[517px]`}
            >
              <div
                className={`flex items-center justify-between ${showQuestion === true && 'border-b border-[#0000001A] pb-4'}`}
              >
                {showQuestion ? (
                  <>
                    <Paragraph
                      text={
                        <>
                          <span className="font-semibold">Question :</span> 1
                        </>
                      }
                    />{' '}
                  </>
                ) : (
                  <>
                    {' '}
                    <Paragraph
                      text={
                        <>
                          <span className="font-semibold">Durations :</span>{' '}
                          00:05:00
                        </>
                      }
                    />
                  </>
                )}
                {showQuestion ? (
                  <>
                    <Paragraph
                      text={
                        <>
                          <span className="font-semibold">Marks :</span> 1
                        </>
                      }
                    />{' '}
                  </>
                ) : (
                  <>
                    <Paragraph
                      text={
                        <>
                          <span className="font-semibold">
                            Total Questions :{' '}
                          </span>
                          5
                        </>
                      }
                    />
                  </>
                )}
              </div>
              {showQuestion === false ? (
                <div>
                  <Paragraph
                    text={
                      <>
                        <span className="font-semibold">Declaration: </span>
                      </>
                    }
                  />
                  <div className="relative mb-[18px] mt-[6px] flex items-start gap-[10px]">
                    <input
                      type="checkbox"
                      className="mt-[4px]"
                      onChange={handleCheckboxChange}
                      checked={isChecked}
                    />
                    <Paragraph
                      text={
                        "I have read all the instructions carefully and have understood them. I agree not to cheat or use unfair means in this examination. I understand that using unfair means of any sort for my own or someone else's advantage will lead to my immediate disqualification. The decision of administrator will be final in these matters and cannot be appealed."
                      }
                    />{' '}
                    {error && (
                      <p className="text-sm absolute bottom-[-25px] mb-2 text-orange-red">
                        {error}
                      </p>
                    )}
                  </div>

                  <Button
                    className={'!text-sm rounded-[10px] !py-2 px-5'}
                    bgBtn={'I am ready to begin'}
                    onClick={handleButtonClick}
                  />
                </div>
              ) : (
                <IncomeTaxQuestion questions={questions} />
              )}
              {showQuestion === true && (
                <div className="overflow-auto">
                  <div className="mt-5 flex flex-wrap items-center justify-start gap-4 md:mt-0 md:min-w-[600px] md:flex-nowrap">
                    {/* <Button
                    transparentBtn={'Mark for Review & Next'}
                    className={'rounded-[10px] text-[12px] md:text-[16px]'}
                  /> */}
                    <Button
                      transparentBtn={'Clear Response'}
                      className={'rounded-[10px] text-[12px] md:text-[16px]'}
                    />
                    <Button
                      onClick={() => setShowTotalScore(true)}
                      bgBtn={'Save & Next'}
                      className={'rounded-[10px] text-[12px] md:text-[16px]'}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <TotalScoreTable />
          </>
        )}
      </div>
      {showQuestion === true  && (
        <div className={`rounded-lg md:ps-4 sm:w-6/12 md:w-4/12`}>
        <div
          className={`mt-6 rounded-lg ${showTotalScore === false && 'border border-[#0000001A]'}`}
        >
          {showTotalScore === false && (
            <>
              {' '}
              <div className="bg-[#00000008] py-3">
                <Heading
                  firstText="Time Left"
                  className="!text-lg mx-auto text-center"
                />
              </div>
              <div
                className={`flex min-h-[400px] flex-col justify-between p-4 md:min-h-[517px]`}
              >
                <div>
                  <div
                    className={`flex items-center justify-between ${showQuestion === true && 'border-b border-[#0000001A] pb-4'}`}
                  >
                    {showQuestion ? (
                      <>
                        <Paragraph
                          text={
                            <>
                              <span className="font-semibold">
                                Time Left for A Part
                              </span>{' '}
                            </>
                          }
                        />{' '}
                      </>
                    ) : (
                      <>
                        {' '}
                        <Paragraph
                          text={
                            <>
                              <span className="font-semibold">Durations :</span>{' '}
                              00:05:00
                            </>
                          }
                        />
                      </>
                    )}
                    {showQuestion ? (
                      <>
                        <Paragraph
                          text={
                            <>
                              <span className="font-semibold">00:09:40</span>
                            </>
                          }
                        />{' '}
                      </>
                    ) : (
                      <>
                        <Paragraph
                          text={
                            <>
                              <span className="font-semibold">
                                Total Questions :{' '}
                              </span>
                              5
                            </>
                          }
                        />
                      </>
                    )}
                  </div>
                  <div className="flex flex-wrap border-b border-[#0000001A] py-4">
                    <div className="flex w-6/12 items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-[#388936]"></span>
                      <Paragraph text="Answered" />
                    </div>
                    <div className="flex w-6/12 items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-[#DF7E0D]"></span>
                      <Paragraph text="Not Answered" />
                    </div>
                    <div className="mt-2 flex w-6/12 items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-[#2C7CC1]"></span>
                      <Paragraph text="Marked for Review" />
                    </div>
                    <div className="mt-2 flex w-6/12 items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-[#494949]"></span>
                      <Paragraph text="Not Visited" />
                    </div>
                    <div className="mt-2 flex w-full items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-[#9B59B6]"></span>
                      <Paragraph text="Answered & Marked for Review" />
                    </div>
                  </div>
                  <div className="mt-4 flex gap-4">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#388936] text-white">
                      1
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#9B59B6] text-white">
                      2
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#388936] text-white">
                      3
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#494949] text-white">
                      4
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => setShowTotalScore(true)}
                  bgBtn={'Submit Exercise'}
                  className={'w-full rounded-[10px] text-[12px] md:text-[16px]'}
                />
              </div>
            </>
          ) }
        </div>
      </div>
      )}
      
    </div>
  )
}

export default StudentTestAgree
