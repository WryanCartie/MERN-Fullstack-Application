import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import useForm from '../../shared/hooks/form-hooks';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import './PlaceForm.css'
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

const UpdatePlace = (props) =>{

  const [ isLoading,setIsLoading] = useState(true);
  const placeId = useParams().placeId


  const placeUpdateHandler = ()=>{

  }
  const [formState,inputHandler,setFormData] = useForm({
    title: {
      value:'',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    }
  },
  false
  )
  const identifiedPlace = DUMMY_PLACES.find(p=>p.id === placeId); 

  
  useEffect(()=>{
    if(identifiedPlace){
      setFormData({
        title: {
          value: identifiedPlace.title,
          isValid: true
        },
        description: {
          value: identifiedPlace.description,
          isValid: true
        }
      },true)
    }

    setIsLoading(false)
  
  },[setFormData,identifiedPlace])


  if(!identifiedPlace){
    return(
      <div className="center">
        <h2>Could not find place!!</h2>
      </div>
    )
  }
  if(isLoading){
    return(
      <div className="center">
        <h2>Loading...</h2>
      </div>
    )
  }else{

  }

  return(
    <form className="place-form">
      <Input 
      id="title"
      element="input"
      type="text"
      label="Title"
      validators={[VALIDATOR_REQUIRE()]}
      errorText="Please enter a valid title !!"
      onInput={inputHandler}
      initialValue={formState.inputs.title.value}
      initialValid={formState.inputs.title.isValid}
      />
       <Input 
      id="description"
      element="textarea"
    
      label="Description"
      validators={[VALIDATOR_MINLENGTH(5)]}
      errorText="Please enter a valid description (Min 5 characters) !!"
      onInput={inputHandler}
      initialValue={formState.inputs.description.value}
      initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" onClick={placeUpdateHandler} disabled={!formState.isValid}>
        UPDATE PLACE
        </Button>
    </form>
  )
}

export default UpdatePlace;