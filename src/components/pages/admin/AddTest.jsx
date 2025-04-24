import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Button from '../../common/Button';
import Icons from '../../common/Icons';
import Input from '../../common/Input';
import { Dropdown } from '../../common/Dropdown';
import { useCreateTest } from '../../../hooks/useAuth';
import { fetchAllCourses } from '../../../services/course/course.service';
import { AppContext } from '../../../utils/AppContext';

export default function AddTest() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: createTest, isPending } = useCreateTest();
  const { courseData, updateCourseData } = useContext(AppContext);
  
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [selectedChapterId, setSelectedChapterId] = useState('');
  const [questions, setQuestions] = useState([
    { question: '', options: ['', '', '', ''], correctAnswer: '' },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch courses data
  const { 
    data: courses, 
    isLoading: isCoursesLoading, 
    isError: isCoursesError 
  } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchAllCourses,
    onSuccess: (data) => {
      if (data?.courses?.length > 0) {
        updateCourseData({ courseId: data.courses[0].id });
      }
    },
  });

  const courseOptions = courses?.map((course) => ({
    value: course.id,
    label: course.name,
  })) || [];

  const handleQuestionChange = (e) => {
    const newQuestions = [...questions];
    newQuestions[currentIndex].question = e.target.value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[currentIndex].options[index] = value;
    setQuestions(newQuestions);
  };

  const handleCorrectAnswerChange = (answer) => {
    const newQuestions = [...questions];
    newQuestions[currentIndex].correctAnswer = answer;
    setQuestions(newQuestions);
  };

  const addNewQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correctAnswer: '' },
    ]);
    setCurrentIndex(questions.length);
  };

  const navigateNext = () => {
    if (!isCurrentQuestionValid()) return;
    
    if (currentIndex === questions.length - 1) {
      addNewQuestion();
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const navigatePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const isCurrentQuestionValid = () => {
    const currentQuestion = questions[currentIndex];
    return (
      currentQuestion.question.trim() &&
      currentQuestion.options.every((opt) => opt.trim()) &&
      currentQuestion.correctAnswer
    );
  };

  const handleDeleteQuestion = () => {
    if (questions.length === 1) {
      // Reset if it's the only question
      setQuestions([
        { question: '', options: ['', '', '', ''], correctAnswer: '' },
      ]);
      setCurrentIndex(0);
      return;
    }

    const updatedQuestions = questions.filter(
      (_, index) => index !== currentIndex
    );
    setQuestions(updatedQuestions);

    // Adjust index to prevent out-of-range issue
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const isFormValid = () => {
    return questions.every(
      (q) =>
        q.question.trim() &&
        q.options.every((opt) => opt.trim()) &&
        q.correctAnswer
    ) && selectedLessonId;
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      window.alert('Please fill all fields and select a lesson');
      return;
    }

    // Prepare the data for API
    const testData = {
      lessonId: selectedLessonId,
      questions: questions.map(q => ({
        question: q.question,
        options: q.options,
        answer: q.correctAnswer,
      })),
    };

    createTest(testData, {
      onSuccess: () => {
        // Invalidate queries to refresh data
        queryClient.invalidateQueries({ queryKey: ['tests', selectedLessonId] });
        
        // Show success message
        window.alert('Test created successfully!');
        
        // Reset form
        setQuestions([
          { question: '', options: ['', '', '', ''], correctAnswer: '' },
        ]);
        setCurrentIndex(0);
        
        // Navigate back
        navigate('/admin-dashboard?activeSidebar=dashboard');
      },
      onError: (error) => {
        window.alert(`Error creating test: ${error.message}`);
      }
    });
  };

  const handleLessonChange = (value) => {
    setSelectedLessonId(value);
  };

  const handleChapterChange = (value) => {
    setSelectedChapterId(value);
  };

  const handleDropdownChange = (name, value) => {
    updateCourseData({ [name]: value });
  };

  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
        <p className="mb-3 text-[16px] font-semibold text-black sm:mb-0 lg:text-[18px]">
          Add Test
        </p>
        <div className="flex items-center justify-center gap-4">
          <Dropdown
            name="courseId"
            label="Select Course"
            options={courseOptions}
            value={courseData.courseId}
            onChange={handleDropdownChange}
            isLoading={isCoursesLoading}
            isError={isCoursesError}
          />
          <Dropdown
            name="chapterId"
            label="Select Chapter"
            options={[
              { value: 'chapter1', label: 'Chapter 1' },
              { value: 'chapter2', label: 'Chapter 2' },
            ]}
            value={selectedChapterId}
            onChange={handleChapterChange}
          />
        </div>
      </div>
      <hr className="mb-4 w-full bg-black opacity-10" />
      <p className="mb-2 text-[17px] font-medium text-black">Question</p>
      <p className="text-[14px] font-normal text-black">
        Choose appropriate options <span className="font-medium">A</span>,
        <span className="font-medium">B</span>,
        <span className="font-medium">C</span> or{' '}
        <span className="font-medium">D</span>
      </p>
      <div className="mb-3 mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:gap-0 md:items-center">
        <div className="flex w-full items-center gap-2">
          <button
            disabled={currentIndex === 0}
            className={`${currentIndex === 0 ? 'opacity-10 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={navigatePrevious}
            aria-label="Previous question"
          >
            <Icons iconName={'prevArrow'} />
          </button>
          <div className="flex w-full items-center justify-center rounded-[10px] border border-[#4e4e4e] border-opacity-10 bg-white px-4 py-2 text-[14px] text-black md:w-auto">
            Question {currentIndex + 1}/{questions.length}
          </div>
          <button
            disabled={!isCurrentQuestionValid()}
            className={`rotate-180 ${!isCurrentQuestionValid() ? 'opacity-10 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={navigateNext}
            aria-label="Next question"
          >
            <Icons iconName={'prevArrow'} />
          </button>
        </div>
        <Button
          className={`max-h-[37px] whitespace-nowrap !text-[14px] ${!isCurrentQuestionValid() && 'pointer-events-none opacity-70'}`}
          bgBtn={'Add Question'}
          disabled={!isCurrentQuestionValid()}
          onClick={addNewQuestion}
        />
      </div>
      <hr className="mb-4 w-full bg-black opacity-10" />
      <div className="mb-3 w-full">
        <Input
          placeholder="Enter your question"
          value={questions[currentIndex].question}
          onChange={handleQuestionChange}
          aria-label="Question input"
        />
      </div>
      <div className="mb-4">
        <p className="mb-3 text-[17px] font-medium text-black">Options</p>
        {questions[currentIndex].options.map((option, index) => (
          <div key={index} className="mb-4 flex items-center">
            <span className="mr-3 flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#4e4e4e] border-opacity-10 bg-[#fbfbfb] bg-opacity-50">
              {String.fromCharCode(65 + index)}
            </span>
            <Input
              placeholder="Your answer here"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              label={''}
              aria-label={`Option ${String.fromCharCode(65 + index)}`}
            />
          </div>
        ))}
        <div className="flex items-end justify-end">
          <button
            className="text-orange-red transition-all duration-300 ease-in-out hover:text-primary"
            onClick={handleDeleteQuestion}
            aria-label="Delete question"
          >
            Delete Question
          </button>
        </div>
      </div>
      <div className="mb-4">
        <div className="mb-3 text-[17px] font-medium text-black">
          Correct Answer
        </div>
        <div className="mb-10 flex items-center gap-3">
          {questions[currentIndex].options.map((_, index) => (
            <button
              key={index}
              className={`flex h-[40px] w-[40px] items-center justify-center rounded-[12px] border border-[#4e4e4e] border-opacity-10 transition-colors ${
                questions[currentIndex].correctAnswer === String.fromCharCode(65 + index) 
                  ? '!bg-primary text-white' 
                  : 'bg-[#fbfbfb] hover:bg-gray-100'
              }`}
              onClick={() =>
                handleCorrectAnswerChange(String.fromCharCode(65 + index))
              }
              aria-label={`Set ${String.fromCharCode(65 + index)} as correct answer`}
            >
              {String.fromCharCode(65 + index)}
            </button>
          ))}
        </div>
      </div>
      <Button
        disabled={!isFormValid() || isPending}
        onClick={handleSubmit}
        bgBtn={isPending ? 'Submitting...' : 'Submit'}
        className={'w-full'}
        aria-label="Submit test"
      />
    </div>
  );
}