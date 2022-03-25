import "./App.css";
import "./Styles/PaginaPrincipal.css";
import "./Styles/Form.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PaginaPrincipal from "./PaginaPrincipal";
import AgregarNuevoRegistro from "./Registros/AgregarNuevoRegistro";
import EditarRegistro from "./Registros/EditarRegistro";
import Ingresos from "./Registros/Ingresos";
import Egresos from "./Registros/Egresos";
function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={PaginaPrincipal} />
        <Route exact path="/registroForm" component={AgregarNuevoRegistro} />
        <Route
          exact
          path="/presupuesto/editar/:id"
          component={EditarRegistro}
        />
        <Route exact path="/ingresos" component={Ingresos} />
        <Route exact path="/egresos" component={Egresos} />
      </Router>
    </div>
  );
}

export default App;
