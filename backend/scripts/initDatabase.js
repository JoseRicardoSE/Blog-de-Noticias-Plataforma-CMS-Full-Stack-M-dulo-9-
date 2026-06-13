import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

const initDatabase = async () => {
  try {
    console.log('Iniciando proceso de configuración de la base de datos...\n');

    console.log('Paso 1: Creando base de datos...');
    await execAsync('npm run db:create');
    console.log('Paso 1 completado.\n');

    console.log('Paso 2: Sincronizando modelos...');
    await execAsync('npm run db:sync');
    console.log('Paso 2 completado.\n');

    console.log('Paso 3: Poblando datos de prueba...');
    await execAsync('npm run db:seed');
    console.log('Paso 3 completado.\n');

    console.log('🎉 ¡Base de datos inicializada correctamente!');
  } catch (error) {
    console.error('❌ Error durante la inicialización:', error.stdout ? error.stdout : error);
  }
};

initDatabase();
