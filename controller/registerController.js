const connectionPool = require('../config/db')

const initializeRegisterUi = (req, res) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      const sql = `SELECT * FROM registration`;
      connection.query(sql, (err, rows) => {
        if (!err) {
          res.render("registration-home", { rows });
        } else {
          console.log(err);
        }
  
        connection.release();
      });
    });
  };
  
  
  const newRegisterForm = (req, res) => {

    connectionPool.getConnection((err, connection) => {
        if (err) {
          throw err;
        }
    
        const sql = `SELECT * FROM program`;
        const sql_1 = `SELECT * FROM student`;
        
        Promise.all([
          executeQuery(connection, sql),
          executeQuery(connection, sql_1),
        ])
          .then(([programRows, studentRows]) => {
            // Render the template with the combined data
            res.render("registration/register-student-form", { programRows, studentRows });
          })
          .catch((err) => {
            console.error(err);
          })
          .finally(() => {
            connection.release();
          });

          function executeQuery(connection, sql) {
            return new Promise((resolve, reject) => {
              connection.query(sql, (err, rows) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(rows);
                }
              });
            });
          }
      });
  };

  const registerStudent = (req, res) => {

    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      const register = {
        id: req.body.id,
        student_name: req.body.student_name,
        module_name: req.body.module_name,
        register_time: req.body.register_time
      }
  
      const sql = `INSERT INTO registration VALUE(?, ?, ?, ?)`;
      connection.query(sql, [register.id, register.student_name, register.module_name, register.register_time], (err, rows) => {
        if (!err) {
          res.redirect('/register');
        } else {
          console.log(err);
        }
  
        connection.release();
      })
  
    })
  
  };

  const updateRegisterForm = (req, res) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      const sql_1 = `SELECT * FROM student`;
  
      // Execute the first query to get data for students
      connection.query(sql_1, (err, studentRows) => {
        if (err) {
          console.log(err);
          connection.release();
          throw err;
        }
  
        // Assuming you have a 'students' variable in your view
        const students = studentRows;
  
        const loadData = `SELECT * FROM registration WHERE id=?`;
  
        // Execute the second query to get data for registration
        connection.query(loadData, [req.params.id], (err, registrationRows) => {
          if (err) {
            console.log(err);
            connection.release();
            throw err;
          }
  
          // Assuming you have a 'register' variable in your view
          const register = registrationRows[0];
  
          const sql_2 = `SELECT * FROM program`;
  
          // Execute the third query to get data for programs
          connection.query(sql_2, (err, programRows) => {
            if (err) {
              console.log(err);
              connection.release();
              throw err;
            }
  
            // Assuming you have a 'programs' variable in your view
            const programs = programRows;
  
            // Render the view and pass all the data
            res.render('registration/edit-register-form', { students, register, programs });
  
            // Release the connection
            connection.release();
          });
        });
      });
    });
  };
  

  
  const updateRegister = (req, res) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      const register = {
        id: req.body.id,
        student_name: req.body.student_name,
        module_name: req.body.module_name,
        register_date: req.body.register_date
      }
  
      const updateQuery = `UPDATE registration SET student_name=?, module_name=? WHERE id=?`;
      connection.query(updateQuery, [register.student_name, register.module_name, register.id], (err, rows) => {
        if(!err) {
          res.redirect('/register');
        }
        else {
          console.log(err);
        }
        console.log(rows)
        connection.release();
      })
    })
  }

  const deleteRegister = (req, res) => { 
    connectionPool.getConnection((err, connection) => {
      if(err) {
        throw err;
      }
  
      const deleteQuery = `DELETE FROM registration WHERE id=?`;
      connection.query(deleteQuery, [req.params.id], (err, rows) => {
        if(!err) {
          res.redirect('/register');
        }
        else {
          console.log(err);
        }
        connection.release();
      })
    })
   }
  
   const viewRegister = (req, res) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      const loadData = `SELECT * FROM registration WHERE id=?`;
      connection.query(loadData, [req.params.id], (err, rows) => {
        if (!err) {
          const data = rows[0]
          res.render('registration/view-register', {register: data});
        } else {
          console.log(err);
        }
  
        console.log(rows);
        connection.release();
      } )
  
    })
  };


  const findRegister = (req, res) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      let searchText = req.body.text;
      console.log(searchText);
  
      const sql = `SELECT * FROM registration WHERE module_name LIKE ? OR student_name LIKE ?`;
      connection.query(
        sql,
        ["%" + searchText + "%", "%" + searchText + "%"],
        (err, rows) => {
          if (!err) {
            res.render("registration-home", { rows });
          } else {
            console.log(err);
          }
  
          console.log(rows);
          connection.release();
        }
      );
    });
  };


  const findRegisterStudent = (req, res) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      const loadData = `SELECT * FROM registration WHERE module_name=?`;
      connection.query(loadData, [req.params.module_name], (err, rows) => {
        if (!err) {
          const data = rows[0];
          res.render('registration/all-view', {rows, data});
        } else {
          console.log(err);
        }
  
        console.log(rows);
        connection.release();
      } )
  
    })
  };




module.exports = {
    initializeRegisterUi,
    newRegisterForm,
    registerStudent,
    updateRegisterForm,
    updateRegister,
    deleteRegister,
    viewRegister,
    findRegister,
    findRegisterStudent
}