import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./modules/redux/store";

import { CleaningAppAdmin } from "./CleaningAppAdmin";

const App = () => {
  return (
    <Provider store={store}>
      <CleaningAppAdmin />
    </Provider>
  );
};

export default App;
