import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { toast } from 'react-toastify';
import PizzaToppings from '../pizzaToppings/PizzaToppings'
import './editPizzaPopup.css'

const GET_PIZZA = gql`
query pizzas($id: ID!) {
  pizzas (id: $id){
    id
    name
  }
}`

const GET_PIZZAS = gql`
query getPizzas {
  pizzas {
    id
    name
  }
}`

const UPDATE_PIZZA = gql`
mutation updatePizza ($id: ID, $name: String) {
  updatePizza(id: $id, name: $name){
            id
    				name
  }
}`

const DELETE_PIZZA = gql`
mutation deletePizza ($id: ID) {
  deletePizza(id: $id){
            id
  }
}`

const handleError = ({ graphQLErrors }) => {
  toast.error(graphQLErrors[0].message)
}

const getName = (data) => {
  if (data && data.pizzas[0]) return data.pizzas[0].name
  return null
}
const getNewPizzas = (pizzas, idToRemove) => {
  return pizzas.filter(pizza => pizza.id !== idToRemove)
}

function EditPizzaPopup({ pizzaId, visibility, closePopup }) {
  const { data } = useQuery(GET_PIZZA, { variables: { id: pizzaId } });
  const [name, setName] = useState();
  const [updatePizza] = useMutation(UPDATE_PIZZA, {
    onError: (error) => { handleError(error) },
    onCompleted: () => { closePopup() }
  })
  const [deletePizza] = useMutation(DELETE_PIZZA, {
    onError: (error) => { handleError(error) },
    onCompleted: () => { closePopup() },
    update: (cache, { data: { deletePizza } }) => {
      const { pizzas } = cache.readQuery({ query: GET_PIZZAS });
      cache.writeQuery({
        query: GET_PIZZAS,
        data: { pizzas: getNewPizzas(pizzas, deletePizza.id) },
      });
    }
  })
  useEffect(() => { setName(getName(data)) }, [data]);

  return (
    <div className='popup-background' style={{ visibility: visibility }}>
      <div className='popup-content'>
        <span className='title-container'><h3> Edit Pizza</h3></span>
        <div className='name-input-wrapper'>
          <input placeholder='Pizza Name' type='text' value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <PizzaToppings pizzaId={pizzaId} />
        <div className='button-container'>
          <button className='teal-button' onClick={() => updatePizza({ variables: { id: pizzaId, name: name } })}>Update Pizza</button>
          <button className='pink-button' onClick={() => deletePizza({ variables: { id: pizzaId } })}>Delete Pizza</button>
        </div>
      </div>
    </div>
  );
}

export default EditPizzaPopup