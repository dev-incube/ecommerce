import React, { Component } from 'react'
import request from '../utils/request'
import omise from '../utils/omise'
import { Form, FormField, Button } from 'grommet';
import CreditCardInput from 'react-credit-card-input';

const paymentServiceURL = process.env.REACT_APP_PAYMENT_SERVICE_URL || 'https://devincubez.localtunnel.me'
export default class PaymentForm extends Component {
  state = {
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
    city: '',
    postal: ''
  }
  handleChange = (field) => (e) => {
    this.setState({
      [field]: e.target.value
    })
  }
  onChangeValue = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  handleSubmit = async () => {
    const {
      name,
      postal,
      cvc,
      city,
      cardNumber,
      expiry,
    } = this.state;
    const exp = expiry.replace(/ /g, '').split('/')
    const result = await new Promise((resolve, reject) => {
      omise.createToken('card', {
        name,
        postal_code: postal,
        security_code: cvc,
        city,
        number: cardNumber.replace(/ /g, ''),
        expiration_month: exp[0],
        expiration_year: `20${exp[1]}`
      }, (statusCode, response) => {
        if (statusCode === 200) {
          resolve(response)
        } else {
          reject(response.message)
        }
      })
    })
    debugger
    const cardToken = result.id
    const {
      orderId
    } = this.props;
    const paymentResult = await request.post(`${paymentServiceURL}/moltinPayment/${orderId}`, {
      card: cardToken
    })
    debugger
  }
  render() {
    const {
      cardNumber,
      expiry,
      cvc
    } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormField label="Card">
          <CreditCardInput
            cardNumberInputProps={{ value: cardNumber, onChange: this.handleChange('cardNumber') }}
            cardExpiryInputProps={{ value: expiry, onChange: this.handleChange('expiry') }}
            cardCVCInputProps={{ value: cvc, onChange: this.handleChange('cvc') }}
            fieldClassName="input"
          />
        </FormField>
        <FormField name="name" label="Name" onChange={this.onChangeValue} />
        <FormField name="city" label="City" onChange={this.onChangeValue} />
        <FormField name="postal" label="Postal" onChange={this.onChangeValue} />
        <Button type="submit" label="Paynow" />
      </Form>
    )
  }
}
