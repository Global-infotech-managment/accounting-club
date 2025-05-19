/* UpdateVideo.jsx — revised with pre-fill */

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

const UpdateVideo = () => {
  const { courseData, updateCourseData } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedCourseId, setSelectedCourseId] = useState(courseData.courseId || '');
  const [selectedLessonId, setSelectedLessonId] = useState(courseData.lessonId || '');

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
  }, []);

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

  const syncSearchParams = (key, value) => {
    const params = new URLSearchParams(location.search);
    if (value) params.set(key, value);
    else params.delete(key);
    navigate(`?${params.toString()}`, { replace: true });
  };

  const handleCourseChange = useCallback((_, value) => {
    setSelectedCourseId(value);
    setSelectedLessonId('');
    updateCourseData({ courseId: value, lessonId: '' });
    syncSearchParams('courseId', value);
  }, []);

  const handleLessonChange = useCallback((_, value) => {
    setSelectedLessonId(value);
    updateCourseData({ lessonId: value });
    syncSearchParams('lessonId', value);
  }, []);

  const handleGenericDropdown = (_name, value) => {
    updateCourseData({ [_name]: value });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateCourseData({ [name]: value });
  };

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

  return (
    <div className="rounded-xl border border-black/30 bg-black/5 px-4 py-5">
      <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
        <p className="mb-2 w-full text-center text-base font-semibold sm:mb-0 sm:text-left md:text-lg">
          Update Video And Study Material
        </p>
        <Link to="/admin-dashboard?activeSidebar=all-courses">
          <button className="rounded text-nowrap bg-[#252466] px-3 py-1.5 text-sm text-white">
            All Course
          </button>
        </Link>
      </div>

      <form className="flex flex-col gap-3 sm:gap-4" onSubmit={formSubmit}>
        <Dropdown
          name="courseId"
          label="Select Course"
          options={courseOptions}
          value={selectedCourseId}
          onChange={handleCourseChange}
          isLoading={isCoursesLoading}
          isError={isCoursesError}
        />

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

        <Dropdown
          name="isMandatory"
          label="Is mandatory to move next"
          options={yesNo}
          value={courseData.isMandatory || ''}
          onChange={handleGenericDropdown}
        />

        <Input
          label="Chapter No."
          id="lessonNumber"
          name="lessonNumber"
          placeholder="1"
          value={courseData.lessonNumber || ''}
          onChange={handleInputChange}
        />

        <Input
          label="Chapter Description"
          id="chapterDescription"
          name="chapterDescription"
          placeholder="Chapter Description"
          value={courseData.chapterDescription || ''}
          onChange={handleInputChange}
        />

        <Input
          label="Video Description"
          id="videoDescription"
          name="videoDescription"
          placeholder="Short summary of the video..."
          value={courseData.videoDescription || ''}
          onChange={handleInputChange}
        />

        <Input
          label="Video Embed Code"
          id="embedCode"
          name="embedCode"
          placeholder="<iframe src='...' />"
          value={courseData.embedCode || ''}
          onChange={handleInputChange}
        />

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
            File selected: {courseData.studyMaterial.name || 'Previously uploaded file'}
          </p>
        )}

        <Dropdown
          name="status"
          label="Status"
          options={statusOptions}
          value={courseData.status || ''}
          onChange={handleGenericDropdown}
        />

        <Button
          type="submit"
          className="col-span-2 mt-4 w-full"
          bgBtn="Update Video"
          disabled={uploadFileMutation.isLoading}
        />
      </form>
    </div>
  );
};

export default UpdateVideo;