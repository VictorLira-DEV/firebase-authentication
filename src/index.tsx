import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import "./index.css";
import App from "./App";

ReactDOM.render(
    <AuthContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </AuthContextProvider>,
    document.getElementById("root")
);
