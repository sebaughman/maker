
import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { toast } from 'react-toastify';
import './pizzaToppings.css'

const GET_PIZZA_TOPPINGS = gql`
query pizzaToppings($id: ID!) {
  pizzaToppings (pizzaId: $id){
    id
  }
}`;

const GET_TOPPINGS = gql`
{
  toppings{
    id
    name
  }
}
`
const ADD_TOPPING = gql`
mutation addTopping ($pizzaId: ID, $toppingId: ID) {
  addTopping(pizzaId: $pizzaId, toppingId: $toppingId){
            id
  }
}
`

const REMOVE_TOPPING = gql`
mutation removeTopping ($pizzaId: ID, $toppingId: ID) {
  removeTopping(pizzaId: $pizzaId, toppingId: $toppingId){
            id
  }
}
`

const handleError = ({ graphQLErrors }) => {
  toast.error(graphQLErrors[0].message)
}

const getPizzaToppingIds = (pizzaToppings) => {
  if (pizzaToppings) {
    return pizzaToppings.reduce((acc, topping) => {
      acc.push(topping.id);
      return acc;
    }, [])
  }
  return []
}

const getCheckboxes = (pizzaId, { toppings }, { pizzaToppings }, addTopping, removeTopping) => {
  const pizzaToppingIds = getPizzaToppingIds(pizzaToppings)

  return toppings.map((topping, i) => {
    const toppingId = topping.id
    const isOnPizza = pizzaToppingIds.includes(toppingId)
    return (
      <div key={i} className='checkbox-wrapper'>
        <input
          type="checkbox"
          value={toppingId}
          checked={isOnPizza}
          onChange={isOnPizza ? () => removeTopping({ variables: { pizzaId, toppingId } }) : () => addTopping({ variables: { pizzaId, toppingId } })}
        />
        <label>{topping.name}</label>
      </div>
    )
  })

}


function PizzaToppings({ pizzaId }) {
  const { data: allToppings, loading: allToppingsLoading } = useQuery(GET_TOPPINGS);
  const { data: pizzaToppings, loading: pizzaToppingsLoading } = useQuery(GET_PIZZA_TOPPINGS, { variables: { id: pizzaId } });
  const [addTopping] = useMutation(ADD_TOPPING, {
    onError: (error) => { handleError(error) },
    refetchQueries: ["pizzaToppings"]
  })
  const [removeTopping] = useMutation(REMOVE_TOPPING, {
    onError: (error) => { handleError(error) },
    refetchQueries: ["pizzaToppings"]
  })

  if (allToppingsLoading || pizzaToppingsLoading) return <p>...Loading</p>

  return (
    <div className='container'>
      <h4 className='subtitle'>Toppings</h4>
      <div className='toppings-container'>
        {getCheckboxes(pizzaId, allToppings, pizzaToppings || {}, addTopping, removeTopping)}
      </div>
    </div>
  );
}

export default PizzaToppings