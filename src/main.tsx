import ReactDOM from "react-dom/client";
import AppRouter from "@routes/AppRouter";
// redux
import { store, persistor } from "@store/index";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// axios
import "./services/axios-global.js";
// styles
import "bootstrap/dist/css/bootstrap.min.css";
import "@styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>
);
