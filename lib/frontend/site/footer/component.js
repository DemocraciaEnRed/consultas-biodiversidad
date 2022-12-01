import React, { Component } from 'react'
import { Link } from 'react-router'
import t from 't-component'
import config from 'lib/config'

export default class Footer extends Component {

  render() {
    return (
      <footer className='ext-footer'>
        <div className='footer container'>
          <div className='institutional'>
            <div className='logo gob flex-logos'>
              <div className='logo-wrapper'>
                <a href='/'>
                  <img src={config.imgs.logoFooter1} />
                </a>
              </div>
              <div className='logo-wrapper colaboracion'>
                <p>Con la colaboración de:</p>
                <img src={config.imgs.logoFooter2} />
                <img src={config.imgs.logoFooter3} />
              </div>
            </div>
          </div>
          <div className='footer-navigation'>
            <nav className='menu'>
              <Link to='/ayuda/como-funciona'>¿Cómo funciona?</Link>
              <Link to='/ayuda/acerca'>Acerca de este sitio</Link>
              <Link to='/ayuda/acerca'>Contacto</Link>
            </nav>
            <nav className='menu'>
              <Link to='/ayuda/terminos-y-condiciones'>{t('help.tos.title')}</Link>
              <Link to='/ayuda/privacidad'>{t('help.pp.title')}</Link>
            </nav>
          </div>
        </div>
        <div className='demored container-fluid'>
          <div className='row'>
            <div className='col-md-4 my-1'>
              <a href='https://democraciaenred.org/' target='_blank'>
                <img src={config.imgs.logoFooter} />
              </a>
            </div>
            <div className='col-md-7'>
              <p className='copyR small'>
                Los contenidos de esta página están licenciados bajo <a href='https://www.gnu.org/licenses/gpl-3.0-standalone.html'>GNU General Public License v3.0</a>
              </p>
            </div>
          </div>
        </div>
      </footer >
    )
  }
}
