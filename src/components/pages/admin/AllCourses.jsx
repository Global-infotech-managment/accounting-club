import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import Button from '../../common/Button';
import {
  fetchCourses,
  deleteCourse,
  toggleCourseStatus,
} from '../../../services/course/course.service';
import { toast } from 'react-toastify';

const AllCourses = () => {
  const [visibleCount, setVisibleCount] = useState(6);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['courses', searchQuery],
    queryFn: () =>
      fetchCourses({
        search: searchQuery || undefined,
        // Optionally, you could add a very high limit
        // limit: 1000,
      }),
    keepPreviousData: true,
  });

  const { mutate: deleteCourseMutation } = useMutation({
    mutationFn: deleteCourse,
    onSuccess: (deletedId) => {
      toast.success(`Course with ID ${deletedId} deleted successfully!`);
      refetch();
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        'Failed to delete course'
      );
    },
  });

  const { mutate: toggleStatusMutation } = useMutation({
    mutationFn: ({ id, status }) => toggleCourseStatus(id, status),
    onSuccess: (_, variables) => {
      const action = variables.status === 'Enable' ? 'enabled' : 'disabled';
      toast.success(`Course ${action} successfully!`);
      refetch();
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message ||
        error.message ||
        'Failed to update course status'
      );
    },
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      deleteCourseMutation(id);
    }
  };

  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'Enable' ? 'Disable' : 'Enable';
    toggleStatusMutation({ id, status: newStatus });
  };

  const handleSearch = () => {
    setSearchQuery(searchTerm);
    setVisibleCount(6);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchQuery('');
    setVisibleCount(6);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  if (isLoading) return <div className="flex justify-center py-10">Loading...</div>;
  if (isError) return (
    <div className="text-red-500 flex justify-center py-10">
      Error loading courses
    </div>
  );

  const allCourses = data?.data?.courses || data?.data || [];
  const totalCourses = allCourses.length;
  const coursesToShow = allCourses.slice(0, visibleCount);

  return (
    <div className="rounded-xl border border-black border-opacity-[0.03] bg-black bg-opacity-[0.03] p-4">
      {/* Search and Header */}
      <div className="mb-4 flex flex-col items-center justify-between sm:flex-row">
        <p className="mb-2 w-full text-center text-[16px] font-semibold text-black sm:mb-0 sm:text-start md:text-[18px]">
          All Courses
        </p>
        <div className="flex items-center gap-2">
          <input
            ref={searchInputRef}
            value={searchTerm}
            placeholder="Search courses"
            className="max-w-[200px] rounded border px-2 py-1 sm:max-w-[300px]"
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="rounded bg-[#252466] px-3 py-1.5 text-sm text-white"
          >
            Search
          </button>
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="bg-gray-200 rounded px-2 py-1 text-sm"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      <hr className="mb-4 w-full bg-black opacity-10" />

      {/* Course List */}
      {coursesToShow.length === 0 ? (
        <div className="flex justify-center py-10">
          {searchQuery ? 'No courses found matching your search' : 'No courses found'}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {coursesToShow.map((course) => (
              <div
                key={course.id}
                className="shadow-md flex flex-col justify-between rounded-lg bg-white p-4"
              >
                {/* Course Card Content */}
                <div>
                  <img
                    src={course?.file?.url}
                    alt={course.name}
                    className="h-40 w-full rounded-md object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                    }}
                  />
                  <div className="flex items-center justify-between pt-2.5">
                    <h3 className="text-lg mt-3 font-semibold">{course.name}</h3>
                    <button
                      className={`!h-[30px] rounded-2xl px-2.5 text-[12px] transition-all duration-300 ease-in-out ${
                        course.status === 'Enable'
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                      }`}
                      onClick={() => handleToggleStatus(course.id, course.status)}
                    >
                      {course.status}
                    </button>
                  </div>
                  <p className="text-gray-600 text-sm font-medium">{course.category}</p>
                  <p className="text-gray-500 mt-2 line-clamp-3 text-sm">{course.description}</p>
                </div>
                <div className="mt-4 flex gap-5">
                  <a href={`/admin-dashboard?activeSidebar=update-course&id=${course.id}`}>
                    <Button bgBtn="Edit" />
                  </a>
                  <button
                    className="rounded border border-orange-red bg-white px-4 py-2 text-orange-red transition-all duration-300 hover:bg-orange-red hover:text-white"
                    onClick={() => handleDelete(course.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Show More / Show Less */}
          <div className="mt-6 flex items-center justify-center gap-4">
            {visibleCount < totalCourses && (
              <button
                className="rounded border border-orange-red bg-white px-4 py-2 text-orange-red transition-all duration-300 hover:bg-orange-red hover:text-white"
                onClick={() => setVisibleCount((prev) => Math.min(prev + 6, totalCourses))}
              >
                Show More
              </button>
            )}
            {visibleCount > 6 && (
              <button
                className="rounded border border-orange-red bg-white px-4 py-2 text-orange-red transition-all duration-300 hover:bg-orange-red hover:text-white"
                onClick={() => setVisibleCount((prev) => Math.max(prev - 6, 6))}
              >
                Show Less
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AllCourses;
