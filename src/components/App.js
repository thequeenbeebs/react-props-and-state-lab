import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }

    fetch('/api/pets')
      .then(resp => resp.json())
      .then(petData => {
        this.setState({
          pets: petData
        })
    
    })
  }

  onChangeType = (event) => {
      event.preventDefault()
      this.setState({
        filters: {
          type: event.target.value
        }
      })
  }

  onFindPetsClick = () => {
    if (this.state.filters.type === 'all') {
      fetch('/api/pets')
      .then(resp => resp.json())
      .then(petData => {
        this.setState({
          pets: petData
        })
      })
      } else {
        fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(resp => resp.json())
      .then(petData => {
        this.setState({
          pets: petData
        })
      })
      }
    } 

    // Finally, App should pass a callback prop, 
    //onAdoptPet, to <PetBrowser />. This callback should take 
    //in an id for a pet, find the matching pet in state.pets and 
    //set the isAdopted property to true.

    onAdoptPet = (petId) => {
      console.log(petId)
      let pet = this.state.pets.find(pet => pet.id === petId)
      pet.isAdopted = true
      let updatedList = this.state.pets.filter(pet => pet.id !== petId)
      //filter through pets state and delete the old one
      //add the new one with a spread operator
      this.setState({
        pets: [...updatedList, pet]
      })
    }
    

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
