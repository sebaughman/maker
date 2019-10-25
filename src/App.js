import React, { Component } from 'react';
import { toast } from 'react-toastify';
import Toppings from './components/toppings/Toppings';
import EditToppingPopup from './components/editToppings/EditToppingPopup';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

toast.configure()

class App extends Component {
  constructor() {
    super()
    this.state = {
      editTopping: 'hidden',
      editPizza: 'hidden',
      openToppingId: '',
      openToppingName: ''

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

  openPizzaPopup() {
    this.setState({
      editPizza: 'visible'
    })
  }

  closePizzaPopup() {
    this.setState({
      editPizza: 'hidden'
    })
  }

  render() {
    const { openToppingId, openToppingName, editTopping } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-link">Pizza Maker</h1>
          <Toppings openPopup={(id, name) => this.openToppingPopup(id, name)} />
        </header>
        <div className='popup'>
          <EditToppingPopup toppingId={openToppingId} toppingName={openToppingName} visibility={editTopping} closePopup={() => this.closeToppingPopup()} />
        </div>
        {/* <div className='popup'>
          <EditPizza visibility={this.state.editPizza} editPizzaVisibility={(value) => this.editPizzaVisibility(value)} />
        </div> */}
      </div>
    );
  }
}

export default App;
