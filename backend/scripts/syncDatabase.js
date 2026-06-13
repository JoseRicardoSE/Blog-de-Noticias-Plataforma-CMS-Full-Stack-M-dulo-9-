import { sequelize } from '../src/models/index.js';

const syncDatabase = async () => {
  try {
    // sync({ force: true }) recrea las tablas borrando los datos existentes
    await sequelize.sync({ force: true });
    console.log('✅ Base de datos sincronizada correctamente. Tablas creadas.');
  } catch (error) {
    console.error('❌ Error al sincronizar la base de datos:', error);
  } finally {
    process.exit();
  }
};

syncDatabase();
