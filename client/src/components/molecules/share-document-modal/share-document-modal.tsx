import Modal from '../../atoms/modal';
import { UserAddIcon, LinkIcon } from '@heroicons/react/outline';
import { useContext, useRef, useState, ChangeEvent } from 'react';
import { AuthContext } from '../../../contexts/auth-context';
import DocumentInterface from '../../../types/interfaces/document';
import useDocument from '../../../hooks/use-document';
import { ToastContext } from '../../../contexts/toast-context';
import Spinner from '../../atoms/spinner';

interface ShareDocumentModalProps {
  document: DocumentInterface;
  setDocument: Function;
}

const ShareDocumentModal = ({
  document,
  setDocument,
}: ShareDocumentModalProps) => {
  const authContext = useContext(AuthContext);
  const toastContext = useContext(ToastContext);
  const { saving, saveDocument } = useDocument();
  const copyLinkInputRef = useRef<null | HTMLInputElement>(null);
  const [email, setEmail] = useState<null | string>(null);
  const [emailErrors, setEmailErrors] = useState<Array<string>>([]);

  const handleShareEmailInputChange = (event: ChangeEvent) => {
    setEmail((event.target as HTMLInputElement).value);
  };

  const handleShareLinkBtnClick = async () => {
    const updatedDocument = {
      ...document,
      isPublic: true,
    } as DocumentInterface;
    await saveDocument(updatedDocument, (error: string) => {
      if (error) {
        toastContext?.error('There was an error making this document public.');
      } else {
        setDocument(updatedDocument);
      }
    });
  };

  const handleRestrictLinkBtnClick = async () => {
    const updatedDocument = {
      ...document,
      isPublic: false,
    } as DocumentInterface;
    await saveDocument(updatedDocument, (error: string) => {
      if (error) {
        toastContext?.error(
          'There was an error making this document restricted.'
        );
      } else {
        setDocument(updatedDocument);
      }
    });
  };

  const handleCopyLinkBtnClick = () => {
    if (copyLinkInputRef === null || copyLinkInputRef.current === null) return;

    const url = window.location.href;
    copyLinkInputRef.current.value = url;
    copyLinkInputRef.current.focus();
    copyLinkInputRef.current.select();
    window.document.execCommand('copy');
  };

  const publicAccessBtn = (
    <div className="space-y-1">
      <button
        disabled={saving}
        onClick={() => handleRestrictLinkBtnClick()}
        className="font-semibold text-blue-600 p-2 hover:bg-blue-50 rounded-md"
      >
        {saving && <Spinner size="sm" />}
        <span className={`${saving && 'opacity-0'}`}>
          Change to only shared users
        </span>
      </button>{' '}
      <p className="mx-2">
        <b className="font-semibold">Public</b>&nbsp;
        <span className="text-gray-600">Anyone with this link can view</span>
      </p>
    </div>
  );

  const restrictedAccessBtn = (
    <div className="space-y-1">
      <button
        disabled={saving}
        onClick={() => handleShareLinkBtnClick()}
        className="font-semibold text-blue-600 p-2 hover:bg-blue-50 rounded-md"
      >
        {saving && <Spinner size="sm" />}
        <span className={`${saving && 'opacity-0'}`}>
          Change to anyone with the link
        </span>
      </button>{' '}
      <p className="mx-2">
        <b className="font-semibold">Restricted</b>&nbsp;
        <span className="text-gray-600">
          Only people added can open with this link
        </span>
      </p>
    </div>
  );

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
          <div className="rounded-md bg-white shadow-xl p-4 space-y-4">
            <div className="flex items-center space-x-2 m-2">
              <div className="w-8 h-8 bg-blue-500 flex justify-center items-center rounded-full text-white">
                <UserAddIcon className="w-5 h-5 relative" />
              </div>
              <h1 className="text-xl font-medium">Share with people</h1>
            </div>
            <input
              type="text"
              name=""
              id=""
              value={email !== null ? email : ''}
              onChange={handleShareEmailInputChange}
              placeholder="Enter email"
              className={`${
                emailErrors.length > 0
                  ? 'border border-red-500 rounded-md'
                  : 'border-b border-blue-500 rounded-t-md'
              } p-4 w-full bg-gray-100  font-medium`}
            />
            <div className="px-2 py-4 w-full flex items-center justify-between hover:bg-gray-100 rounded-md">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 flex justify-center items-center text-white bg-green-800 uppercase rounded-full text-xl font-medium">
                  {authContext?.email && authContext?.email[0]}
                </div>
                <p className="font-medium">
                  {authContext?.email && authContext?.email} (you)
                </p>
              </div>
              <p className="text-gray-500 italic">Owner</p>
            </div>
            <div className="w-full flex justify-end">
              <button className="btn-primary px-6">Done</button>
            </div>
          </div>
          <div className="rounded-md bg-white shadow-xl p-4 space-y-4 flex flex-col">
            <div className="m-2 flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-400 flex justify-center items-center rounded-full text-white">
                <LinkIcon className="w-5 h-5 relative" />
              </div>
              <h1 className="text-xl font-medium">Get Link</h1>
            </div>
            <div>
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  {document.isPublic ? publicAccessBtn : restrictedAccessBtn}
                </div>
                <input
                  ref={copyLinkInputRef}
                  type="text"
                  className="d-none opacity-0 cursor-default"
                />
                <button
                  onClick={() => handleCopyLinkBtnClick()}
                  className="font-semibold text-blue-600 p-2 hover:bg-blue-50 rounded-md active:ring-1 active:ring-blue-500"
                >
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
