const {db, query} = require("../database");

const userController = (req,res,next) => {
    db.serialize( async () => {
      try {
        const users = await query('SELECT * FROM users');

        res.json(users);
      } catch(err){
        res.status(400).json({"error":err.message});
      }
    });
}

module.exports = userController;