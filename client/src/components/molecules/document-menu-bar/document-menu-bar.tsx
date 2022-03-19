import Logo from '../../atoms/logo';

const DocumentMenuBar = () => {
  return (
    <div className="w-full flex justify-between items-center px-3 pb-1 border-b overflow-hidden">
      {/* Left */}
      <div className="w-full flex justify-start items-center overflow-x-scroll scrollbar-hidden">
        <button className="flex justify-center items-center w-14 h-14 hover:bg-gray-100 rounded-full">
          <Logo />
        </button>
        <div className="flex flex-col">
          <h1 className="text-gray-500 font-medium text-lg px-2 pt-2">
            Untitled Document
          </h1>
          <div className="flex">
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              File
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Edit
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              View
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Insert
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Format
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Tools
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Add-ons
            </button>
            <button className="text-sm whitespace-nowrap px-2 py-1 font-medium hover:bg-gray-100 rounded-md">
              Help
            </button>
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="space-x-4 flex items-center flex-shrink-0 pl-3">
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

export default DocumentMenuBar;
