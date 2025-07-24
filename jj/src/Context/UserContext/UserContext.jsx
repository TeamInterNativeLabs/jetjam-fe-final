// import React, { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const useAuth = ({ children }) => {
//   const [userData, setUserData] = useState({});

//   useEffect(() => {
//     let user = JSON.parse(localStorage.getItem('_user'));
//     if (user) {
//       setUserData(user);
//     }
//   }, []);
//   // localStorage.setItem('_user', JSON.stringify({userData}));
//   // setUserData(userData);
//   const setUserDataDate = (userData) => {
//     localStorage.setItem('_user', JSON.stringify({userData}));
//   setUserData(userData);

//   };

//   // const setUserDataAndLocalStorage = (userData) => {
//   //   if(userData){
//   //     localStorage.setItem('_user', JSON.stringify(userData));  
//   //     setTokenAndLocalStorage(userData); 
//   //   }else{
//   //     localStorage.setItem('_user', JSON.stringify(userData));  
//   //   }
//   //   setUserData(userData);
//   // };

//   const clearUserData = () => {
//     localStorage.removeItem('_user');
//     localStorage.removeItem('_token');
//     setUserData(null);
//   };

//   return (
//     <AuthContext.Provider value={{ userData, setUserData: setUserDataDate, clearUserData }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an useAuth');
//   }
//   return context;
// };
import React, { useEffect, useState } from 'react'

export const useAuth = () => {
    const [userData, setUserData] = useState({});

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('_user'))
        if (user) {
            setUserData(user)
        }
    }, []);

    const setUserDataDate = (userData) => {
        localStorage.setItem('_user', JSON.stringify({userData}));
        setUserData(userData);
    }

    const clearUserData = () => {
        localStorage.removeItem('_user')
        setUserData(null)
    }

    return {
        userData, 
        setUserData: setUserDataDate,
        clearUserData,   
    }
}
