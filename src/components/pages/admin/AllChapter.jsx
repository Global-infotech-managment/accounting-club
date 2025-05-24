import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../common/Button';
import Input from '../../common/Input';
import popupImage from '../../../assets/images/webp/popup-icon.webp';
import { toast } from 'sonner';

/* ───────────── TEMP: dummy data — replace with your API response ─────────── */
const dummyTests = [
  {
    id: 1,
    chapterName: 'Introduction',
    questions: ['What is React?', 'Why JSX?', 'Virtual DOM?'],
  },
  {
    id: 2,
    chapterName: 'Getting Started',
    questions: [
      'Create-react-app steps?',
      'Folder structure?',
      'First component?',
      'Hot reload?',
    ],
  },
  {
    id: 3,
    chapterName: 'Advanced Topics',
    questions: [],
  },
];

const ITEMS_PER_PAGE = 6;

/* ───────────── Delete-confirmation modal ──────────── */
const DeleteModal = ({ onConfirm, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="max-w-sm rounded-lg border border-[#253466] bg-white p-6 text-center shadow-lg">
      <div className="mb-4 flex justify-center">
        <img src={popupImage} alt="popup" width={100} height={100} />
      </div>
      <h2 className="mb-2 text-lg font-semibold text-red-600">
        Confirm Deletion
      </h2>
      <p className="mb-6 text-sm text-gray-700">
        Delete this chapter? This action can’t be undone.
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onConfirm}
          className="rounded bg-[#253466] px-4 py-2 text-white hover:bg-[#1b264d]"
        >
          Delete
        </button>
        <button
          onClick={onClose}
          className="rounded border border-gray-300 px-4 py-2 hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
);

/* ───────────── Main component ──────────── */
const AllChapter = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get('courseId'); // ← current course id

  /* local state */
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  /* filter + pagination */
  const filteredChapters = useMemo(() => {
    if (!searchTerm.trim()) return dummyTests;
    return dummyTests.filter((c) =>
      (c.chapterName ?? '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim())
    );
  }, [searchTerm]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredChapters.length / ITEMS_PER_PAGE)
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedChapters = filteredChapters.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  /* handlers */
  const handleEditTest = (chapterId) =>
    navigate(
      `/admin-dashboard?activeSidebar=update-test&courseId=${courseId}&chapterId=${chapterId}`
    );

  const handleGoToLessons = (chapterId) =>
    navigate(
      `/admin-dashboard?activeSidebar=update-lesson&courseId=${courseId}&chapterId=${chapterId}`
    );

  const handleDelete = (chapterId) => {
    toast.success('Chapter deleted (dummy)');
    setShowDeletePopup(false);

    if (paginatedChapters.length === 1 && currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  };

  /* render */
  return (
    <div className="md:p-4">
      <div className="mb-2 flex flex-col justify-between gap-2 sm:flex-row">
        <p className="text-center text-[16px] font-semibold text-black sm:text-start md:text-[18px]">
          All Chapters
        </p>
        {courseId && (
          <span className="text-sm text-gray-600">
            <strong>Course&nbsp;ID:</strong>&nbsp;{courseId}
          </span>
        )}
      </div>
      <hr className="mb-4 opacity-10" />

      {/* search */}
      <div className="mb-4 max-w-full">
        <Input
          placeholder="Search chapter…"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md">
          <thead>
            <tr>
              {['No.', 'Chapter Name', 'All Questions', 'Edit', 'Delete'].map(
                (h) => (
                  <th
                    key={h}
                    className="text-nowrap border border-[#FFFFFF33] bg-[#253466] px-4 py-2 text-center text-sm font-semibold text-white"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {paginatedChapters.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center">
                  No chapters found
                </td>
              </tr>
            ) : (
              paginatedChapters.map((chapter, idx) => (
                <tr
                  key={chapter.id}
                  className="border-t text-center hover:bg-gray-50"
                >
                  <td className="border border-[#D7D7D7] px-4 py-2">
                    {startIndex + idx + 1}
                  </td>
                  <td className="border border-[#D7D7D7] px-4 py-2 text-left">
                    {chapter.chapterName}
                  </td>
                  <td className="border border-[#D7D7D7] px-4 py-2">
                    <button
                      onClick={() => handleGoToLessons(chapter.id)}
                      className="text-blue-600 hover:underline"
                    >
                      {chapter.questions.length}
                    </button>
                  </td>
                  <td className="border border-[#D7D7D7] px-4 py-2">
                    <button
                      onClick={() => handleEditTest(chapter.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border border-[#D7D7D7] px-4 py-2">
                    <button
                      onClick={() => {
                        setSelectedChapter(chapter);
                        setShowDeletePopup(true);
                      }}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      {filteredChapters.length > 0 && (
        <div className="mt-4 flex flex-col items-center">
          <div className="flex items-center gap-4">
            <Button
              transparentBtn="Previous"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            />
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`rounded px-3 py-1 ${
                  currentPage === page
                    ? 'bg-[#253466] text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {page}
              </button>
            ))}
            <Button
              transparentBtn="Next"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            />
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Showing {startIndex + 1}–
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredChapters.length)} of{' '}
            {filteredChapters.length} chapters
          </p>
        </div>
      )}

      {/* delete modal */}
      {showDeletePopup && (
        <DeleteModal
          onConfirm={() => handleDelete(selectedChapter.id)}
          onClose={() => setShowDeletePopup(false)}
        />
      )}
    </div>
  );
};

export default AllChapter;
