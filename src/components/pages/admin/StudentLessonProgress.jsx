import React from 'react'
import Input from '../../common/Input'
import { Dropdown } from '../../common/Dropdown'
import graph from '../../../assets/images/webp/graph.webp'

const StudentLessonProgress = () => {
  return (
    <div className="rounded-xl bg-[#F7F7F7] p-4">
      <hr className="text-[#DFDFDF]" />

      <div class="grid grid-cols-1 gap-4 pt-12 sm:grid-cols-2">
        <Dropdown
          label="Select Course"
          options={[
            {
              value: 'Basics of Business Accounting',
              label: 'Basics of Business Accounting',
            },
            {
              value: 'Frontend Development Course',
              label: 'Frontend Development Course',
            },
          ]}
        />
        <Dropdown
          label="Select Chapter"
          placeholder="Chapter-1"
          options={[
            { value: 'Chapter-1', label: 'Chapter-1' },
            { value: 'Chapter-2', label: 'Chapter-2' },
          ]}
        />
        <Input name="courseId" label="Lesson Number" placeholder="01" />
        <Input name="courseId" label="Lesson Number" placeholder="01" />
      </div>
      <div className="pt-6">
        <img src={graph} alt="graph" />
      </div>
    </div>
  )
}

export default StudentLessonProgress
