const connectionPool = require('../config/db')

const initializeUi = (req, res) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      const sql = `SELECT * FROM student`;
      connection.query(sql, (err, rows) => {
        if (!err) {
          res.render("student-home", { rows });
        } else {
          console.log(err);
        }

        
  
        connection.release();
      });
      
    });

    
  };
  
  
  const newStudentForm = (req, res) => {
    res.render('student/add-student-form')
  };

  const addStudent = (req, res) => {

    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      const student = {
        nic: req.body.nic,
        name: req.body.name,
        mobile: req.body.mobile,
        address: req.body.address
      }
  
      const sql = `INSERT INTO student VALUE(?, ?, ?, ?)`;
      connection.query(sql, [student.nic, student.name, student.mobile, student.address], (err, rows) => {
        if (!err) {
          res.redirect('/student');
        } else {
          console.log(err);
        }
  
        console.log(rows)
        connection.release();
      })
  
    })
  
  };


  const updateStudentForm = (req, res) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      const loadData = `SELECT * FROM student WHERE nic=?`;
      connection.query(loadData, [req.params.nic], (err, rows) => {
        if (!err) {
          const data = rows[0]
          res.render('student/edit-student-form-1', {student: data});
        } else {
          console.log(err);
        }
  
        connection.release();
      } )
  
    })
  };
  
  const updateStudent = (req, res) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      const student = {
        nic: req.body.nic,
        name: req.body.name,
        mobile: req.body.mobile,
        address: req.body.address
      }
  
      const updateQuery = `UPDATE student SET name=?, mobile=?, address=? WHERE nic=?`;
      connection.query(updateQuery, [student.name, student.mobile, student.address, student.nic], (err, rows) => {
        if(!err) {
          res.redirect('/student');
        }
        else {
          console.log(err);
        }
        console.log(rows)
        connection.release();
      })
    })
  }

  const deleteStudent = (req, res) => { 
    connectionPool.getConnection((err, connection) => {
      if(err) {
        throw err;
      }
  
      const deleteQuery = `DELETE FROM student WHERE nic=?`;
      connection.query(deleteQuery, [req.params.nic], (err, rows) => {
        if(!err) {
          res.redirect('/student');
        }
        else {
          console.log(err);
        }
        connection.release();
      })
    })
   }
  
   const viewStudent = (req, res) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      const loadData = `SELECT * FROM student WHERE nic=?`;
      connection.query(loadData, [req.params.nic], (err, rows) => {
        if (!err) {
          const data = rows[0]
          res.render('student/view', {student: data});
        } else {
          console.log(err);
        }
  
        console.log(rows);
        connection.release();
      } )
  
    })
  };


  const findStudent = (req, res) => {
    connectionPool.getConnection((err, connection) => {
      if (err) {
        throw err;
      }
  
      let searchText = req.body.text;
      console.log(searchText);
  
      const sql = `SELECT * FROM student WHERE name LIKE ? OR address LIKE ?`;
      connection.query(
        sql,
        ["%" + searchText + "%", "%" + searchText + "%"],
        (err, rows) => {
          if (!err) {
            res.render("student-home", { rows });
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
    initializeUi,
    newStudentForm,
    addStudent,
    updateStudentForm,
    updateStudent,
    deleteStudent,
    viewStudent,
    findStudent
}