import Button from '../../common/Button'

export default function CourseCard({
  course,
  handleToggleStatus,
  handleDelete,
  isDeleting,
}) {
  return (
    <div
      key={course.id ?? course._id}
      className="shadow-md flex flex-col justify-between rounded-lg bg-white p-4"
    >
      <div>
        <img
          src={course?.file?.url}
          alt={course.name}
          className="h-40 w-full rounded-md object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'
          }}
        />
        <div className="flex items-center justify-between pt-2.5">
          <h3 className="text-lg mt-3 font-semibold">{course.name}</h3>
          <button
            className={`h-[30px] rounded-2xl px-2.5 text-[12px] transition-all duration-300 ease-in-out ${
              course.status === 'Enable'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
            onClick={() =>
              handleToggleStatus(course.id ?? course._id, course.status)
            }
          >
            {course.status}
          </button>
        </div>
        <p className="text-gray-600 text-sm font-medium">{course.category}</p>
        <p className="text-gray-500 mt-2 line-clamp-3 text-sm">
          {course.description}
        </p>
      </div>
      <div className="mt-4 flex gap-5">
        <a
          href={`/admin-dashboard?activeSidebar=update-course&id=${course.id ?? course._id}`}
        >
          <Button bgBtn="Edit" />
        </a>
        <button
          className="rounded border border-orange-red bg-white px-4 py-2 text-orange-red transition-all duration-300 hover:bg-orange-red hover:text-white"
          onClick={() => handleDelete(course)}
          disabled={isDeleting}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
