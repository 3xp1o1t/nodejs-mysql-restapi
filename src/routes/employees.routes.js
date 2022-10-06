import {Router} from 'express';

const router = Router();

router.get('/employees', (req, res) => {
  res.send('Obteniendo empleados...');
});

router.post('/employees', (req, res) => {
  res.send('Creando empleado');
});

router.put('/employees', (req, res) => {
  res.send('Actualizando empleado');
});

router.delete('/employees', (req, res) => {
  res.send('eliminando empleado');
});

export default router;