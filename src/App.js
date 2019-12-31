import React  from 'react'
import { BrowserRouter as Router, NavLink, Route } from 'react-router-dom'
import '../node_modules/react-bulma-components/dist/react-bulma-components.min.css';
import logo from './assests/plant2.svg'


import AddAPlant from './components/AddAPlant'
import Description from './components/Description'
import SinglePlant from './components/Plant'

import './App.css'
import PlantList from './components/PlantList'

import usePlantList from './hooks/usePlantList'


function App() {
  const plantList = usePlantList();

  return (
    <Router>
      <div>
        <nav className="navbar" role="navigation" aria-label="main navigation">
          <div className='container'>
            <div className="navbar-brand">
              <div className="navbar-item"><img src={logo} width="38" height="38" alt="grass logo" />Edible Plants</div>
              <div role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </div>
            </div>
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-end">
                  <NavLink className="navbar-item" to='/plants'>Plant List</NavLink>
                  <NavLink className="navbar-item" to='/addPlants'>Add a Plant</NavLink>
                  <a className="navbar-item" href="https://github.com/rainandbare/ediblePlants/issues">Wish List</a>
                </div>
            </div>
          </div>
        </nav>
        <section className="hero is-primary is-medium is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Edible Plants
              </h1>
              <h2 className="subtitle">
                by Anthony and Suzette
              </h2>
            </div>
          </div>
        </section>
        <Route exact path="/" component={Description} />
        <Route path="/plants" render={(props) => <PlantList {...props} plantList={plantList}/>}/>
        <Route path="/addPlants" component={AddAPlant} />
        <Route path="/plant/:id" component={SinglePlant}/>
        <footer className="footer">
          <div className="content has-text-centered">
            <p>{`Made with <3`}</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
