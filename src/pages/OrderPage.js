/* eslint-disable no-restricted-globals */
// omise user (for testing purpose)
// email devincube@yopmail.com
// password Devincube123!
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Box } from 'grommet'
import PaymentForm from '../components/PaymentForm';

class OrderPage extends Component {
  
  render() {
    const {
      match
    } = this.props;
    const {
      orderId,
    } = match.params
    return (
      <Box
        direction="row"
        pad="small"
        margin="small"
      >
        <Box flex align="center">
          <Box style={{width: '100%', maxWidth: 360}}>
            <PaymentForm orderId={orderId} />
          </Box>
        </Box>
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems
})

const mapDispatchToProps = (dispatch) => ({
  getCartItems: dispatch.cart.getCartItemsAsync,
  checkout: dispatch.cart.checkoutAsync,
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)
