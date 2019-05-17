/* eslint-disable no-restricted-globals */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Box } from 'grommet'
import CartItemList from '../components/CartItemList'
import CheckoutForm from '../components/CheckoutForm'
import PaymentModal from '../components/PaymentModal'

class CheckoutPage extends Component {
  state = {
    showModal: false
  }

  componentDidMount() {
    this.props.getCartItems()
  }

  onSubmit = async (data) => {
    const {
      checkout,
      history
    } = this.props;
    const ans = confirm('Are you sure ?')
    // history.push('/payment')
    if (ans) {
      // request checkout api (moltin)
      console.log('checking out')
      const result = await checkout(data)
      console.log('checkout success')
      history.push(`/order/${result.id}`)
    }
  }

  render() {
    const { showModal } = this.state
    return (
      <Box
        direction="row"
        pad="small"
        margin="small"
      >
        <Box width="medium">
          <CartItemList />
        </Box>
        <Box flex>
          <CheckoutForm onSubmit={this.onSubmit} />
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutPage)
