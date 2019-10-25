import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Toppings from './components/toppings/Toppings';
import EditToppingPopup from './components/editTopping/EditToppingPopup';
import EditPizzaPopup from './components/editPizza/EditPizzaPopup'
import CreatePizzaPopup from './components/createPizza/createPizzaPopup'
import Pizzas from './components/pizzas/Pizzas';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

toast.configure()

class App extends Component {
  constructor() {
    super()
    this.state = {
      editTopping: 'hidden',
      editPizza: 'hidden',
      createPizza: 'hidden',
      openToppingId: '',
      openToppingName: '',
      openPizzaId: ''
    }
  }

  openToppingPopup(id, name) {
    this.setState({
      editTopping: 'visible',
      openToppingId: id,
      openToppingName: name
    })
  }

  closeToppingPopup() {
    this.setState({
      editTopping: 'hidden',
      openToppingId: '',
      openToppingName: ''
    })
  }

  openPizzaPopup(id) {
    this.setState({
      editPizza: 'visible',
      openPizzaId: id
    })
  }

  closePizzaPopup() {
    this.setState({
      editPizza: 'hidden',
      openPizzaId: ''
    })
  }

  openCreatePopup() {
    this.setState({
      createPizza: 'visible',
    })
  }

  closeCreatePopup() {
    this.setState({
      createPizza: 'hidden',
    })
  }

  render() {
    const { openToppingId, openToppingName, editTopping, editPizza, openPizzaId, createPizza } = this.state;
    return (
      <div className="App">
        <header className="main-container">
          <h1 className="App-link">Pizza Maker</h1>
          <div className='row'>
            <Toppings openPopup={(id, name) => this.openToppingPopup(id, name)} />
            <Pizzas openCreatePopup={() => this.openCreatePopup()} openPopup={(id) => this.openPizzaPopup(id)} />
          </div>
        </header>
        <div className='popup'>
          <EditToppingPopup toppingId={openToppingId} toppingName={openToppingName} visibility={editTopping} closePopup={() => this.closeToppingPopup()} />
        </div>
        {openPizzaId && <div className='popup'>
          <EditPizzaPopup pizzaId={openPizzaId} visibility={editPizza} closePopup={() => this.closePizzaPopup()} />
        </div>}
        <div className='popup'>
          <CreatePizzaPopup visibility={createPizza} closePopup={() => this.closeCreatePopup()} />
        </div>
      </div>
    );
  }
}

export default App;
