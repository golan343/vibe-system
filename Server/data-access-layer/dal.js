const mongoose = require('mongoose');

function connectAsync() {
  return new Promise((resolve, reject) => {
    const connStr = config.mongodb.connectionString;
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    mongoose.connect(connStr, options, (err, db) => {
      if(err) {
        global.config.err = err;
        reject(err);
        return;
      }
      resolve(db);
    });
  });
};

(async () => {
  try {
      const db = await connectAsync();
      console.log(`We're connected to ${db.connections[0].name} database on MongoDB`);
  }
  catch (err) {
      console.error(err);
  }
})();