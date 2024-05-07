import React from 'react'

import Login from './Login.tsx';
import OTPActions from './OTPActions.tsx';

import {
    useIsLoggedIn,
    useDynamicContext
  } from "@dynamic-labs/sdk-react-core";


const Main = () => {

    const isLoggedIn = useIsLoggedIn();

    const { handleLogOut } = useDynamicContext();

    return (
        <div>
            {isLoggedIn ? <OTPActions /> : <Login />}
            {isLoggedIn && <button onClick={handleLogOut}>Log out</button>}
        </div>
    )
}

export default Main;