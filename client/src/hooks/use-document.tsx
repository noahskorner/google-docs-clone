import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth-context';
import API from '../services/api';
import DocumentInterface from '../types/document';

const useDocument = () => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const createDocument = async (callback: Function) => {
    if (!authContext?.accessToken) return;

    setLoading(true);
    try {
      const response = await API.createDocument(authContext.accessToken);
      const document = response.data as DocumentInterface;
      callback(null, document);
    } catch (error: any) {
      callback('An unknown error has occurred. Please try again.', null);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createDocument,
  };
};

export default useDocument;
