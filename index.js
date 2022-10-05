import express from 'express';

// Cuando importamos un modulo propio es importante usar la extencion .js
import {pool} from './db.js';

const app = express();

// Test de mysql2/promise
app.get('/ping', async (req, res) => {
  const [result] = await pool.query('SELECT 1 + 1 AS pong');

  res.json(result);
});

// Rutas
app.get('/employees', (req, res) => {
  res.send('Obteniendo empleados...');
});

app.post('/employees', (req, res) => {
  res.send('Creando empleado');
});

app.put('/employees', (req, res) => {
  res.send('Actualizando empleado');
});

app.delete('/employees', (req, res) => {
  res.send('eliminando empleado');
});

app.listen(3000);

console.log('Server running on port 3000');