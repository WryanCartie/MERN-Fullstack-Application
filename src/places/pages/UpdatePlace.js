import React from 'react'
import {useParams} from 'react-router-dom'
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';

const DUMMY_PLACES =[ {
  id:'p1',
  title:'Stockholm Palace',
  description:'Palace hosting the emperors and empresses of the Swedish Empire.',
  imageUrl:'https://media.istockphoto.com/photos/royal-palace-in-stockholm-hdr-picture-id641802618?k=20&m=641802618&s=612x612&w=0&h=axGbCNMymi9xavDpcmlXyPk8inWULfoWf3NIeF7PEkU=',
  address: 'Kungliga slottet, 107 70 Stockholm, Sweden',
  location: {
      lat: 59.3268, 
      lng: 18.0717
  },
  creator:'u1'
}];

const updatePlace = props =>{
  const placeId = useParams().placeId;
  const identifiedPlace = DUMMY_PLACES.find(p=>p.id === placeId);

  if(!identifiedPlace){
    return(
      <div className="center">
        <h2>Could not find place!!</h2>
      </div>
    )
  }



 
  
  return(
    <form>
      <Input 
      id="title"
      element="input"
      type="text"
      label="Title"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid title !!"
      onInput={()=>{}}
      value={identifiedPlace.title}
      valid={props.isValid}
      />
       <Input 
      id="description"
      element="textarea"
    
      label="Description"
      validators={[VALIDATOR_MINLENGTH()]}
      errorText="Please enter a valid description (Min 5 characters) !!"
      onInput={()=>{}}
      value={identifiedPlace.description}
      valid={true}
      />
      <Button type="submit" disabled={true}>
        UPDATE PLACE
        </Button>
    </form>
  )
}

export default updatePlace;