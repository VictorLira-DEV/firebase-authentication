import React, { ReactNode, useState } from 'react';

interface IAuthContextProvider {
    children: ReactNode
}

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    login: (token: string) => {},
    logout: () => {}
});

export const AuthContextProvider = (props: IAuthContextProvider) => {
    const [token, setToken] = useState('');

    const userIsLoggedIn = !!token //it convert a falsy or truthy value into a boolean

    const loginHandler = (receiveToken: string) => {
        setToken(receiveToken)
    }

    const logoutHandler = () => {
        setToken('')
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return(
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext;


