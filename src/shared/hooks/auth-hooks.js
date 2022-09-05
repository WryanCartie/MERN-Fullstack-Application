import {useState,useCallback,useEffect} from 'react'

let logoutTimer;

export const useAuth = ()=>{
    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState(null);
    const [expirationTimer, setExpirationTimer] = useState();
    const login = useCallback((uid, token, expirationDate) => {
      setToken(token);
      setUserId(uid);
      let tokenExpirationDate =
        expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
  
      setExpirationTimer(tokenExpirationDate);
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: uid,
          token: token,
          expiration: tokenExpirationDate.toISOString(),
        })
      );
    }, []);
    const logout = useCallback(() => {
      setToken(null);
      setUserId(null);
      localStorage.removeItem('userData')
      setExpirationTimer(null);
    }, []);
  
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem("userData"));
      if (
        storedData &&
        storedData.token &&
        new Date(storedData.expiration) > new Date()
      ) {
        login(storedData.userId, storedData.token);
      }
    }, [login]);
    useEffect(() => {
      if (token && expirationTimer) {
        logoutTimer = setTimeout(logout, expirationTimer.getTime() - new Date().getTime());
      }else{
        clearTimeout(logoutTimer);
      }
    }, [token, logout, expirationTimer]);
    
    return{token,login,logout,userId}
}