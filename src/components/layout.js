import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery } from 'gatsby'

import Header from './header'
import './layout.css'
import stripeLogo from '../images/powered_by_stripe.svg'

import '@stripe/stripe-js' // https://github.com/stripe/stripe-js#import-as-a-side-effect

const Layout = ({ children }) => (
  <h1>Hi</h1>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
