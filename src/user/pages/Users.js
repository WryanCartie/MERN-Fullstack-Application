import React,{useEffect,useState} from "react";

import UsersList from "../components/UsersList";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Users = () => {
  const[isLoading,setLoading] = useState(false)
  const[error, setError] = useState();
  const[loadedUsers,setLoadedUsers] = useState()

  useEffect(()=>{
    const sendRequest = async ()=>{
      setLoading(true)
      try{
        const response = await fetch('http//localhots:5000/api/users')
        const responseData = response.json()
        setLoadedUsers(responseData.users)
        if(!response.ok){
          throw new Error(responseData.messages)
        }
      }catch(err){
        setError(err.message)

      }
    
      setLoading(false)
    }
    sendRequest();
  })

  const errorHandler = () =>{
    setError(null);
  }


  return (
  <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler}/>
      {isLoading && (
        <div className="center">
          <LoadingSpinner/>
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={USERS} />}
  </React.Fragment>


  )
};

export default Users;
