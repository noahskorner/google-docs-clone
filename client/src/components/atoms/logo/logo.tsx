import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link
      to="/document/create"
      className="flex flex-shrink-0 justify-center items-center w-14 h-14 hover:bg-gray-100 rounded-full"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-white"
        fill="#3b82f6"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </Link>
  );
};

export default Logo;
