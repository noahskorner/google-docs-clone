import Modal from '../../atoms/modal';
import { UserAddIcon, LinkIcon } from '@heroicons/react/outline';
import {
  useContext,
  useRef,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import DocumentInterface from '../../../types/interfaces/document';
import Spinner from '../../atoms/spinner';
import validator from 'validator';
import PermissionEnum from '../../../types/enums/permission-enum';
import SharedUsers from '../shared-users';
import { DocumentContext } from '../../../contexts/document-context';
import useAuth from '../../../hooks/use-auth';
import { ToastContext } from '../../../contexts/toast-context';
import DocumentUserService from '../../../services/document-user-service';

const ShareDocumentModal = () => {
  const { document, saving, saveDocument, setDocument } =
    useContext(DocumentContext);
  const copyLinkInputRef = useRef<null | HTMLInputElement>(null);
  const [email, setEmail] = useState<null | string>(null);
  const { accessToken } = useAuth();
  const { success, error } = useContext(ToastContext);
  const [loading, setLoading] = useState(false);

  const shareDocument = async () => {
    if (
      email === null ||
      !validator.isEmail(email) ||
      accessToken === null ||
      document === null
    )
      return;

    const payload = {
      documentId: document.id,
      email: email,
      permission: PermissionEnum.EDIT,
    };

    setLoading(true);

    try {
      await DocumentUserService.create(accessToken, payload);
      success(`Successfully shared document with ${email}!`);

      setDocument({
        ...document,
        users: [
          ...document.users,
          {
            permission: PermissionEnum.EDIT,
            documentId: document.id,
            user: {
              email,
            },
          },
        ],
      } as DocumentInterface);
      setEmail('');
    } catch (err) {
      error(`Unable to share this document with ${email}. Please try again`);
    } finally {
      setLoading(false);
    }
  };

  const handleShareEmailInputChange = (event: ChangeEvent) => {
    setEmail((event.target as HTMLInputElement).value);
  };

  const handleCopyLinkBtnClick = () => {
    if (copyLinkInputRef === null || copyLinkInputRef.current === null) return;

    const url = window.location.href;
    copyLinkInputRef.current.value = url;
    copyLinkInputRef.current.focus();
    copyLinkInputRef.current.select();
    window.document.execCommand('copy');
  };

  const handleOnKeyPress = async (event: KeyboardEvent) => {
    if (event.key === 'Enter') await shareDocument();
  };

  const handleShareBtnClick = async () => {
    await shareDocument();
  };

  const updateIsPublic = (isPublic: boolean) => {
    const updatedDocument = {
      ...document,
      isPublic: isPublic,
    } as DocumentInterface;

    saveDocument(updatedDocument);
  };

  const restrictedAccessBtn = (
    <div className="space-y-1">
      <button
        disabled={saving}
        onClick={() => updateIsPublic(true)}
        className="font-semibold text-blue-600 p-2 hover:bg-blue-50 rounded-md"
      >
        {saving && <Spinner size="sm" />}
        <span className={`${saving && 'opacity-0'}`}>
          Change to anyone with the link
        </span>
      </button>
      <p className="mx-2">
        <b className="font-semibold">Restricted</b>&nbsp;
        <span className="text-gray-600">
          Only people added can open with this link
        </span>
      </p>
    </div>
  );

  const publicAccessBtn = (
    <div className="space-y-1">
      <button
        disabled={saving}
        onClick={() => updateIsPublic(false)}
        className="font-semibold text-blue-600 p-2 hover:bg-blue-50 rounded-md"
      >
        {saving && <Spinner size="sm" />}
        <span className={`${saving && 'opacity-0'}`}>
          Change to only shared users
        </span>
      </button>
      <p className="mx-2">
        <b className="font-semibold">Public</b>&nbsp;
        <span className="text-gray-600">Anyone with this link can view</span>
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
        document === null ? (
          <></>
        ) : (
          <div
            onKeyPress={(event) => handleOnKeyPress(event)}
            className="space-y-4 text-sm"
          >
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
                className="border-b border-blue-500 rounded-t-md p-4 w-full bg-gray-100  font-medium"
              />
              <SharedUsers documentUsers={document.users} />
              <div className="w-full flex justify-end space-x-2">
                <button
                  onClick={handleShareBtnClick}
                  className={`${
                    email === null || !validator.isEmail(email)
                      ? 'btn-disabled'
                      : 'btn-primary'
                  } px-6`}
                >
                  {loading && <Spinner size="sm" />}
                  <span className={`${loading && 'opacity-0'}`}>Share</span>
                </button>
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
                    onClick={handleCopyLinkBtnClick}
                    className="font-semibold text-blue-600 p-2 hover:bg-blue-50 rounded-md"
                  >
                    Copy link
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    />
  );
};

export default ShareDocumentModal;
