import React, { useState } from 'react'
import Heading from '../../../common/Heading'
import Paragraph from '../../../common/Paragraph'
import Button from '../../../common/Button'
import IncomeTaxQuestion from './IncomeTaxQuestion'

const StudentTestAgree = () => {
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
    <div className="mt-6 rounded-lg border border-[#0000001A]">
      <div className="bg-[#00000008] py-3">
        <Heading
          firstText="Class Test"
          className="mx-auto text-center !text-lg"
        />
      </div>
      <div className={`flex min-h-[517px] flex-col justify-between p-4`}>
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
                    <span className="font-semibold">Durations :</span> 00:05:00
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
                    <span className="font-semibold">Total Questions : </span>5
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
                <p className="absolute bottom-[-25px] mb-2 text-sm text-orange-red">
                  {error}
                </p>
              )}
            </div>

            <Button
              className={'rounded-[10px] !py-2 px-5 !text-sm'}
              bgBtn={'I am ready to begin'}
              onClick={handleButtonClick}
            />
          </div>
        ) : (
          <IncomeTaxQuestion questions={questions} />
        )}
        {showQuestion === true && (
          <div className="flex items-center justify-start gap-4">
            <Button
              transparentBtn={'Mark for Review & Next'}
              className={'rounded-[10px]'}
            />
            <Button
              transparentBtn={'Clear Response'}
              className={'rounded-[10px]'}
            />
            <Button bgBtn={'Save & Next'} className={'rounded-[10px]'} />
          </div>
        )}
      </div>
    </div>
  )
}

export default StudentTestAgree
