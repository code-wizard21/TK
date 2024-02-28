import React from "react";
import RoutesDefined from "./router";
import { Provider } from "react-redux";
import store from "./redux/store";
import { jwtDecode } from "jwt-decode";
import { ToastContainer } from "react-toastify";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import "react-toastify/dist/ReactToastify.css";

const LocalStorage = localStorage.getItem("authToken");
if (LocalStorage) {
  const decodedToken = jwtDecode(LocalStorage);
  store.dispatch({ type: "LOGIN_REQUEST", payload: decodedToken });
}

const App = () => {
  return (
    <>
      <ToastContainer />
      <GoogleReCaptchaProvider reCaptchaKey={process.env.REACT_APP_RECAPTCHA_KEY}>
        <Provider store={store}>
          <RoutesDefined />
        </Provider>
      </GoogleReCaptchaProvider>
    </>
  );
};

export default App;
