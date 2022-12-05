import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

export default class Timeago extends PureComponent {
  static propTypes = {
    date: PropTypes.string
  }

  // getDate = () => moment(this.props.date).fromNow() - original (vence en X tiempo)
  getFecha = () => moment(this.props.date).format('D [de] MMMM YYYY')

  state = {
    timeago: this.getFecha()
  }

  componentDidMount () {
    this.interval = setInterval(this.update, 1000 * 60)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  update = () => {
    this.setState({
      timeago: this.getFecha()
    })
  }

  render () {
    return (
      <span className='timeago'>{this.state.timeago}</span>
    )
  }
}
