import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Tile from '../tile/Tile';
import './pizzas.css'

const GET_PIZZAS = gql`
query getPizzas {
  pizzas {
    id
    name
  }
}`

const getPizzas = ({ pizzas }, openPopup) => {
  return pizzas.map((pizza, i) => {
    return (
      <Tile key={i} id={pizza.id} title={pizza.name} openPopup={openPopup} />
    )
  })
}

function Pizzas({ openPopup }) {
  const { loading, data } = useQuery(GET_PIZZAS);
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Pizzas</h2>
      <div className='pizza-wrapper'>
        {getPizzas(data, openPopup)}
      </div>
      <button className='green-button' onClick={() => openPopup()}>Create Pizza</button>
    </div>
  );
}

export default Pizzas