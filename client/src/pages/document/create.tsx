import DocumentCreateHeader from '../../components/organisms/document-create-header';
import useWindowSize from '../../hooks/useWindowSize';
import { PlusIcon } from '@heroicons/react/outline';

const Create = () => {
  const { heightStr } = useWindowSize();

  return (
    <div style={{ height: heightStr }}>
      <DocumentCreateHeader />
      <div className="w-full h-80 bg-gray-100 flex justify-center items-center font-medium text-gray-700 px-4 overflow-hidden">
        <div className="w-full h-full max-w-3xl py-4 space-y-4 overflow-auto">
          <h1>Start a new document</h1>
          <div className="flex items-center">
            <div className="space-y-2">
              <button className="h-52 w-40 bg-white border hover:border-blue-500 flex items-center justify-center">
                <PlusIcon className="w-16 h-16 text-red-500" />
              </button>
              <h3 className="text-sm">Blank</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center items-center font-medium text-gray-700 p-4">
        <div className="w-full max-w-3xl">
          <h2>Recent Documents</h2>
        </div>
      </div>
    </div>
  );
};

export default Create;
