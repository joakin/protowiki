import React from 'react'
import { connect } from 'react-redux'
import Article from '../article'
import FakeText from '../fake-text'
import RemoteData from '../../data/remote-data'
import Actions from '../../actions'

const ArticlePage = React.createClass({

  componentDidMount () { this.props.getArticle(this.props.title) },

  componentWillReceiveProps (props) { props.getArticle(props.title) },

  render () {
    const {article, print, component, isOnline} = this.props
    const {title, data} = article

    let Component = component || Article

    return RemoteData.match(data, {
      NotAsked: _ => null,

      Loading: _ => <FakeText />,

      Success: article =>
        <Component title={title} article={article}
          print={print} isOnline={isOnline} />,

      Failure: e =>
        <div>
          <h1>{title}</h1>
          <p>There was a problem retrieving <em>{title}</em></p>
        </div>
    })
  }

})

const stateToProps = ({ currentArticle, online }) => ({
  article: currentArticle,
  isOnline: online
})
const dispatchToProps = (dispatch) => ({
  getArticle: (title) => dispatch(Actions.getArticle(title))
})

export default connect(stateToProps, dispatchToProps)(ArticlePage)
