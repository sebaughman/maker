import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Tile from '../tile/Tile';
import './toppings.css'

const GET_TOPPINGS = gql`
{
  toppings {
    id
    name
  }
}`

const getToppings = ({ toppings }, openPopup) => {
  return toppings.map((topping, i) => {
    return (
      <Tile key={i} id={topping.id} title={topping.name} openPopup={openPopup} />
    )
  })
}

function Toppings({ openPopup }) {
  const { loading, data } = useQuery(GET_TOPPINGS);
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Toppings</h2>
      <div className='toppings-wrapper'>
        {getToppings(data, openPopup)}
      </div>
      <button className='green-button' onClick={() => openPopup()}>Create Topping</button>
    </div>
  );
}

export default Toppings