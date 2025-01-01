const { Sequelize } = require('sequelize');
const sqlite3 = require('sqlite3');
const path = require('path');

const env = process.env;

const dbName = env.DB_NAME || 'fitness_tracker_db';
const dbFile = path.join(__dirname, '..', `${dbName}.sqlite`);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbFile,
  logging: (msg) => {
    if (process.env.NODE_ENV === 'development') {
       console.log(msg);
    }
  },
});


const checkDatabaseConnection = async (retries = 3, delay = 1000) => {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
      return;
    } catch (error) {
      console.error(`Attempt ${attempt}: Unable to connect to the database:`, error);
      if (attempt === retries) {
        console.error('Failed to connect to the database after multiple attempts. Exiting.');
        process.exit(1);
      }
      await new Promise(resolve => setTimeout(resolve, delay));
      delay *= 2;
    }
  }
};


const syncDatabaseModels = async () => {
    try {
      await sequelize.sync();
      console.log('Database models synced successfully.');
    } catch (error) {
      console.error('Error syncing database models:', error);
      process.exit(1);
    }
  };


(async () => {
    await checkDatabaseConnection();
    await syncDatabaseModels()
})();


module.exports = {
    sequelize,
    syncDatabaseModels,
};

/* Example usage:
    const { sequelize, syncDatabaseModels } = require('./config/database');

    async function testDatabase(){
        try{
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
            await syncDatabaseModels();
        } catch(error){
            console.error('Unable to connect to the database: ', error)
        }
    }
    testDatabase()
*/