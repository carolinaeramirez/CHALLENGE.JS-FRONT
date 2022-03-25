import axios from "axios";
import React, { useState } from "react";

export default function AgregarNuevoRegistro(props) {
  const [form, setForm] = useState({
    fecha: "",
    concepto: "",
    monto: "",
    tipo: "",
  });

  const handleChangeFecha = (e) => {
    const newState = JSON.parse(JSON.stringify(form));
    newState.fecha = e.target.value;
    setForm(newState);
  };
  const handleChangeConcepto = (e) => {
    const newState = JSON.parse(JSON.stringify(form));
    newState.concepto = e.target.value;
    setForm(newState);
  };
  const handleChangeMonto = (e) => {
    const newState = JSON.parse(JSON.stringify(form));
    newState.monto = e.target.value;
    setForm(newState);
  };

  const changeTipo = (e) => {
    form.tipo = e.target.value === "ingreso" ? "ingreso" : "egreso";
  };

  const guardar = async () => {
    await axios.post("http://localhost:3000/api/presupuesto", form);
    props.history.push("/");
  };

  return (
    <div className="form">
      <div>
        <label className="labelForm">Fecha:</label>
        <input className="inputForm"
          type="date"
          name="fecha"
          placeholder="Fecha aaaa/mm/dd"
          value={form.fecha}
          onChange={handleChangeFecha}
        />
      </div>
      <div>
        <label className="labelForm">Concepto:</label>
        <input
          className="inputForm"
          type="text"
          name="concepto"
          placeholder="Concepto"
          value={form.concepto}
          onChange={handleChangeConcepto}
        />
      </div>
      <div>
        <label className="labelForm"> Monto: </label>
        <input className ="inputForm"
          type="text"
          name="monto"
          placeholder="$ Monto"
          value={form.monto}
          onChange={handleChangeMonto}
        />
      </div>

      <div onChange={() => changeTipo}>
        <input className ="toggleIngreso"
          type="radio"
          id="opcionIngreso"
          name="tipo"
          value="ingreso"
          onChange={changeTipo}
        />
        <label for="opcionIngreso">Ingreso</label>
        <input className ="toggleEgreso"
          type="radio"
          id="opcionEgreso"
          name="tipo"
          value="egreso"
          onChange={(e) => changeTipo}
        />
        <label for="opcionEgreso">Egreso</label>
      </div>
      <div className="buttonGuardar">
        <button onClick={guardar}>Guardar</button>
      </div>
    </div>
  );
}
