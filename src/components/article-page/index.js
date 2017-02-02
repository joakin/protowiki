import React from 'react'
import { connect } from 'react-redux'
import Article from '../article'
import FakeText from '../fake-text'
import RemoteData from '../../data/remote-data'
import Actions from '../../actions'
import msg from '../../i18n'

const ArticlePage = React.createClass({

  componentDidMount () { this.getArticle(this.props) },

  componentWillReceiveProps (props) { this.getArticle(props) },

  getArticle (props) {
    if (props.title !== this.pageTitle) {
      this.pageTitle = props.title
      props.getArticle(props.title)
    }
  },

  render () {
    const {article, print, component, isOnline} = this.props
    const {title, data} = article

    let Component = component || Article

    return RemoteData.match(data, {
      NotAsked: _ => null,

      Loading: _ => <FakeText />,

      Success: articleData =>
        <Component title={title} article={articleData}
          saved={article.saved}
          print={print} isOnline={isOnline} />,

      Failure: e =>
        <div>
          <h1>{title}</h1>
          <p>{msg('there_was_a_problem_retrieving_', [title])}</p>
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
