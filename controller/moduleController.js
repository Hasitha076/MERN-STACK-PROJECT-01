const connectionPool = require('../config/db')

const initializeModuleUi = (req, res) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      const sql = `SELECT * FROM program`;
      connection.query(sql, (err, rows) => {
        if (!err) {
          res.render("module-home", { rows });
        } else {
          console.log(err);
        }
  
        connection.release();
      });
    });
  };
  
  
  const newModuleForm = (req, res) => {
    res.render('module/add-module-form')
  };

  const addModule = (req, res) => {

    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      const module = {
        id: req.body.id,
        module_name: req.body.module_name,
        duration: req.body.duration,
        price: req.body.price
      }
  
      const sql = `INSERT INTO program VALUE(?, ?, ?, ?)`;
      connection.query(sql, [module.id, module.module_name, module.duration, module.price], (err, rows) => {
        if (!err) {
          res.redirect('/module');
        } else {
          console.log(err);
        }
  
        connection.release();
      })
  
    })
  
  };


  const updateModuleForm = (req, res) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      const loadData = `SELECT * FROM program WHERE id=?`;
      connection.query(loadData, [req.params.id], (err, rows) => {
        if (!err) {
          const data = rows[0]
          res.render('module/edit-module-form', {module: data});
        } else {
          console.log(err);
        }
  
        connection.release();
      } )
  
    })
  };
  
  const updateModule = (req, res) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      const module = {
        id: req.body.id,
        module_name: req.body.module_name,
        duration: req.body.duration,
        price: req.body.price
      }
  
      const updateQuery = `UPDATE program SET module_name=?, duration=?, price=? WHERE id=?`;
      connection.query(updateQuery, [module.module_name, module.duration, module.price, module.id], (err, rows) => {
        if(!err) {
          res.redirect('/module');
        }
        else {
          console.log(err);
        }
        console.log(rows)
        connection.release();
      })
    })
  }

  const deleteModule = (req, res) => { 
    connectionPool.getConnection((err, connection) => {
      if(err) {
        throw err;
      }
  
      const deleteQuery = `DELETE FROM program WHERE id=?`;
      connection.query(deleteQuery, [req.params.id], (err, rows) => {
        if(!err) {
          res.redirect('/module');
        }
        else {
          console.log(err);
        }
        connection.release();
      })
    })
   }
  
   const viewModule = (req, res) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      const loadData = `SELECT * FROM program WHERE id=?`;
      connection.query(loadData, [req.params.id], (err, rows) => {
        if (!err) {
          const data = rows[0]
          res.render('module/view-module', {module: data});
        } else {
          console.log(err);
        }
  
        console.log(rows);
        connection.release();
      } )
  
    })
  };


  const findModule = (req, res) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      let searchText = req.body.text;
      console.log(searchText);
  
      const sql = `SELECT * FROM program WHERE module_name LIKE ? OR id LIKE ?`;
      connection.query(
        sql,
        ["%" + searchText + "%", "%" + searchText + "%"],
        (err, rows) => {
          if (!err) {
            res.render("module-home", { rows });
          } else {
            console.log(err);
          }
  
          console.log(rows);
          connection.release();
        }
      );
    });
  };


module.exports = {
    initializeModuleUi,
    newModuleForm,
    addModule,
    updateModuleForm,
    updateModule,
    deleteModule,
    viewModule,
    findModule
}