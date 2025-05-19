/* AddVideo.jsx — fixed */

'use client';
import React, { useContext, useState, useEffect, useCallback } from 'react';
import Input from '../../common/Input';
import Button from '../../common/Button';
import { Dropdown } from '../../common/Dropdown';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../../../utils/AppContext';
import { useMutation, useQuery } from '@tanstack/react-query';
import { showToast } from '../../../services/toast/toast.service';
import { uploadFile } from '../../../services/uploads/upload.service';
import { fetchAllCourses } from '../../../services/course/course.service';
import { fetchAllSections } from '../../../services/section/section.services';

const AddVideo = () => {
  /** ─────────────────────────────────────────────────────────
   *  Local-state + context
   *  ───────────────────────────────────────────────────────── */
  const { courseData, updateCourseData } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedLessonId, setSelectedLessonId] = useState('');

  /** ─────────────────────────────────────────────────────────
   *  Pull any query-string params into local + context state
   *  ───────────────────────────────────────────────────────── */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlCourseId = params.get('courseId') || '';
    const urlLessonId = params.get('lessonId') || '';

    if (urlCourseId) {
      setSelectedCourseId(urlCourseId);
      updateCourseData({ courseId: urlCourseId });
    }
    if (urlLessonId) {
      setSelectedLessonId(urlLessonId);
      updateCourseData({ lessonId: urlLessonId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** ─────────────────────────────────────────────────────────
   *  Data fetching
   *  ───────────────────────────────────────────────────────── */
  const {
    data: courses = [],
    isLoading: isCoursesLoading,
    isError: isCoursesError,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchAllCourses,
  });

  const {
    data: lessons = [],
    isLoading: isLessonsLoading,
    isError: isLessonsError,
    refetch: refetchLessons,
  } = useQuery({
    queryKey: ['lessons', selectedCourseId],
    queryFn: () => fetchAllSections(selectedCourseId),
    enabled: !!selectedCourseId,
  });

  /** ─────────────────────────────────────────────────────────
   *  Helpers
   *  ───────────────────────────────────────────────────────── */
  const syncSearchParams = (key, value) => {
    const params = new URLSearchParams(location.search);
    if (value) params.set(key, value);
    else params.delete(key);
    navigate(`?${params.toString()}`, { replace: true });
  };

  const handleCourseChange = useCallback(
    (_name, value) => {
      setSelectedCourseId(value);
      setSelectedLessonId(''); // reset chapter list-box
      updateCourseData({ courseId: value, lessonId: '' });
      syncSearchParams('courseId', value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleLessonChange = useCallback(
    (_name, value) => {
      setSelectedLessonId(value);
      updateCourseData({ lessonId: value });
      syncSearchParams('lessonId', value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleGenericDropdown = (_name, value) => {
    updateCourseData({ [_name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateCourseData({ [name]: value });
  };

  /** ─── File upload ───────────────────────────────────────── */
  const uploadFileMutation = useMutation({
    mutationFn: (file) => uploadFile(file, 'study-materials'),
    onSuccess: (response) => {
      const uploadedId = response.id || response;
      showToast.success('Study material uploaded successfully');
      updateCourseData({ studyMaterialId: uploadedId });
    },
    onError: () => showToast.error('Study material upload failed'),
  });

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      updateCourseData({ studyMaterial: file });
      await uploadFileMutation.mutateAsync(file);
    }
  };

  /** ─── Submit ────────────────────────────────────────────── */
  const formSubmit = (e) => {
    e.preventDefault();
    const required = [
      'courseId',
      'lessonId',
      'lessonNumber',
      'chapterDescription',
      'videoDescription',
      'embedCode',
      'status',
    ];
    const isValid = required.every((k) => courseData[k]);
    if (!isValid) {
      showToast.error('Please fill all required fields');
      return;
    }
    showToast.success('Video section updated successfully!');
    setTimeout(() => {
      navigate('/admin-dashboard?activeSidebar=add-test');
    }, 600);
  };

  /** ─── Static options ───────────────────────────────────── */
  const courseOptions = [
    { value: '', label: 'Select Course' },
    ...courses.map((c) => ({ value: c.id, label: c.name })),
  ];
  const lessonOptions = [
    { value: '', label: 'Select Chapter' },
    ...lessons.map((l) => ({ value: l.id, label: l.name })),
  ];
  const yesNo = [
    { value: 'true', label: 'Yes' },
    { value: 'false', label: 'No' },
  ];
  const statusOptions = [
    { value: 'true', label: 'Active' },
    { value: 'false', label: 'Disable' },
  ];

  /** ─── UI ───────────────────────────────────────────────── */
  return (
    <div className="rounded-xl border border-black/30 bg-black/5 px-4 py-5">
      {/* Header */}
      <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
        <p className="mb-2 w-full text-center text-base font-semibold sm:mb-0 sm:text-left md:text-lg">
          Add Video And Study Material
        </p>
        <Link to="/admin-dashboard?activeSidebar=add-test">
          <button className="rounded bg-[#252466] px-3 py-1.5 text-sm text-white">
            Add test
          </button>
        </Link>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-3 sm:gap-4" onSubmit={formSubmit}>
        {/* Course */}
        <Dropdown
          name="courseId"
          label="Select Course"
          options={courseOptions}
          value={selectedCourseId}
          onChange={handleCourseChange}
          isLoading={isCoursesLoading}
          isError={isCoursesError}
        />

        {/* Chapter */}
        <Dropdown
          name="lessonId"
          label="Select Chapter"
          options={lessonOptions}
          value={selectedLessonId}
          onChange={handleLessonChange}
          isLoading={isLessonsLoading}
          isError={isLessonsError}
          disabled={!selectedCourseId}
        />

        {/* Mandatory? */}
        <Dropdown
          name="isMandatory"
          label="Is mandatory to move next"
          options={yesNo}
          value={courseData.isMandatory || ''}
          onChange={handleGenericDropdown}
        />

        {/* Chapter No. */}
        <Input
          label="Chapter No."
          id="lessonNumber"
          name="lessonNumber"
          placeholder="1"
          value={courseData.lessonNumber || ''}
          onChange={handleInputChange}
        />

        {/* Chapter description */}
        <Input
          label="Chapter Description"
          id="chapterDescription"
          name="chapterDescription"
          placeholder="Chapter Description"
          value={courseData.chapterDescription || ''}
          onChange={handleInputChange}
        />

        {/* Video description */}
        <Input
          label="Video Description"
          id="videoDescription"
          name="videoDescription"
          placeholder="Short summary of the video..."
          value={courseData.videoDescription || ''}
          onChange={handleInputChange}
        />

        {/* Embed code */}
        <Input
          label="Video Embed Code"
          id="embedCode"
          name="embedCode"
          placeholder="<iframe src='...' />"
          value={courseData.embedCode || ''}
          onChange={handleInputChange}
        />

        {/* Study material */}
        <Input
          label="Study Material"
          id="studyMaterial"
          name="studyMaterial"
          type="file"
          accept=".pdf,.docx,.pptx"
          onChange={handleFileChange}
        />
        {courseData.studyMaterial && (
          <p className="mt-1 text-xs text-gray-600">
            File selected: {courseData.studyMaterial.name}
          </p>
        )}

        {/* Status */}
        <Dropdown
          name="status"
          label="Status"
          options={statusOptions}
          value={courseData.status || ''}
          onChange={handleGenericDropdown}
        />

        {/* Submit */}
        <Button
          type="submit"
          className="col-span-2 mt-4 w-full"
          bgBtn="Add Video"
          disabled={uploadFileMutation.isLoading}
        />
      </form>
    </div>
  );
};

export default AddVideo;
