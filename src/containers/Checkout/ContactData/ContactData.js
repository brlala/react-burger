import { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false,
  };

  orderHandler = () => {
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Henry',
        address: {
          street: 'Test1',
          zipCode: '12345',
          country: 'Germany',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    };
    axios
      .post('/orders.json', order)
      .then((response) => {
        this.setState({ loading: false });
        console.log(response);
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ loading: false });
        console.log(error);
      });
    console.log(this.props.ingredients);
  };

  render() {
    let form = (
      <form>
        <Input
          type="text"
          name="name"
          inputtype="input"
          placeholder="Your name"
        />
        <Input
          type="email"
          name="email"
          inputtype="input"
          placeholder="Your email"
        />
        <Input
          type="text"
          name="street"
          inputtype="input"
          placeholder="Street"
        />
        <Input
          type="text"
          name="postal"
          inputtype="input"
          placeholder="Postal Code"
        />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
