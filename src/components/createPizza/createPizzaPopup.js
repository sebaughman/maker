import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { toast } from 'react-toastify';
import './createPizzaPopup.css'

const GET_PIZZAS = gql`
query getPizzas {
  pizzas {
    id
    name
  }
}`

const CREATE_PIZZA = gql`
mutation createPizza ($name: String!, $toppingIds: [ID]) {
  createPizza(name: $name, toppingIds: $toppingIds){
            id
            name
            toppings {
              id
              name
            }
  }
}
`

const GET_TOPPINGS = gql`
{
  toppings{
    id
    name
  }
}
`


const handleError = ({ graphQLErrors }) => {
  toast.error(graphQLErrors[0].message)
}

const getCheckboxes = (toppings, toppingIds, setToppingIds) => {

  return toppings.map((topping, i) => {
    const toppingId = topping.id
    const isOnPizza = toppingIds.includes(toppingId)
    return (
      <div key={i} className='checkbox-wrapper'>
        <input
          type="checkbox"
          value={toppingId}
          checked={isOnPizza}
          onChange={isOnPizza ?
            () => setToppingIds(toppingIds.filter(id => id !== toppingId))
            : () => setToppingIds([...toppingIds, toppingId])}
        />
        <label>{topping.name}</label>
      </div>
    )
  })

}

const closeCreatePizza = (closePopup, setName, setToppingIds) => {
  setName('');
  setToppingIds([]);
  closePopup();
}

function CreatePizzaPopup({ visibility, closePopup }) {
  const { data, loading } = useQuery(GET_TOPPINGS);
  const [name, setName] = useState();
  const [toppingIds, setToppingIds] = useState([])
  const [createPizza] = useMutation(CREATE_PIZZA, {
    onError: (error) => { handleError(error) },
    onCompleted: () => { closeCreatePizza(closePopup, setName, setToppingIds) },
    update: (cache, { data: { createPizza } }) => {
      const { pizzas } = cache.readQuery({ query: GET_PIZZAS });
      cache.writeQuery({
        query: GET_PIZZAS,
        data: { pizzas: pizzas.concat([createPizza]) },
      });
    }
  })

  if (loading) return <p>...Loading</p>

  return (
    <div className='popup-background' style={{ visibility: visibility }}>
      <div className='popup-content'>
        <span className='title-container'><h3> Create Pizza</h3>
          <button className='exit-popup-button'
            onClick={() => closeCreatePizza(closePopup, setName, setToppingIds)}>
            X
          </button>
        </span>
        <div className='name-input-wrapper'>
          <input placeholder='Pizza Name' type='text' value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <h4 className='subtitle'>Toppings</h4>
          <div className='toppings-container'>
            {getCheckboxes(data.toppings, toppingIds, setToppingIds)}
          </div>
        </div>
        <div>
          <button className='teal-button' onClick={() => createPizza({ variables: { name: name, toppingIds } })}>Create Pizza</button>
        </div>
      </div>
    </div>
  );
}

export default CreatePizzaPopup