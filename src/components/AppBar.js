import React from 'react'
import { Box, Heading, Button } from 'grommet';
import ShoppingCartButton from './ShoppingCartButton';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class AppBar extends React.Component {
  render() {
    const {
      isAuthenticated
    } = this.props
    return (
      <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{
          left: 'medium',
          right: 'medium',
          vertical: 'small'
        }}
        elevation='medium'
        style={{ zIndex: '1' }}
      >
        <Heading
          level="4"
          margin="xsmall"
        >
          Devincube store
        </Heading>
        <Box style={{width:300, }} direction="row">
          <ShoppingCartButton />
          {
            !isAuthenticated ?
            <Button label="Login" onClick={() => this.props.login()}/>:
            <Button label="Logout" onClick={() => this.props.logout()}/>
          }
          {
            isAuthenticated && <Button label="My profile" onClick={() => this.props.history.push('/profile')}/>
          }
        </Box>
      </Box>
    )
  }
}
const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated
  }
}
const mapDispatchToProps = dispatch => {
  return {
    login: dispatch.user.login,
    logout: dispatch.user.logout
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AppBar))
