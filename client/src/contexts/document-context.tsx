import { createContext, SetStateAction, useState, Dispatch } from 'react';
import DocumentInterface from '../types/interfaces/document';

interface DocumentContextInterface {
  document: DocumentInterface | null;
  setDocument: Dispatch<SetStateAction<DocumentInterface | null>>;
  errors: Array<string>;
  setErrors: Dispatch<SetStateAction<Array<string>>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  saving: boolean;
  setSaving: Dispatch<SetStateAction<boolean>>;
  currentUsers: Set<string>;
  setCurrentUsers: Dispatch<SetStateAction<Set<string>>>;
}

const defaultValues = {
  document: null,
  setDocument: () => {},
  errors: [],
  setErrors: () => {},
  loading: false,
  setLoading: () => {},
  saving: false,
  setSaving: () => {},
  currentUsers: new Set<string>(),
  setCurrentUsers: () => {},
};

export const DocumentContext =
  createContext<DocumentContextInterface>(defaultValues);

interface DocumentProviderInterface {
  children: JSX.Element;
}

export const DocumentProvider = ({ children }: DocumentProviderInterface) => {
  const [document, setDocument] = useState<null | DocumentInterface>(
    defaultValues.document
  );
  const [errors, setErrors] = useState<Array<string>>(defaultValues.errors);
  const [loading, setLoading] = useState(defaultValues.loading);
  const [saving, setSaving] = useState(defaultValues.saving);
  const [currentUsers, setCurrentUsers] = useState(defaultValues.currentUsers);

  return (
    <DocumentContext.Provider
      value={{
        document,
        setDocument,
        errors,
        setErrors,
        loading,
        setLoading,
        saving,
        setSaving,
        currentUsers,
        setCurrentUsers,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};
