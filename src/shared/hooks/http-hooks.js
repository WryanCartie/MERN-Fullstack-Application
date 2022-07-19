import {useState, useCallback,useRef} from 'react'

export const useHttpClient = () =>{
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState()
    const activeHttpRequest = useRef([])
    const sendRequest =useCallback( async (url,method = 'GET',body= null, headers = {}) =>{
        setIsLoading(true)
        const httpAbortCtrl = new AbortController();
        activeHttpRequest.current.push(httpAbortCtrl)
        try{
            const response = await fetch(url,{
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal
            })
            const responseData = response.json()
            if(!response.ok){
                throw Error(responseData.message)
            }
            return responseData
        }catch(error){
            setError(error.message)
        }
        setIsLoading(false)
      
    },[])

    const clearError = () =>{
        setError(null);
    }
    return isLoading,error,sendRequest,clearError
}