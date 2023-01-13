import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { browserHistory, Link } from 'react-router'
import Jump from 'jump.js'
import userConnector from 'lib/frontend/site/connectors/user'
import config from 'lib/config'
import Footer from 'lib/frontend/site/footer/component'
import forumStore from 'ext/lib/stores/forum-store/forum-store'
import ForumContainer from './forum-container/component'
import ForumCard from './forum-card/component'
import Search from './search/component'

class HomeMultiForum extends Component {
  constructor(props) {
    super(props)
    let showModal = window.localStorage.getItem('modal-terminos-flag') ? false : true
    console.log('showModal', showModal)

    this.state = {
      page: 0,
      activeFilter: 'byDate',
      forums: [],
      showModal: showModal
    }
  }

  componentDidMount() {
    const {
      activeFilter
    } = this.state;

    forumStore
      .filterBy(activeFilter)
      .then((forums) => {
        this.setState({
          forums,
          // las páginas son de a 3 (definido en ext/lib/api/filter.js), entonces si devuelve 3, tal vez hay más
          showMore: forums.length === 3
        })
      })
      .catch(console.error)
  }

  handleClick = (name) => {
    const { page } = this.state;

    forumStore
      .filterBy(name)
      .then((forums) => {
        this.setState({
          page,
          forums,
          activeFilter: name
        })
      })
      .catch(console.error)
  }

  handleMoreClick = () => {
    const {
      page,
      activeFilter
    } = this.state;

    forumStore
      .filterBy(activeFilter, page + 1)
      .then((forums) => {
        this.setState({
          page: this.state.page + 1,
          forums: [...this.state.forums, ...forums],
          showMore: forums.length === 3
        });
      })
      .catch(console.error)
  }

  handleButtonClick = () => {
    Jump('#consultas')
    // const consultasNode = ReactDOM.findDOMNode(this.refs.consultas)
    // window.scrollTo(0, consultasNode.offsetTop)
  }

  acceptModal = () => {
    window.localStorage.setItem('modal-terminos-flag', 'true')
    this.setState({ showModal: false })
  }

  render() {
    if (this.props.user.state.pending) return null

    const {
      showMore,
      activeFilter,
      forums,
      showModal
    } = this.state

    return (
      <div className='ext-site-home-multiforum'>
        <section
          className='cover jumbotron'
          style={{
            backgroundImage: `url('${config.imgs.backgroundHome}')`,
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
          }}>
          <div className='jumbotron_body'>
            <div className='container'>
              <img
                src={config.imgs.logoCentralHome}
                alt='Logo'
              />
              <p className='lead highlight'>
                {config.bajadaPlataforma}
              </p>
              <button
                className='btn btn-primary'
                onClick={this.handleButtonClick}
              >
                Quiero participar
              </button>
            </div>
          </div>
        </section>
        <div className='lead-paragraph'>
          <h2 className='bold'>{config.organizationName}</h2>
          <p>
            <strong> {config.organizationName} es un espacio de diálogo e intercambio</strong> diseñado para la elaboración participativa del <strong>Plan de Acción para la Estrategia Regional para la Conservación de la Biodiversidad de la Región Metropolitana de Santiago.</strong>
          </p>
          <p>Esta plataforma permite informarnos sobre la Estrategia, debatir sobre iniciativas propuestas para su Plan de Acción y definir acciones prioritarias.</p>
          <br />
          <p className='bold'>
            SIGUE ESTAS ACCIONES PARA PARTICIPAR:
          </p>
        </div>
        <div className='container-fluid section-icons'>
          <div className='row cards'>
            <div className='col-xs-11 col-md-3 card'>
              <img
                className='icon'
                src={config.imgs.iconoHomeInformate}
                alt='Informate'
              />
              <div className='text'>
                <h5>INFORMATE</h5> SOBRE LAS CONSULTAS DISPONIBLES
              </div>
            </div>
            <div className='col-xs-11 col-md-3 card'>
              <img
                className='icon'
                src={config.imgs.iconoHomeParticipa}
                alt='Debate'
              />
              <div className='text'>
                <h5>DEBATE</h5> TU OPINIÓN, TU COMENTARIO
              </div>
            </div>
            <div className='col-xs-11 col-md-3 card'>
              <img
                className='icon'
                src={config.imgs.iconoHomeComparti}
                alt='Prioriza'
              />
              <div className='text'>
                <h5>PRIORIZA</h5> EN LOS EJES DE CADA CONSULTA
              </div>
            </div>
          </div>
        </div>

        {/* <div className='lead-paragraph last col-md-2 offset-md-4 col-xs-12'>
          <i className='icon-arrow-down' onClick={this.handleButtonClick} />
        </div> */}

        <div className='separador' />


        <div className='container forums-list' id='consultas'>
          <h2 className='forums-list-title'>Consultas disponibles</h2>
          <Search />
          <div className='filter-container content-center'>
            <div className='btn-group btn-group-sm dropdown-element' role='group' aria-label='Filtros'>
              <button
                className={`btn dropbtn ${activeFilter === 'byDate' ? 'btn-active' : 'btn-secondary'}`}
                onClick={this.handleClick.bind(this, 'byDate')}
              >
                {(() => {
                  switch (this.state.activeFilter) {
                    case 'byDate':
                      return 'Nuevas'
                    case 'byPopular':
                      return 'Relevantes'
                    case 'byClosed':
                      return 'Finalizadas'
                  }
                })()}
              </button>
              <ul className='dropdown-content'>
                <li
                  className={`btn btn-item-dropdown ${activeFilter === 'byDate' ? 'btn-active' : 'btn-secondary'}`}
                  onClick={this.handleClick.bind(this, 'byDate')}
                >
                  Nuevas
                </li>
                <li
                  className={`btn btn-item-dropdown ${activeFilter === 'byPopular' ? 'btn-active' : 'btn-secondary'}`}
                  onClick={this.handleClick.bind(this, 'byPopular')}
                >
                  Relevantes
                </li>
                <li
                  className={`btn btn-item-dropdown ${activeFilter === 'byClosed' ? 'btn-active' : 'btn-secondary'}`}
                  onClick={this.handleClick.bind(this, 'byClosed')}
                >
                  Finalizadas
                </li></ul>
            </div>
          </div>


          {!forums.length && <h3 className='no-result content-center'>No hay resultados</h3>}

          {!!forums.length && forums.map((forum, key) => (
            <ForumContainer forum={forum} key={forum.id} />
          ))}
          {!!forums.length && showMore &&
            <div className='row content-center'>
              <button className='btn btn-active show-more' onClick={this.handleMoreClick}>
                Cargar más consultas
              </button>
            </div>
          }
        </div>
        <Footer />
        {/* modal términos */}
        <div className={`modal-terminos ${showModal ? 'ds-block' : ''}`} id='terminosModal'>
          <div className='modal-terminos-container container'>
            <div className='modal-terminos-content'>
              {/* <button type='button' className='modal-terminos-x' ><b>&times;</b></button> */}
              <div className='modal-terminos-body'>
                <p>La información presentada en la plataforma es de circulación restringida exclusivamente a los usuarios invitados a participar del proceso, el Administrador y los encargados de  la elaboración del Plan de Acción de la Estrategia Regional para la Conservación de la Biodiversidad
                </p>
                <button type='button' className='modal-terminos-accept' onClick={this.acceptModal}>Aceptar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default userConnector(HomeMultiForum)
