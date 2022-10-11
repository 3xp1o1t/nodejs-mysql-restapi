import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM employee');
  res.send(rows);
};

export const getEmployee = async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id]);

  // La consulta retorna un array con un unico valor si es que fue encontrado, si no, retorna un array vacio.
  if (rows.length <= 0) return res.status(404).json({
    message: 'Employee not found'
  });

  res.send(rows[0]);
}

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

export const deleteEmployee = async (req, res) => {
  // El pool.query retorna un objeto cuya propiedad affectedRows determina si se modifico o elimino una o mas filas.
  // Se puede usar para saber si la consulta resulto.
  const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id]);

  if (result.affectedRows <= 0) return res.status(404).json({
    message: "Employee not found"
  });

  // El estatus 204 es comun verlo cuando una operacion es exitosa pero no se envia ningun contenido.
  res.sendStatus(204);
};


export const updateEmployee = (req, res) => {
  res.send('Actualizando empleado');
};
