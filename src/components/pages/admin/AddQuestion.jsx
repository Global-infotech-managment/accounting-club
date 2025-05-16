import { useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Button from '../../common/Button';
import Icons from '../../common/Icons';
import Input from '../../common/Input';
import { Dropdown } from '../../common/Dropdown';
import { useCreateTest } from '../../../hooks/useAuth';
import { fetchAllCourses } from '../../../services/course/course.service';
import { AppContext } from '../../../utils/AppContext';
import { fetchAllSections } from '../../../services/section/section.services';
import { toast } from 'sonner';

/**
 * Updated AddQuestion component
 * --------------------------------------------------------------
 * 1. Correct dropdown names & wiring (course, lesson, questionType, testLevel, marks, negativeMarks).
 * 2. Provide dummy fallback options if API returns no data.
 * 3. Dynamically change the question‑answer UI based on selected questionType (MCQ, True/False, Fill in the Blanks).
 */
export default function AddQuestion() {
  /* -------------------- React Query -------------------- */
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: createTest, isPending } = useCreateTest();

  /* -------------------- Context -------------------- */
  const { courseData, updateCourseData } = useContext(AppContext);

  /* -------------------- Local State -------------------- */
  const [selectedLessonId, setSelectedLessonId] = useState('');
  const [questionType, setQuestionType] = useState('MCQ'); // MCQ | TF | FIB
  const [testLevel, setTestLevel] = useState('EASY'); // EASY | MEDIUM | HARD
  const [marks, setMarks] = useState(1);
  const [negativeMarks, setNegativeMarks] = useState(0);

  // Question list state – the shape changes a bit depending on questionType but we keep a generic structure
  const [questions, setQuestions] = useState([
    {
      question: '',
      options: ['', '', '', ''], // used only for MCQ
      correctAnswer: '', // could be 'A' | 'B' | 'C' | 'D' | 'TRUE' | 'FALSE' | 'TEXT'
    },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);

  /* -------------------- Queries -------------------- */
  const {
    data: courses = [],
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useQuery({ queryKey: ['courses'], queryFn: fetchAllCourses });

  const {
    data: lessons = [],
    isLoading: isLessonLoading,
    isError: isLessonError,
  } = useQuery({ queryKey: ['lessons'], queryFn: fetchAllSections });

  /* -------------------- Derived Options -------------------- */
  // Fallback dummy if no data
  const fallbackCourses = [
    { id: 'demo-course', name: 'Demo Course' },
  ];
  const fallbackLessons = [
    { id: 'demo-lesson', name: 'Demo Lesson' },
  ];

  const courseOptions = [
    { value: '', label: 'Select Course' },
    ...((courses?.length ? courses : fallbackCourses).map((course) => ({
      value: course.id,
      label: course.name,
    })) || []),
  ];

  const lessonOptions = [
    { value: '', label: 'Select Lesson' },
    ...((lessons?.length ? lessons : fallbackLessons).map((lesson) => ({
      value: lesson.id,
      label: lesson.name,
    })) || []),
  ];

  const questionTypeOptions = [
    { value: 'MCQ', label: 'Multiple Choice' },
    { value: 'TF', label: 'True / False' },
    { value: 'FIB', label: 'Fill in the Blanks' },
  ];

  const testLevelOptions = [
    { value: 'EASY', label: 'Easy' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'HARD', label: 'Hard' },
  ];

  const markOptions = Array.from({ length: 10 }, (_, i) => ({
    value: i + 1,
    label: `${i + 1}`,
  }));

  const negativeMarkOptions = Array.from({ length: 10 }, (_, i) => ({
    value: -(i + 1) / 2,
    label: `-${(i + 1) / 2}`,
  }));

  /* -------------------- Side‑effects -------------------- */
  // Keep URL in sync with selected lesson id
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const lessonIdFromURL = params.get('lessonId');
    if (lessonIdFromURL) setSelectedLessonId(lessonIdFromURL);
  }, [location.search]);

  /* -------------------- Handlers -------------------- */
  const handleDropdownChange = (name, value) => {
    switch (name) {
      case 'courseId':
        updateCourseData({ [name]: value });
        break;
      case 'lessonId':
        setSelectedLessonId(value);
        break;
      case 'questionType':
        setQuestionType(value);
        // Reset current question when question type switches
        setQuestions([
          {
            question: '',
            options: ['', '', '', ''],
            correctAnswer: '',
          },
        ]);
        setCurrentIndex(0);
        break;
      case 'testLevel':
        setTestLevel(value);
        break;
      case 'marks':
        setMarks(Number(value));
        break;
      case 'negativeMarks':
        setNegativeMarks(Number(value));
        break;
      default:
        break;
    }

    // Special handling for lessonId to keep it in URL
    if (name === 'lessonId') {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('lessonId', value);
      navigate(`?${searchParams.toString()}`, { replace: true });
    }
  };

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

  const isCurrentQuestionValid = () => {
    const current = questions[currentIndex];
    if (!current.question.trim()) return false;

    switch (questionType) {
      case 'MCQ':
        return (
          current.options.every((opt) => opt.trim()) && !!current.correctAnswer
        );
      case 'TF':
        return current.correctAnswer === 'TRUE' || current.correctAnswer === 'FALSE';
      case 'FIB':
        return !!current.correctAnswer.trim();
      default:
        return false;
    }
  };

  const isFormValid = () => {
    const lessonValid = !!selectedLessonId;
    const courseValid = !!courseData.courseId;
    return (
      lessonValid &&
      courseValid &&
      questions.every(() => isCurrentQuestionValid())
    );
  };

  /* -------------------- Navigation -------------------- */
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

  const handleDeleteQuestion = () => {
    if (questions.length === 1) {
      setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
      setCurrentIndex(0);
      return;
    }

    const updatedQuestions = questions.filter((_, idx) => idx !== currentIndex);
    setQuestions(updatedQuestions);
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  /* -------------------- Submit -------------------- */
  const handleSubmit = () => {
    if (!isFormValid()) {
      window.alert('Please fill all fields and select a lesson');
      return;
    }

    const getAnswerIndex = (answerLetter) => {
      const valid = ['A', 'B', 'C', 'D'];
      return valid.indexOf(answerLetter);
    };

    // For the sake of simplicity we only create a single question per submit (matching previous behavior)
    const q = questions[0];

    let answer = q.correctAnswer;
    if (questionType === 'MCQ') {
      const idx = getAnswerIndex(q.correctAnswer);
      answer = q.options[idx];
    }

    const payload = {
      lessonId: selectedLessonId,
      courseId: courseData.courseId,
      questionType,
      testLevel,
      marks,
      negativeMarks,
      question: q.question,
      options: questionType === 'MCQ' ? q.options : undefined,
      answer,
    };

    createTest(payload, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['tests', selectedLessonId] });
        toast.success('Test created successfully!');
        // Reset state
        setQuestions([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
        setCurrentIndex(0);
        navigate('/admin-dashboard?activeSidebar=dashboard');
      },
      onError: (error) => {
        window.alert(`Error creating test: ${error.message}`);
      },
    });
  };

  /* -------------------------------------------------------------- */
  return (
    <div className="rounded-xl border border-black border-opacity-30 bg-black bg-opacity-[3%] px-4 py-[20px]">
      {/* Header */}
      <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
        <p className="mb-3 text-[16px] font-semibold text-black sm:mb-0 lg:text-[18px]">
          Add Test
        </p>
      </div>

      {/* -------------------- Dropdowns -------------------- */}
      <div className="space-y-4">
        {/* row 1 */}
        <div className="flex flex-wrap items-center justify-center gap-4">
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
            name="lessonId"
            label="Select Chapter"
            options={lessonOptions}
            value={selectedLessonId}
            onChange={handleDropdownChange}
            isLoading={isLessonLoading}
            isError={isLessonError}
          />
        </div>

        {/* row 2 */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Dropdown
            name="questionType"
            label="Question Type"
            options={questionTypeOptions}
            value={questionType}
            onChange={handleDropdownChange}
          />
          <Dropdown
            name="testLevel"
            label="Test Level"
            options={testLevelOptions}
            value={testLevel}
            onChange={handleDropdownChange}
          />
        </div>

        {/* row 3 */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Dropdown
            name="marks"
            label="Marks For Each Question"
            options={markOptions}
            value={marks}
            onChange={handleDropdownChange}
          />
          <Dropdown
            name="negativeMarks"
            label="Negative Marks For Each Question"
            options={negativeMarkOptions}
            value={negativeMarks}
            onChange={handleDropdownChange}
          />
        </div>
      </div>

      <hr className="my-4 w-full bg-black opacity-10" />

      {/* -------------------- Question UI -------------------- */}
      <div>
        <p className="mb-2 text-[17px] font-medium text-black">Question</p>
        {questionType === 'MCQ' && (
          <p className="text-[14px] font-normal text-black">
            Choose appropriate option <span className="font-medium">A</span>,
            <span className="font-medium">B</span>,<span className="font-medium">C</span> or{' '}
            <span className="font-medium">D</span>
          </p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mb-3 mt-4 flex flex-col justify-between gap-5 sm:flex-row sm:gap-0 md:items-center">
        <div className="flex w-full items-center gap-2">
          <button
            disabled={currentIndex === 0}
            className={`${currentIndex === 0 ? 'cursor-not-allowed opacity-10' : 'cursor-pointer'}`}
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
            className={`rotate-180 ${!isCurrentQuestionValid() ? 'cursor-not-allowed opacity-10' : 'cursor-pointer'}`}
            onClick={navigateNext}
            aria-label="Next question"
          >
            <Icons iconName={'prevArrow'} />
          </button>
        </div>
        <Button
          className={`max-h-[37px] whitespace-nowrap !text-[14px] ${!isCurrentQuestionValid() ? 'pointer-events-none opacity-70' : ''}`}
          bgBtn={'Add Question'}
          disabled={!isCurrentQuestionValid()}
          onClick={addNewQuestion}
        />
      </div>

      <hr className="mb-4 w-full bg-black opacity-10" />

      {/* -------------------- Question Input -------------------- */}
      <div className="mb-3 w-full">
        <Input
          placeholder="Enter your question"
          value={questions[currentIndex].question}
          onChange={handleQuestionChange}
        />
      </div>

      {/* -------------------- Answer UI depends on questionType -------------------- */}
      {questionType === 'MCQ' && (
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
              />
            </div>
          ))}
          <div className="flex items-end justify-end">
            <button
              className="text-orange-red transition-all duration-300 ease-in-out hover:text-primary"
              onClick={handleDeleteQuestion}
            >
              Delete Question
            </button>
          </div>

          <div className="mb-4">
            <div className="mb-3 text-[17px] font-medium text-black">Correct Answer</div>
            <div className="mb-10 flex items-center gap-3">
              {questions[currentIndex].options.map((_, index) => (
                <button
                  key={index}
                  className={`flex h-[40px] w-[40px] items-center justify-center rounded-[12px] border transition-colors ${
                    questions[currentIndex].correctAnswer === String.fromCharCode(65 + index)
                      ? '!bg-primary text-white'
                      : 'hover:bg-gray-100 bg-[#fbfbfb]'
                  }`}
                  onClick={() => handleCorrectAnswerChange(String.fromCharCode(65 + index))}
                >
                  {String.fromCharCode(65 + index)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {questionType === 'TF' && (
        <div className="mb-4">
          <div className="mb-3 text-[17px] font-medium text-black">Select Correct Answer</div>
          <div className="flex gap-4">
            {['TRUE', 'FALSE'].map((value) => (
              <button
                key={value}
                onClick={() => handleCorrectAnswerChange(value)}
                className={`rounded-lg border px-6 py-2 text-sm font-medium transition-colors ${
                  questions[currentIndex].correctAnswer === value
                    ? 'bg-primary text-white'
                    : 'bg-[#fbfbfb] hover:bg-gray-100'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      )}

      {questionType === 'FIB' && (
        <div className="mb-4 w-full">
          <p className="mb-3 text-[17px] font-medium text-black">Correct Answer</p>
          <Input
            placeholder="Type the correct answer"
            value={questions[currentIndex].correctAnswer}
            onChange={(e) => handleCorrectAnswerChange(e.target.value)}
          />
        </div>
      )}

      {/* Submit */}
      <Button
        disabled={!isFormValid() || isPending}
        onClick={handleSubmit}
        bgBtn={isPending ? 'Submitting...' : 'Submit'}
        className={'w-full'}
      />
    </div>
  );
}
