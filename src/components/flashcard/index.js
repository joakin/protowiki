import React from 'react'
import Article from '../article'

export default React.createClass({

  componentDidMount () {
    document.body.classList.add('flashcard')
  },

  componentWillUnmount () {
    document.body.classList.remove('flashcard')
  },

  render () {
    return <Article {...this.props} showLeadImage />
  }

})
