import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '../contexts/toast-context';
import DocumentService from '../services/document-service';
import DocumentInterface from '../types/interfaces/document';
import useAuth from './use-auth';

const useDocuments = () => {
  const { accessToken } = useAuth();
  const [documents, setDocuments] = useState<Array<DocumentInterface>>([]);
  const [loading, setLoading] = useState(false);
  const { error } = useContext(ToastContext);

  const loadDocuments = async (accessToken: string) => {
    setLoading(true);

    try {
      const response = await DocumentService.list(accessToken);
      setDocuments(response.data as Array<DocumentInterface>);
    } catch (err) {
      error('Unable to load documents. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (accessToken === null) return;

    loadDocuments(accessToken);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  return {
    documents,
    loading,
    setDocuments,
    setLoading,
  };
};

export default useDocuments;
