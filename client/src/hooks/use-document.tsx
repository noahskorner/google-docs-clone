import axios, { AxiosError } from 'axios';
import { useContext, useEffect } from 'react';
import { DocumentContext } from '../contexts/document-context';
import DocumentService from '../services/document-service';
import DocumentInterface from '../types/interfaces/document';
import useAuth from './use-auth';

const useDocument = () => {
  const { accessToken } = useAuth();
  const {
    document,
    setDocument,
    loading,
    setLoading,
    saving,
    setSaving,
    errors,
    setErrors,
    currentUsers,
    setCurrentUsers,
  } = useContext(DocumentContext);

  const loadDocument = async (accessToken: string, documentId: number) => {
    setLoading(true);

    try {
      const response = await DocumentService.get(accessToken, documentId);
      setDocument(response.data as DocumentInterface);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const { response } = error as AxiosError;
        if (response?.status === 404) {
          setErrors((prev) => [...prev, 'Document does not exist.']);
        } else {
          setErrors((prev) => [
            ...prev,
            'An unknown error has occured. Please try again.',
          ]);
        }
      } else {
        setErrors((prev) => [
          ...prev,
          'An unknown error has occured. Please try again.',
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  const saveDocument = async () => {
    if (accessToken === null || document === null) return;

    setSaving(true);

    try {
      await DocumentService.update(accessToken, document);
    } catch (error: any) {
      setErrors((prev) => [
        ...prev,
        'An unknown error has occurred. Please try again.',
      ]);
    } finally {
      setSaving(false);
    }
  };

  // const shareDocument = async (
  //   id: number,
  //   email: string,
  //   callback: (error: null | string) => void
  // ) => {
  //   if (!authContext?.accessToken) return;

  //   setLoading(true);
  //   try {
  //     await API.createDocumentUser(authContext?.accessToken, {
  //       id,
  //       email,
  //       permission: PermissionEnum.EDIT,
  //     });
  //     callback(null);
  //   } catch (error: any) {
  //     if (axios.isAxiosError(error)) {
  //       const { response } = error as AxiosError;
  //       if (response?.status === 401) {
  //         callback(response?.data?.errors?.[0].msg);
  //       } else {
  //         callback('An unknown error has occured. Please try again.');
  //       }
  //     } else {
  //       callback('An unknown error has occured. Please try again.');
  //     }
  //   } finally {
  //     setLoading(false);
  //   }

  //   return;
  // };

  const setDocumentTitle = (title: string) => {
    setDocument({ ...document, title } as DocumentInterface);
  };

  return {
    document,
    loading,
    errors,
    saving,
    currentUsers,
    loadDocument,
    saveDocument,
    setDocument,
    setDocumentTitle,
    setCurrentUsers,
    setSaving,
  };
};

export default useDocument;
