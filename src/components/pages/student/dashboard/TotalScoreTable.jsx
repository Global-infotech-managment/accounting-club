import React from 'react'

const data = [
  {
    srNo: '01',
    date: '01/01/22',
    lesson: '1/1',
    topic: 'Introduction of Business',
    questions: 5,
    correct: 4,
    score: '15/20',
    percentage: 75,
  },
  {
    srNo: '02',
    date: '02/01/22',
    lesson: '1/2',
    topic: 'Role of Work Structure',
    questions: 5,
    correct: 5,
    score: '20/20',
    percentage: 100,
  },
  {
    srNo: '03',
    date: '03/01/22',
    lesson: '1/3',
    topic: 'Project Solutions',
    questions: 5,
    correct: 4,
    score: '15/20',
    percentage: 100,
  },
  {
    srNo: '04',
    date: '04/01/22',
    lesson: '1/4',
    topic: 'Shortcuts key in Tally',
    questions: 5,
    correct: 5,
    score: '20/20',
    percentage: 100,
  },
  {
    srNo: '05',
    date: '05/01/22',
    lesson: '1/5',
    topic: 'Introduction of Business',
    questions: 5,
    correct: 4,
    score: '15/20',
    percentage: 100,
  },
  {
    srNo: '06',
    date: '06/01/22',
    lesson: '1/6',
    topic: 'Primary Books of Entry',
    questions: 5,
    correct: 5,
    score: '20/20',
    percentage: 100,
  },
]

const grandTotal = data.reduce(
  (acc, item) => ({
    questions: acc.questions + item.questions,
    correct: acc.correct + item.correct,
    score: acc.score + parseInt(item.score.split('/')[0]),
    maxScore: acc.maxScore + parseInt(item.score.split('/')[1]),
  }),
  { questions: 0, correct: 0, score: 0, maxScore: 0 }
)

const percentage = ((grandTotal.score / grandTotal.maxScore) * 100).toFixed(2)

const TotalScoreTable = () => {
  return (
    <div className="overflow-x-auto p-4">
      <table className="border-gray-200 shadow-md min-w-full overflow-hidden rounded-xl border bg-white">
        <thead className="bg-gray-100">
          <tr className="rounded-tl-[12px]">
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
            ].map((header) => (
              <th
                key={header}
                className="text-nowrap border border-[#FFFFFF33] bg-[#253466] px-4 py-2 text-center text-sm font-semibold text-white"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#F7F7F7]">
          {data.map((item, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 text-nowrap border-t bg-[#F7F7F7] text-center"
            >
              <td className="border border-[#D7D7D7] bg-[#F7F7F7] px-4 py-2">
                {item.srNo}
              </td>
              <td className="border border-[#D7D7D7] bg-[#F7F7F7] px-4 py-2">
                {item.date}
              </td>
              <td className="border border-[#D7D7D7] bg-[#F7F7F7] px-4 py-2">
                {item.lesson}
              </td>
              <td className="border border-[#D7D7D7] bg-[#F7F7F7] px-4 py-2 text-left">
                {item.topic}
              </td>
              <td className="border border-[#D7D7D7] bg-[#F7F7F7] px-4 py-2">
                {item.questions}
              </td>
              <td className="border border-[#D7D7D7] bg-[#F7F7F7] px-4 py-2">
                {item.correct}
              </td>
              <td className="border border-[#D7D7D7] bg-[#F7F7F7] px-4 py-2">
                {item.score}
              </td>
              <td className="border border-[#D7D7D7] bg-[#F7F7F7] px-4 py-2">
                {item.percentage}%
              </td>
              <td className="cursor-pointer border border-[#D7D7D7] bg-[#F7F7F7] px-4 py-2">
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
    </div>
  )
}

export default TotalScoreTable
