import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';
import './editToppingPopup.css'

const UPDATE_TOPPING = gql`
mutation updateTopping ($id: ID, $name: String) {
  updateTopping(id: $id, name: $name){
            id
    				name
  }
}`

const DELETE_TOPPING = gql`
mutation deleteTopping ($id: ID) {
  deleteTopping(id: $id){
            id
            name
  }
}`

const CREATE_TOPPING = gql`
mutation createTopping ($name: String!) {
  createTopping(name: $name){
            id
            name
  }
}`

const GET_TOPPINGS = gql`
{
  toppings {
    id
    name
  }
}`

class EditToppingPopup extends Component {
  constructor() {
    super()
    this.state = {
      name: ''
    }
  }

  componentWillReceiveProps(next) {
    const { toppingName } = this.props;
    if (next.toppingName != toppingName) {
      this.setState({ name: next.toppingName })
    }
  }

  changeName(value) {
    this.setState({
      name: value
    })
  }

  getCreateMutation() {
    const { name } = this.state;
    const { closePopup } = this.props;

    return (
      <Mutation
        mutation={CREATE_TOPPING}
        variables={{ name: name }}
        onCompleted={closePopup}
        update={(cache, { data: { createTopping } }) => {
          const { toppings } = cache.readQuery({ query: GET_TOPPINGS });
          cache.writeQuery({
            query: GET_TOPPINGS,
            data: { toppings: toppings.concat([createTopping]) },
          });
        }}
      >
        {(submit) => <button disabled={!name} className='teal-button' onClick={submit}>Create</button>}
      </Mutation>
    )
  }

  getUpdateMutation() {
    const { name } = this.state;
    const { toppingId, closePopup } = this.props;

    return (
      <Mutation
        mutation={UPDATE_TOPPING}
        variables={{ id: toppingId, name: name }}
        onCompleted={closePopup}
      >
        {(submit) => <button disabled={!name} className='teal-button' onClick={submit}>Update</button>}
      </Mutation>
    )
  }

  getNewToppings(toppings, idToRemove) {
    return toppings.filter(topping => topping.id !== idToRemove)
  }


  render() {
    const { name } = this.state;
    const { toppingId, closePopup } = this.props;
    return (
      <div className='popup-background' style={{ visibility: this.props.visibility }}>
        <div className='popup-content'>
          <span className='title-container'><h3> {toppingId ? 'Edit Topping' : 'Create Topping'}</h3> <button className='exit-popup-button' onClick={closePopup}> X</button></span>
          <div className='popup-content-wrapper'>
            <input placeholder='Topping Name' type='text' value={name} onChange={(event) => this.changeName(event.target.value)} />
            <div className='button-container'>
              {!toppingId ? this.getCreateMutation() : this.getUpdateMutation()}
              {!!toppingId && <Mutation
                mutation={DELETE_TOPPING}
                variables={{ id: toppingId }}
                onCompleted={closePopup}
                update={(cache, { data: { deleteTopping } }) => {
                  const { toppings } = cache.readQuery({ query: GET_TOPPINGS });
                  cache.writeQuery({
                    query: GET_TOPPINGS,
                    data: { toppings: this.getNewToppings(toppings, deleteTopping.id) },
                  });
                }}
              >
                {(deleteTopping) => (
                  <button className='pink-button' onClick={deleteTopping}>Delete</button>
                )
                }
              </Mutation>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditToppingPopup 