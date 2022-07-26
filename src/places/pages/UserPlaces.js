import React,{useEffect,useState} from "react";

import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hooks";




const UserPlaces = () => {
  const userId = useParams.userId;
  const {sendRequest,isLoading,error,clearError} = useHttpClient
  const[loadedPlace,setLoadedPlace] = useState([]);
  useEffect(()=>{
    const fetchPlaces = async ()=>{
      try{
        const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
        console.log(responseData);
        setLoadedPlace(responseData.places)
   
      }catch(err){
      
      }
      fetchPlaces()
    }
  },[sendRequest,userId])
  return <PlaceList items={loadedPlace} />;
};

export default UserPlaces;
