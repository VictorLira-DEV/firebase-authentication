import React, { ReactNode, useState, useEffect, useCallback } from "react";
let logoutTimer: any;


interface IAuthContextProvider {
    children: ReactNode;
}

interface IAuthContext {
    token: string;
    isLoggedIn: boolean;
    login: (a: string, b: string) => void;
    logout: () => void;
}

const calculateRemainingTime = (expirationTime: string) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingTime = adjExpirationTime - currentTime;
    return remainingTime;
};

const retrieveStoredToken = () => {
    const storedToken = localStorage.getItem("token")!;
    const storedExpirationDate = localStorage.getItem("expirationTime")!;

    const remainingTime = calculateRemainingTime(storedExpirationDate);
    if (remainingTime <= 60000) {
        localStorage.removeItem("token")!;
        localStorage.removeItem("expirationTime")!;
        return "";
    }

    return {
        token: storedToken,
        duration: remainingTime,
    };
};

const AuthContext = React.createContext({} as IAuthContext);

export const AuthContextProvider = (props: IAuthContextProvider) => {
    const tokenData = retrieveStoredToken();
    let initialToken: string = "";
    if (tokenData) {
        initialToken = tokenData.token;
    }
    const [token, setToken] = useState<string>(initialToken);

    const userIsLoggedIn = !!token; //it convert a falsy or truthy value into a boolean
    const logoutHandler = useCallback(() => {
        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("expirationTime");

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, []);

    const loginHandler = (receiveToken: string, expirationTime: string) => {
        setToken(receiveToken);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationTime", expirationTime);

        const remainingTime = calculateRemainingTime(expirationTime);
        logoutTimer = setTimeout(logoutHandler, remainingTime);
    };

    useEffect(() => {
        if (tokenData) {
            console.log(tokenData);
            logoutTimer = setTimeout(logoutHandler, tokenData.duration);
        }
    }, [tokenData, logoutHandler]);

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
