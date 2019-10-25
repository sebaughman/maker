// gets pizzaId
// useState for pizzaName
// method to change state
// mutation to change name
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { toast } from 'react-toastify';
import './editPizzaPopup.css'

const GET_PIZZA = gql`
query pizzas($id: ID!) {
  pizzas (id: $id){
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

const onError = ({ graphQLErrors }) => {
  toast.error(graphQLErrors[0].message)
}

const getName = (data) => {
  if (data && data.pizzas[0]) return data.pizzas[0].name
  return ''
}

function EditPizzaPopup({ pizzaId, visibility, closePopup }) {
  const { data } = useQuery(GET_PIZZA, { variables: { id: pizzaId } });
  const [name, setName] = useState('');
  useEffect(() => { setName(getName(data)) }, [data]);

  return (
    <div className='popup-background' style={{ visibility: visibility }}>
      <div className='popup-content'>
        <span className='title-container'><h3> Edit Pizza</h3></span>
        <div className='name-input-wrapper'>
          <input placeholder='Pizza Name' type='text' value={name} onChange={(event) => setName(event.target.value)} />
          <div >
            <Mutation
              mutation={UPDATE_PIZZA}
              variables={{ id: pizzaId, name: name }}
              onError={onError}
              onCompleted={closePopup}
            >
              {(updatePizza) => (
                <button className='teal-button' onClick={updatePizza}>Update Name</button>
              )
              }
            </Mutation>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPizzaPopup