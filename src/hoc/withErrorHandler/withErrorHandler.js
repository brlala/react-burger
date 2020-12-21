import { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    };

    // global error handlers
    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error });
        }
      );
    }

    componentWillUnmount() {
      // prevent memory leak when lots of instance is created
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.request.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <>
          <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
            {this.state.error?.message}
          </Modal>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;
