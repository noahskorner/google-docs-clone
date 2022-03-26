import { createContext, useState } from 'react';

interface DocumentContextInterface {
  currentUsers: Set<string>;
  setCurrentUsers: Function;
  addCurrentUser: Function;
  removeCurrentUser: Function;
}

export const DocumentContext = createContext<DocumentContextInterface | null>(
  null
);

interface DocumentProviderInterface {
  children: JSX.Element;
}

export const DocumentProvider = ({ children }: DocumentProviderInterface) => {
  const [currentUsers, setCurrentUsers] = useState(new Set<string>());

  const addCurrentUser = (user: string) => {
    setCurrentUsers((prev: Set<string>) => new Set(prev.add(user)));
  };

  const removeCurrentUser = (user: string) => {
    setCurrentUsers((prev) => {
      const prevArr = Array.from(prev);
      return new Set(prevArr.filter((currentUser) => currentUser !== user));
    });
  };

  return (
    <DocumentContext.Provider
      value={{
        currentUsers,
        setCurrentUsers,
        addCurrentUser,
        removeCurrentUser,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};
