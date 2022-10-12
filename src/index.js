import express from 'express';
// Cuando importamos un modulo propio es importante usar la extencion .js
// Rutas 
import employeesRoutes from './routes/employees.routes.js';
import indexRoutes from './routes/index.routes.js';

const app = express();

// Habilitamos el uso del formato JSON por default
app.use(express.json());

app.use(indexRoutes);
// Es comun usar el path api cuando se crea un API Rest
app.use('/api', employeesRoutes);

// Middleware para controlar errores 404
app.use((req, res, next) => {
  return res.status(404).json({
    message: "Endpoint not found."
  });
});

app.listen(3000);

console.log('Server running on port 3000');