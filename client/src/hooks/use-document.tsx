import axios, { AxiosError } from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/auth-context';
import API from '../services/api';
import DocumentInterface from '../types/interfaces/document';

const useDocument = () => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

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

  const loadDocument = async (id: number, callback: Function) => {
    if (!authContext?.accessToken) return;

    setLoading(true);

    try {
      const response = await API.getDocument(authContext?.accessToken, id);
      const document = response.data as DocumentInterface;
      callback(null, document);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const { response } = error as AxiosError;
        if (response?.status === 404) {
          callback('Document does not exist.');
        } else {
          callback('An unknown error has occured. Please try again.');
        }
      } else {
        callback('An unknown error has occured. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const loadAllDocuments = async (callback: Function) => {
    if (!authContext?.accessToken) return;

    setLoading(true);

    try {
      const response = await API.getAllDocuments(authContext?.accessToken);
      const documents = response.data as DocumentInterface[];
      callback(null, documents);
    } catch (error: any) {
      callback('An unknown error has occurred. Please try again.', null);
    } finally {
      setLoading(false);
    }
  };

  const saveDocument = async (
    document: DocumentInterface,
    callback: Function
  ) => {
    if (!authContext?.accessToken) return;

    setSaving(true);
    try {
      await API.updateDocument(authContext?.accessToken, {
        id: document.id,
        title: document.title,
        content: document.content,
        isPublic: document.isPublic,
      });
      callback(null);
    } catch (error: any) {
      callback('An unknown error has occurred. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const removeDocument = async (id: number, callback: Function) => {
    if (!authContext?.accessToken) return;

    setLoading(true);
    try {
      await API.removeDocument(authContext?.accessToken, id);
      callback(null);
    } catch (error: any) {
      callback('An unknown error has occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    saving,
    createDocument,
    loadDocument,
    loadAllDocuments,
    saveDocument,
    removeDocument,
  };
};

export default useDocument;
