import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { DocumentContext } from '../../../contexts/document-context';
import { ToastContext } from '../../../contexts/toast-context';
import useAuth from '../../../hooks/use-auth';
import useRandomBackground from '../../../hooks/use-random-background';
import DocumentUserService from '../../../services/document-user-service';
import DocumentInterface from '../../../types/interfaces/document';
import DocumentUser from '../../../types/interfaces/document-user';

interface SharedUsersProps {
  documentUsers: Array<DocumentUser>;
  setDocument: Dispatch<SetStateAction<DocumentInterface | null>>;
}

const SharedUsers = ({ documentUsers, setDocument }: SharedUsersProps) => {
  const { backgroundColor } = useRandomBackground();
  const { backgroundColor: sharedUserBackgroundColor } = useRandomBackground();
  const { accessToken, email } = useAuth();
  const [loading, setLoading] = useState(false);
  const { addToast } = useContext(ToastContext);
  const { document } = useContext(DocumentContext);

  const removeDocumentUser = async (payload: {
    documentId: number;
    userId: number;
  }) => {
    if (!accessToken) return;

    setLoading(true);

    try {
      await DocumentUserService.delete(accessToken, payload);

      setDocument({
        ...document,
        users: document?.users.filter(
          (documentUser) => documentUser.userId !== payload.userId
        ) as Array<DocumentUser>,
      } as DocumentInterface);
    } catch {
      addToast({
        color: 'danger',
        title: 'Unable to remove user',
        body: 'Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="px-2 py-4 w-full flex items-center justify-between hover:bg-gray-100 rounded-md">
        <div className="flex items-center space-x-2">
          <div
            className={`${backgroundColor} w-8 h-8 flex justify-center items-center text-white uppercase rounded-full text-xl font-medium`}
          >
            {email !== null && email[0]}
          </div>
          <p className="font-medium">{email !== null && email} (you)</p>
        </div>
        <p className="text-gray-500 italic">Owner</p>
      </div>
      {documentUsers.map((documentUser) => {
        return (
          <div
            key={documentUser.user.email}
            className="px-2 py-4 w-full flex items-center justify-between hover:bg-gray-100 rounded-md"
          >
            <div className="flex items-center space-x-2">
              <div
                className={`${sharedUserBackgroundColor} w-8 h-8 flex justify-center items-center text-white uppercase rounded-full text-xl font-medium`}
              >
                {documentUser.user.email[0]}
              </div>
              <p className="font-medium">{documentUser.user.email}</p>
            </div>
            <button
              onClick={() =>
                removeDocumentUser({
                  documentId: documentUser.documentId,
                  userId: documentUser.userId,
                })
              }
              disabled={loading}
              className="font-semibold text-blue-600 p-2 hover:bg-blue-50 rounded-md"
            >
              Remove
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SharedUsers;
