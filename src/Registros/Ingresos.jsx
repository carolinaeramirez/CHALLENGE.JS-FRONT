import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "moment";

export default function Registros() {
  const [ingresos, setIngresos] = React.useState([]);
  const [error, setError] = React.useState("");

  const traerIngresos = async () => {
    try {
      const respuesta = await axios.get("http://localhost:3000/tipoI");
      setIngresos(respuesta.data);
    } catch (e) {
      if (error.message === "Network error") {
        setError("Error de conexion");
      } else {
        setError("No se puede mostrar el resultado");
      }
    }
  };

  React.useEffect(() => {
    traerIngresos();
  }, []);

  const obtenerFecha = (fecha) => {
    let res = Moment.utc(fecha).format("DD/MM/YYYY");
    return res;
  };

  return (
    <div>
      <table className="table">
        <thead className="tableTitle">
          <tr className="tr">
            <th>Fecha</th>
            <th>Concepto</th>
            <th>Monto</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          {ingresos.map((unRegistro, index) => (
            <tr key={index}>
              <td>{obtenerFecha(unRegistro.fecha)}</td>
              <td>{unRegistro.concepto}</td>
              <td>{unRegistro.monto}</td>
              <td>{unRegistro.tipo === 0 ? "Egreso" : "Ingreso"}</td>
              <td>
                <Link to={"/presupuesto/editar/" + unRegistro.id}>Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
