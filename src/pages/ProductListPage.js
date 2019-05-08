import React, { Component } from 'react'
import { Box, TextInput } from 'grommet'
import ProductList from '../components/ProductList'

class ProductListPage extends Component {
  state = {
    query: ''
  }

  render() {
    return (
      <Box
        direction="row"
        pad="medium"
        fill
      >
        <Box width="medium">
          <TextInput onChange={(e) => this.setState({query: e.target.value})}/>
        </Box>
        <Box flex>
          <ProductList search={this.state.query}/>
        </Box>
      </Box>
    )
  }
}

export default ProductListPage
