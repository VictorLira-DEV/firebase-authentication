import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const authCtx = useContext(AuthContext)

    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current?.value;
        const enteredPassword = passwordInputRef.current?.value;
        setIsLoading(true);

        let url: string;
        if (isLogin) {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCjkamaH6_f3FIV326hC6NB1sWzjGCzZa8";
        } else {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCjkamaH6_f3FIV326hC6NB1sWzjGCzZa8";
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),
            headers: { "Content-type": "application/json" },
        })
            .then((res) => {
                setIsLoading(false);
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then((data) => {
                        //show  an error modal
                        let errorMessage = "Authenication failed";
                        if (data && data.error && data.error.message) {
                            errorMessage = data.error.message;
                        }

                        throw new Error(errorMessage);
                    });
                }
            })
            .then((data) => {
                authCtx.login(data.idToken)
                console.log(data.idToken);
            })
            .catch((error) => {
                window.alert(error.message);
            });
    };

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? "Login" : "Sign Up"}</h1>
            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <label htmlFor="email">Your Email</label>
                    <input
                        type="email"
                        id="email"
                        ref={emailInputRef}
                        required
                    />
                </div>
                <div className={classes.control}>
                    <label htmlFor="password">Your Password</label>
                    <input
                        type="password"
                        id="password"
                        ref={passwordInputRef}
                        required
                    />
                </div>
                <div className={classes.actions}>
                    {!isLoading && (
                        <button>{isLogin ? "Login" : "Create Account"}</button>
                    )}
                    {isLoading && <p> Loading... </p>}
                    <button
                        type="button"
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin
                            ? "Create new account"
                            : "Login with existing account"}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;
