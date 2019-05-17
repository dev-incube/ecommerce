import React, { Component } from 'react'
import CreditCardInput from 'react-credit-card-input'
import { withRouter } from 'react-router-dom'
import { Form, FormField, Button } from 'grommet'

import omise from '../utils/omise'
import request from '../utils/request'

const baseUrlApi = 'https://ak1103dev.localtunnel.me'

class PaymentForm extends Component {
  state = {
    cardNumber: '',
    expiry: '',
    cvc: '',
    name: '',
    city: '',
    postal: ''
  }

  handleChange = (key) => (event) => {
    this.setState({ [key]: event.target.value })
  }

  handleSubmit = async () => {
    const {
      cardNumber,
      expiry,
      cvc,
      name,
      city,
      postal,
    } = this.state

    const exp = expiry.split(' / ')
    const data = {
      name,
      postal_code: postal,
      security_code: cvc,
      city,
      number: cardNumber.replace(/ /g, ''),
      expiration_month: exp[0],
      expiration_year: exp[1]
    }
    try {
      const result = await new Promise((resolve, reject) => {
        omise.createToken('card', data, (statusCode, response) => {
          if (statusCode === 200) {
            resolve(response)
          } else {
            reject(new Error(response.message))
          }
        })
      })
      // console.log(result)
      const cardToken = result.id
      const { orderId } = this.props.match.params
      const paymentResult = await request.post(`${baseUrlApi}/moltinPayment/${orderId}`, {
        card: cardToken,
      })
      console.log(paymentResult)
    } catch(error) {
      console.error(error)
    }
  }

  render() {
    const { cardNumber, expiry, cvc } = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormField label="card">
          <CreditCardInput
            cardNumberInputProps={{ value: cardNumber, onChange: this.handleChange('cardNumber') }}
            cardExpiryInputProps={{ value: expiry, onChange: this.handleChange('expiry') }}
            cardCVCInputProps={{ value: cvc, onChange: this.handleChange('cvc') }}
            fieldClassName="input"
          />
        </FormField>
        <FormField name="name" label="Name" onChange={this.handleChange('name')} />
        <FormField name="city" label="City" onChange={this.handleChange('city')} />
        <FormField name="postal" label="Postal" onChange={this.handleChange('postal')} />
        <Button type="submit" label="Pay now" />
      </Form>
    )
  }
}

export default withRouter(PaymentForm)
