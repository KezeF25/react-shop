import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

import { store } from './redux/store';
import { Provider } from "react-redux";

const rootElem = document.getElementById("root");

if (rootElem){

  const root = ReactDOM.createRoot(rootElem);

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
}
