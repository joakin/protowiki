import React from 'react'
import Diff from 'date-diff'
import msg from '../../i18n'

export default React.createClass({
  getInitialState () {
    return {
      now: Date.now()
    }
  },
  componentDidMount () {
    this.timer = setInterval(() => this.setState({ now: Date.now() }), 3000)
  },
  componentWillMount () {
    clearInterval(this.timer)
  },
  render () {
    const { date } = this.props
    const { now } = this.state
    const diff = new Diff(new Date(now), new Date(date))
    return (
      <span>
        { Math.floor(diff.years()) > 1 ? msg('saved_years_ago', [Math.floor(diff.years())])
        : Math.floor(diff.months()) > 1 ? msg('saved_months_ago', [Math.floor(diff.months())])
        : Math.floor(diff.weeks()) > 1 ? msg('saved_weeks_ago', [Math.floor(diff.weeks())])
        : Math.floor(diff.days()) > 1 ? msg('saved_days_ago', [Math.floor(diff.days())])
        : Math.floor(diff.hours()) > 1 ? msg('saved_hours_ago', [Math.floor(diff.hours())])
        : Math.floor(diff.minutes()) > 1 ? msg('saved_minutes_ago', [Math.floor(diff.minutes())])
        : msg('saved_seconds_ago', [Math.floor(diff.seconds())])
        }
      </span>
    )
  }
})
