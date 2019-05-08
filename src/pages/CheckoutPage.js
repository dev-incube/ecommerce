import React, { Component } from 'react'
import { Box, Form, Button, FormField, Heading } from 'grommet'
import ProductCard from '../components/ProductCard'

const cartItemObj = {
  "data": [
      {
          "id": "615f2170-d78d-450c-ba75-2e206357aa95",
          "type": "cart_item",
          "product_id": "992504ab-28ad-42a2-a37d-ff860e5113c9",
          "name": "A Product",
          "description": "Some description",
          "sku": "not-SP01-{COLOUR}-new",
          "image": {
              "mime_type": "",
              "file_name": "",
              "href": ""
          },
          "quantity": 2,
          "manage_stock": false,
          "unit_price": {
              "amount": 120000,
              "currency": "USD",
              "includes_tax": true
          },
          "value": {
              "amount": 240000,
              "currency": "USD",
              "includes_tax": true
          },
          "links": {
              "product": "https://api.moltin.com/v2/products/992504ab-28ad-42a2-a37d-ff860e5113c9"
          },
          "meta": {
              "display_price": {
                  "with_tax": {
                      "unit": {
                          "amount": 120000,
                          "currency": "USD",
                          "formatted": "$1200.00"
                      },
                      "value": {
                          "amount": 240000,
                          "currency": "USD",
                          "formatted": "$2400.00"
                      }
                  },
                  "without_tax": {
                      "unit": {
                          "amount": 120000,
                          "currency": "USD",
                          "formatted": "$1200.00"
                      },
                      "value": {
                          "amount": 240000,
                          "currency": "USD",
                          "formatted": "$2400.00"
                      }
                  },
                  "tax": {
                      "unit": {
                          "amount": 0,
                          "currency": "USD",
                          "formatted": "$0.00"
                      },
                      "value": {
                          "amount": 0,
                          "currency": "USD",
                          "formatted": "$0.00"
                      }
                  }
              },
              "timestamps": {
                  "created_at": "2019-05-08T07:13:59Z",
                  "updated_at": "2019-05-08T07:13:59Z"
              }
          }
      }
  ],
  "meta": {
      "display_price": {
          "with_tax": {
              "amount": 240000,
              "currency": "USD",
              "formatted": "$2400.00"
          },
          "without_tax": {
              "amount": 240000,
              "currency": "USD",
              "formatted": "$2400.00"
          },
          "tax": {
              "amount": 0,
              "currency": "USD",
              "formatted": "$0.00"
          }
      },
      "timestamps": {
          "created_at": "2019-05-08T07:13:59Z",
          "updated_at": "2019-05-08T07:13:59Z"
      }
  }
}

class CheckoutPage extends Component {
  onSubmit = (values) => {
    console.log('values', values)
  }

  render() {
    const cartItems = cartItemObj.data.map((item) => {
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        image: 'https://via.placeholder.com/300x400.png',
        pricePerUnit: item.meta.display_price.with_tax.unit.formatted,
        price: item.meta.display_price.with_tax.value.formatted,
      }
    })
    return (
      <Box direction="row" pad="medium">
        <Box width="medium">
          {
            cartItems.map((item) => (
              <ProductCard {...item} />
            ))
          }
        </Box>
        <Box flex pad="small">
          <Form onSubmit={this.onSubmit}>
            <Heading level={3}>Your Info</Heading>

            <FormField name="name" label="Name" />
            <FormField name="email" label="Email" />

            <Heading level={3}>Billing Address</Heading>

            <FormField name="first_name" label="First Name" />
            <FormField name="last_name" label="Last Name" />
            <FormField name="company_name" label="Company Name" />
            <FormField name="line_1" label="Address 1" />
            <FormField name="line_2" label="Address 2" />
            <FormField name="city" label="City" />
            <FormField name="postcode" label="Postcode" />
            <FormField name="county" label="County" />
            <FormField name="country" label="Country" />

            <Button type="submit" primary label="Submit" />
          </Form>
        </Box>
      </Box>
    )
  }
}

export default CheckoutPage
