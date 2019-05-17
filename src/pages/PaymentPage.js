import React, { Component } from 'react'
import { Box } from 'grommet'
import PaymentForm from '../components/PaymentForm';

class PaymentPage extends Component {
  render() {
    return (
      <Box pad="large">
        <PaymentForm />
      </Box>
    )
  }
}

export default PaymentPage
