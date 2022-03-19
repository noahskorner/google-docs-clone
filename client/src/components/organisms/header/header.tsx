import { MutableRefObject } from 'react';

interface HeaderProps {
  headerRef: MutableRefObject<null | HTMLDivElement>;
}

const Header = ({ headerRef }: HeaderProps) => {
  return (
    <div
      ref={headerRef}
      className="border-b w-full bg-white py-1 px-3 flex justify-between items-center"
    >
      {/* Left */}
      <div className="flex justify-center items-center">
        <button className="flex justify-center items-center w-14 h-14 hover:bg-gray-100 rounded-full">
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
        </button>
        <div className="flex flex-col">
          <h1 className="text-gray-500 font-medium text-lg px-2">
            Untitled Document
          </h1>
          <div className="flex">
            <button className="text-sm px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              File
            </button>
            <button className="text-sm px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Edit
            </button>
            <button className="text-sm px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              View
            </button>
            <button className="text-sm px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Insert
            </button>
            <button className="text-sm px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Format
            </button>
            <button className="text-sm px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Tools
            </button>
            <button className="text-sm px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Add-ons
            </button>
            <button className="text-sm px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Help
            </button>
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="space-x-4 flex items-center">
        <button className="bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded hover:bg-blue-500 flex justify-center items-center space-x-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
              clipRule="evenodd"
            />
          </svg>
          <span>Share</span>
        </button>
        <button className="w-8 h-8 bg-green-800 text-white font-semibold flex justify-center items-center rounded-full hover:ring-2">
          N
        </button>
      </div>
    </div>
  );
};

export default Header;
