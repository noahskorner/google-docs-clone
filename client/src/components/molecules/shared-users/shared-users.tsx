import { useContext } from 'react';
import { AuthContext } from '../../../contexts/auth-context';
import DocumentUser from '../../../types/interfaces/document-user';

interface SharedUsersProps {
  documentUsers: Array<DocumentUser>;
}

const SharedUsers = ({ documentUsers }: SharedUsersProps) => {
  const authContext = useContext(AuthContext);

  return (
    <div>
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
      {documentUsers.map((documentUser) => {
        return (
          <div
            key={documentUser.user.email}
            className="px-2 py-4 w-full flex items-center justify-between hover:bg-gray-100 rounded-md"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex justify-center items-center text-white bg-teal-500 uppercase rounded-full text-xl font-medium">
                {documentUser.user.email[0]}
              </div>
              <p className="font-medium">{documentUser.user.email}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SharedUsers;
