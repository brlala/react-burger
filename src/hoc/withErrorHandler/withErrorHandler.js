import { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use((req) => {
      setError(null);
      return req;
    });

    const resInterceptor = axios.interceptors.response.use(
      (res) => res,
      (err) => setError(err)
    );

    useEffect(() => {
      return () => {
        // prevent memory leak when lots of instance is created
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.request.eject(resInterceptor);
      };
    }, []);

    const errorConfirmedHandler = () => {
      setError(null);
    };

    return (
      <>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error?.message}
        </Modal>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
