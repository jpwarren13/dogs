import React, { useState, useRef } from 'react'
import { Menu } from 'semantic-ui-react'
import {connect} from 'react-redux';
import Modal from './modal';
import {generateDog} from '../redux/api' 

import {ADD_DOG, REMOVE_DOG, GENERATE_DOG, EDIT_DOG} from '../redux/actionTypes';
function DogMenu({ onEditDogs, deleteDogs, randomDog, dogs, onAddDog, setTableDogs}){
    const [showModal, setShowModal] = useState(false);
    const [modalProps, setModalProps] = useState({});
    const add = useRef(null);
    const edit= useRef(null);
 

    const standardModalProps = {
        onShow: () => setShowModal(true),
        onClose: () => setShowModal(false)
    }
    // const { activeItem } = this.state

    return (
        <>

      <Menu>
      <Modal {...modalProps} open={showModal} dogs={dogs} onEditDogs={onEditDogs}/>
      <div ref={add}>
      <Menu.Item
   
          name='Add Dog'
        //   active={activeItem === 'editorials'}
        onClick={() => {
  
                setModalProps({...standardModalProps, title: 'Add Dog', addDog: true, onAddDog: onAddDog});
                setShowModal(true);
       

        }}
        >
          Add Dog
        </Menu.Item>
      </div>

        <Menu.Item
          name='Remove Dog'
        //   active={activeItem === 'reviews'}
          onClick={() => { dogs.filter(d => d.selected).length && deleteDogs ()}}
        >
          Remove Dog(s)
        </Menu.Item>

        <Menu.Item
        ref={edit}
          name='Edit Dog'
        //   active={activeItem === 'upcomingEvents'}
                 onClick={() => {
                    if(dogs.filter(d => d.selected).length){
            setModalProps({...standardModalProps, title: 'Edit Dogs', editDog: true});
                    setShowModal(true);
                    }
        }}
        >
          Edit Dog(s)
        </Menu.Item>
        <Menu.Item
          name='Random Dog'
        //   active={activeItem === 'upcomingEvents'}
          onClick={() => generateDog().then(newDog => {  onAddDog(newDog)})}
        >
          Random Dog
        </Menu.Item>
      </Menu>
      </>
    )
  
}
function mapStateToProps(state){
    return {
        dogs: state.dogs
    }
}

function mapDispatchToProps(dispatch){
    return {
        onAddDog: (dog) => dispatch({type: ADD_DOG, payload: {dog} }),
        deleteDogs: () => dispatch({type: REMOVE_DOG}),
        onEditDogs: (newDogs) => dispatch({type: EDIT_DOG , payload: {newDogs}}),
        randomDog: () => dispatch({type: GENERATE_DOG})
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(DogMenu)