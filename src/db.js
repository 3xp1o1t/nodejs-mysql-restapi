// Usamos /promise para usar la version con promesas habilitadas.
import {createPool} from 'mysql2/promise';

// Usamos export para exportarlo como un modulo propio. 
export const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: 3306,
  database: 'companydb'
});