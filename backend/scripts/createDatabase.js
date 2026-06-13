import pkg from 'pg';
const { Client } = pkg;
import 'dotenv/config';

const createDatabase = async () => {
  const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    database: 'postgres', // Conectamos a postgres por defecto para poder crear nuestra bd
  });

  try {
    await client.connect();
    const dbName = process.env.DB_NAME;

    const res = await client.query(`SELECT datname FROM pg_catalog.pg_database WHERE datname = '${dbName}'`);
    if (res.rowCount === 0) {
      console.log(`Creando base de datos: ${dbName}...`);
      await client.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Base de datos ${dbName} creada exitosamente.`);
    } else {
      console.log(`⚠️ La base de datos ${dbName} ya existe.`);
    }
  } catch (error) {
    console.error('❌ Error al crear la base de datos:', error);
  } finally {
    await client.end();
  }
};

createDatabase();
