import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Moment from "moment";

export default function PaginaPrincipal() {
  const [lista, setLista] = React.useState([]);
  const [error, setError] = React.useState("");
  // const [balance, setBalance] = React.useState([]);

  const traerRegistros = async () => {
    try {
      const respuesta = await axios.get("http://localhost:3000/api/presupuesto");
      setLista(respuesta.data);
    } catch (e) {
      if (error.message === "Network error") {
        setError("NO SE PUEDE CONECTAR AL SERVIDOR");
      } else {
        setError("No hay registros que mostrar");
      }
    }
  };

  // const traerBalance = async () => {
  //   try {
  //     const respuesta = await axios.get("http://localhost:3000/balance");
  //     setBalance(respuesta.data);
  //   } catch (e) {
  //     if (error.message === "Network error") {
  //       setError("Error de conexion");
  //     } else {
  //       setError("No se puede mostrar el resultado");
  //     }
  //   }
  // };

  useEffect(() => {
    traerRegistros();
    // traerBalance();
  }, []);

  const borrarRegistro = async (idRegistroABorrar) => {
    try {
      await axios.delete(
        "http://localhost:3000/api/presupuesto/" + idRegistroABorrar
      );
      traerRegistros();
    } catch (e) {
      if (error.message === "Network error") {
        setError("Error de conexion");
      } else {
        setError("No se puede borrar el registro solicitado");
      }
    }
  };

  const obtenerFecha = (fecha) => {
    let res = Moment.utc(fecha).format("DD/MM/YYYY");
    return res;
  };

  return (
    <div className="principal">
      <h1 className="title1"> PRESUPUESTO PERSONAL</h1>

      <div className="tableArea">
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
            {lista.map((unRegistro, index) => (
              <tr key={index}>
                <td>{obtenerFecha(unRegistro.fecha)}</td>
                <td>{unRegistro.concepto}</td>
                <td>{unRegistro.monto}</td>
                <td>{unRegistro.tipo === 0 ? "Egreso" : "Ingreso"}</td>

                <td>
                  <Link to={"/presupuesto/editar/" + unRegistro.id}>
                    Editar
                  </Link>
                </td>
                <td>
                  <Link
                    className="linkAcciones"
                    onClick={() => borrarRegistro(unRegistro.id)}
                  >
                    Borrar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="lowerArea">
        <Link className="link" to={"/registroForm"}>
          Registrar nueva operación
        </Link>

        {/* <label className="balanceText">Balance: {balance.toString()} </label> */}
      </div>
      <Link to={"/ingresos"}>MOSTRAR INGRESOS</Link>
      <Link to={"/egresos"}>MOSTRAR EGRESOS</Link>
    </div>
  );
}
