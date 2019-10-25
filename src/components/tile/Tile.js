import React, { Component } from 'react';
import './tile.css'

class Tile extends Component {
  render() {
    const { id, title, openPopup } = this.props
    return (
      <div className='tile-wrapper'>
        <p>{title}</p>
        <button className='teal-button' onClick={() => openPopup(id, title)}>View/Edit</button>
      </div>
    );
  }
}

export default Tile