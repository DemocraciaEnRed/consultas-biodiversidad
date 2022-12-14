import React, { Component } from 'react'
import { Link } from 'react-router'

export default class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      options: [
        'No relevante',
        'Poco relevante',
        'Medianamente relevante',
        '50/50',
        'Relevante',
        'Muy relevante',
        'Absolutamente relevante',
      ]
    }
  }

  render() {
    let { topic } = this.props
    let { options } = this.state
    return (
      <div className="general-stats-container">
        <div className="alert alert-warning text-center">
          Han participado <b>{topic.action.count}</b> usuarios
        </div>
        <table className="table table-condensed">
          <thead>
            <tr>
              <th colSpan="3" className="bg-primary">Tipo de accion: Rango</th>
            </tr>
            <tr>
              <th className="bg-light">Opción</th>
              <th className="bg-light text-center">Votos</th>
              <th className="bg-light text-center">Porc.</th>
            </tr>
          </thead>
          <tbody>
            {
              options.map( (option, i) => 
            <tr key={`option-${i}`}>
              <td>
                {option} 
              </td>
              <td className="bg-light text-center">
                {topic.action.results[i].votes}
              </td>
              <td className="bg-light text-center">
                {topic.action.results[i].percentage} %
              </td>
            </tr>

              )
            }

          </tbody>
        </table>
      </div>
    )
  }
}