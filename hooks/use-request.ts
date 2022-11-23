import { useCallback, useState } from 'react';
import { IRequest } from '../interfaces/Request';

const useRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async(requestConfig: IRequest, applyData: (data: any) => {}) => {
    try {
      setIsLoading(true);
      setError(null);

      const { url, body, headers, method } = requestConfig;

      const response = await fetch(url, {
        method: method ? method : 'GET',
        headers: headers ? headers: {},
        body: body ? body : null
      });

      if(!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();
      applyData(data);
      
    }catch(err: any) {
      setError(err.message || 'Something went wrong')
    }

    setIsLoading(false);
  }, []);

  return {
    isLoading,
    error,
    sendRequest
  };
};

export default useRequest;
