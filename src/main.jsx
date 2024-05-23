import React from "react";
import  ReactDOM  from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import '@fortawesome/fontawesome-free/css/all.min.css'
import "./assets/css/main.css"
import RoutingComponent from "./config/router.config";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store";


const elem=document.getElementById("root")
const rootElem=ReactDOM.createRoot(elem)



rootElem.render(//one time call every html should be written in here only
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
    <RoutingComponent/>
    </BrowserRouter>
    </Provider>
    
  </React.StrictMode>
)