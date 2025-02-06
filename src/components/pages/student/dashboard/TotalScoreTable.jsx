import React, { useState } from 'react'
import Button from '../../../common/Button'
import { testData } from '../../../../utils/helper'

const itemsPerPage = 6

const TotalScoreTable = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(testData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentData = testData.slice(startIndex, startIndex + itemsPerPage)

  const grandTotal = testData.reduce(
    (acc, item) => ({
      questions: acc.questions + item.questions,
      correct: acc.correct + item.correct,
      score: acc.score + parseInt(item.score.split('/')[0]),
      maxScore: acc.maxScore + parseInt(item.score.split('/')[1]),
    }),
    { questions: 0, correct: 0, score: 0, maxScore: 0 }
  )

  const percentage = ((grandTotal.score / grandTotal.maxScore) * 100).toFixed(2)

  return (
    <div className="overflow-x-auto p-4">
      <table className="border-gray-200 shadow-md min-w-full overflow-hidden rounded-xl border bg-white">
        <thead className="bg-gray-100">
          <tr>
            {[
              'Sr. No',
              'Date',
              'Lesson',
              'Topic',
              'Questions',
              'Correct',
              'Score',
              '%',
              'My Review',
            ].map((header, index) => (
              <th
                key={index}
                className="text-nowrap border border-[#FFFFFF33] bg-[#253466] px-4 py-2 text-center text-sm font-semibold text-white"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#F7F7F7]">
          {currentData.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 text-nowrap border-t bg-[#F7F7F7] text-center"
            >
              <td className="border border-[#D7D7D7] px-4 py-2">
                {index < 9 && '0'}
                {index + 1}
              </td>
              <td className="border border-[#D7D7D7] px-4 py-2">{item.date}</td>
              <td className="border border-[#D7D7D7] px-4 py-2">
                {item.lesson}
              </td>
              <td className="border border-[#D7D7D7] px-4 py-2 text-left">
                {item.topic}
              </td>
              <td className="border border-[#D7D7D7] px-4 py-2">
                {item.questions}
              </td>
              <td className="border border-[#D7D7D7] px-4 py-2">
                {item.correct}
              </td>
              <td className="border border-[#D7D7D7] px-4 py-2">
                {item.score}
              </td>
              <td className="border border-[#D7D7D7] px-4 py-2">
                {item.percentage}%
              </td>
              <td className="text-blue-500 cursor-pointer border border-[#D7D7D7] px-4 py-2">
                View
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-100 font-semibold">
          <tr className="border-t text-center">
            <td className="px-4 py-2" colSpan="4">
              Grand Total
            </td>
            <td className="px-4 py-2">{grandTotal.questions}</td>
            <td className="px-4 py-2">{grandTotal.correct}</td>
            <td className="px-4 py-2">
              {grandTotal.score}/{grandTotal.maxScore}
            </td>
            <td className="px-4 py-2">{percentage}%</td>
            <td className="px-4 py-2"></td>
          </tr>
        </tfoot>
      </table>
      {itemsPerPage !== testData.length && (
        <div className="relative mt-4 flex items-center justify-center gap-4">
          <Button
            disabled={currentPage === 1}
            transparentBtn={'Prev Page'}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          />
          <Button
            disabled={currentPage === totalPages}
            transparentBtn={'Next Page'}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
          />

          <p className="text-sm text-[#000000CC]">
            Page{' '}
            <span className="mx-2 rounded-[10px] border border-[#00000033] px-5 py-2">
              {currentPage < 9 && '0'}
              {currentPage}
            </span>{' '}
            of {totalPages < 9 && '0'}
            {totalPages}
          </p>
        </div>
      )}
    </div>
  )
}

export default TotalScoreTable
