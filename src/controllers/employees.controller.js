import { pool } from "../db.js";

export const getEmployees = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employee');
    res.send(rows);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal, intenta de nuevo."
    });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [req.params.id]);

    // La consulta retorna un array con un unico valor si es que fue encontrado, si no, retorna un array vacio.
    if (rows.length <= 0) return res.status(404).json({
      message: 'Employee not found'
    });

    res.send(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal, intenta de nuevo"
    });
  }
}

export const createEmployee = async (req, res) => {
  // Extraer los datos del request body
  const { name, salary } = req.body
  try {
    // Insertar los datos en la tabla.
    // pool.query retorna un objeto con el resultado de ejecucion.
    const [ rows ] = await pool.query('INSERT INTO employee (name, salary) VALUES (?, ?)', [ name, salary ]);

    // Respondemos con los datos ingresados.
    res.send({
      id: rows.insertId,
      name,
      salary
    });
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal, intenta de nuevo."
    });
  }
};

export const deleteEmployee = async (req, res) => {
  // El pool.query retorna un objeto cuya propiedad affectedRows determina si se modifico o elimino una o mas filas.
  // Se puede usar para saber si la consulta resulto.
  try {
    const [result] = await pool.query('DELETE FROM employee WHERE id = ?', [req.params.id]);

    if (result.affectedRows <= 0) return res.status(404).json({
      message: "Employee not found"
    });

    // El estatus 204 es comun verlo cuando una operacion es exitosa pero no se envia ningun contenido.
    res.sendStatus(204);
  } catch (error) {
    return res.statu(500).json({
      message: "Algo salio mal, intenta de nuevo."
    });
  }
};


export const updateEmployee = async (req, res) => {
  // Extramos los datos necesarios para la actualizacion.
  const { id } = req.params;
  const { name, salary } = req.body;

  try {
    // IFNULL: si no recibe ningun valor, conservara el valor que ya tenia, si no, usara el nuevo ?
    const [ result ] = await pool.query('UPDATE employee SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?',
    [name, salary, id]);

    if (result.affectedRows === 0) return res.status(404).json({
      message: 'Employee not found'
    });

    const [rows] = await pool.query('SELECT * FROM employee WHERE id = ?', [id]);

    res.send(rows[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Algo salio mal, intenta de nuevo."
    });
  }

};
