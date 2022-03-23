import Modal from '../../atoms/modal';
import { UserAddIcon, LinkIcon } from '@heroicons/react/outline';

const ShareDocumentModal = () => {
  return (
    <Modal
      button={
        <button className="btn-primary">
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
      }
      content={
        <div className="space-y-4 text-sm">
          <div className="rounded-md bg-white shadow-xl p-6 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-500 flex justify-center items-center rounded-full text-white">
                <UserAddIcon className="w-5 h-5 relative" />
              </div>
              <h1 className="text-xl font-medium">Share with people</h1>
            </div>
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter email"
              className="p-4 w-full bg-gray-100 border-b border-blue-500 rounded-t-md font-medium"
            />
            <div className="w-full flex justify-end">
              <button className="btn-primary px-6">Done</button>
            </div>
          </div>
          <div className="rounded-md bg-white shadow-xl p-6 space-y-4 flex flex-col">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-400 flex justify-center items-center rounded-full text-white">
                <LinkIcon className="w-5 h-5 relative" />
              </div>
              <h1 className="text-xl font-medium">Get Link</h1>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p>
                    <b className="font-semibold">Restricted</b>{' '}
                    <span className="text-gray-600">
                      Only people added can open with this link
                    </span>
                  </p>
                  <button className="font-semibold text-blue-600 py-2 hover:bg-blue-50">
                    Change to anyone with the link
                  </button>
                </div>
                <button className="font-semibold text-blue-600 p-2 hover:bg-blue-50 rounded-md">
                  Copy link
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default ShareDocumentModal;
