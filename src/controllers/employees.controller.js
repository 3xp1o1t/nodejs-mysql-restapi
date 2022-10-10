import { pool } from "../db.js";

export const getEmployee = (req, res) => {
  res.send('Obteniendo empleados...');
};

export const createEmployee = async (req, res) => {
  // Extraer los datos del request body
  const { name, salary } = req.body
  // Insertar los datos en la tabla.
  // pool.query retorna un objeto con el resultado de ejecucion.
  const [ rows ] = await pool.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [ name, salary ]);

  // Respondemos con los datos ingresados.
  res.send({
    id: rows.insertId,
    name,
    salary
  });

};

export const updateEmployee = (req, res) => {
  res.send('Actualizando empleado');
};

export const deleteEmployee = (req, res) => {
  res.send('eliminando empleado');
};