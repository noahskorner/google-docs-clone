import { createContext, useState } from 'react';
import DocumentInterface from '../types/interfaces/document';

interface DocumentContextInterface {
  document: null | DocumentInterface;
  setDocument: Function;
  currentUsers: Set<string>;
  setCurrentUsers: Function;
}

export const DocumentContext = createContext<DocumentContextInterface | null>(
  null
);

interface DocumentProviderInterface {
  children: JSX.Element;
}

export const DocumentProvider = ({ children }: DocumentProviderInterface) => {
  const [document, setDocument] = useState<null | DocumentInterface>(null);
  const [currentUsers, setCurrentUsers] = useState(new Set<string>());

  return (
    <DocumentContext.Provider
      value={{
        document,
        setDocument,
        currentUsers,
        setCurrentUsers,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};
