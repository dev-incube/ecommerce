import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { DropButton, Box, Stack, Button } from 'grommet';
import { Shop } from 'grommet-icons'
import { connect } from 'react-redux';
import CartItemList from './CartItemList';
class ShoppingCartButton extends Component {
  render() {
    const {
      cartLength
    } = this.props;
    return (
      <DropButton
        dropAlign={{
          top: 'bottom',
          right: 'right'
        }}
        dropContent={
          <Box>
            <CartItemList />
            {
              cartLength > 0 &&
              <Box pad="medium">
                <Button primary label="Checkout" onClick={() => this.props.history.push('/checkout')} />
              </Box>
            }
          </Box>
        }
      >
        <Stack
          anchor="top-right"
        >
          <Box pad='xsmall'>
            <Shop size="32px"/>
          </Box>
          <Box
            background="accent-1"
            pad={{horizontal: 'xsmall'}}
            round
          >
            {cartLength}
          </Box>
        </Stack>
      </DropButton>
    )
  }
}
const mapStateToProps = state => {
  return {
    cartLength: state.cart.cartItems.length
  }
}
export default connect(mapStateToProps)(withRouter(ShoppingCartButton))