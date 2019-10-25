import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Toppings from './components/toppings/Toppings';
import EditToppingPopup from './components/editTopping/EditToppingPopup';
import EditPizzaPopup from './components/editPizza/EditPizzaPopup'
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Pizzas from './components/pizzas/Pizzas';

toast.configure()

class App extends Component {
  constructor() {
    super()
    this.state = {
      editTopping: 'hidden',
      editPizza: 'hidden',
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

  render() {
    const { openToppingId, openToppingName, editTopping, editPizza, openPizzaId } = this.state;
    return (
      <div className="App">
        <header className="main-container">
          <h1 className="App-link">Pizza Maker</h1>
          <div className='row'>
            <Toppings openPopup={(id, name) => this.openToppingPopup(id, name)} />
            <Pizzas openPopup={(id) => this.openPizzaPopup(id)} />
          </div>
        </header>
        <div className='popup'>
          <EditToppingPopup toppingId={openToppingId} toppingName={openToppingName} visibility={editTopping} closePopup={() => this.closeToppingPopup()} />
        </div>
        {openPizzaId && <div className='popup'>
          <EditPizzaPopup pizzaId={openPizzaId} visibility={editPizza} closePopup={() => this.closePizzaPopup()} />
        </div>}
      </div>
    );
  }
}

export default App;
