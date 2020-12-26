import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, clearError] = useHttpErrorHandler(axios);
    console.log(error);
    return (
      <>
        <Modal show={error} modalClosed={clearError}>
          {error?.message}
        </Modal>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withErrorHandler;
