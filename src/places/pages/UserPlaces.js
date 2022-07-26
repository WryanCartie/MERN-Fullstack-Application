import React,{useEffect,useState} from "react";

import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hooks";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";




const UserPlaces = () => {
  const userId = useParams().userId;
  console.log(userId)
  const {sendRequest,isLoading,error,clearError} = useHttpClient
  const[loadedPlaces,setLoadedPlace] = useState([]);
  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );
        setLoadedPlace(responseData.places);
      } catch (err) {}
    };
    console.log('labena')
    fetchPlaces();
  }, [sendRequest, userId]);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} />}
    </React.Fragment>
  )
};

export default UserPlaces;
