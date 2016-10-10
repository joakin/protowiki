import React from 'react';

export default React.createClass({
  render () {
    const {article} = this.props
    const {displaytitle, description} = article.lead

    return (
      <div>
        <p>{displaytitle}</p>
        <p>{description}</p>
        <pre>{JSON.stringify(article, null, 2)}</pre>
      </div>
    )
  }
})
