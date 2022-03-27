import useAuth from '../../../hooks/use-auth';
import useRandomBackground from '../../../hooks/use-random-background';
import DocumentUser from '../../../types/interfaces/document-user';

interface SharedUsersProps {
  documentUsers: Array<DocumentUser>;
}

const SharedUsers = ({ documentUsers }: SharedUsersProps) => {
  const { backgroundColor } = useRandomBackground();
  const { backgroundColor: sharedUserBackgroundColor } = useRandomBackground();
  const { email } = useAuth();

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
          </div>
        );
      })}
    </div>
  );
};

export default SharedUsers;
