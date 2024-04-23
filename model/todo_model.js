
const sql = require("../config/database");
const todo = function (todo) {
   this.ID = todo.ID;
this.task = todo.task;

};

// ---------------------------------------------------------------------------------------
// model menampilkan jumlah semua data di tabel
todo.jumlah = (result) => {
    sql.query('SELECT COUNT(*) AS jumlah FROM todo', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
todo.jumlahPencarian = (key, result) => {
    sql.query(` SELECT COUNT(*) AS jumlah FROM todo WHERE ID = "${key}" OR task LIKE "%${key}%" `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//--------------------------------------------------------------------------------------
//model menampilkan semua data di tabel
todo.pencarian = (key, offset, limit, result) => {
    var dataAll = [];
    sql.query(` SELECT * FROM todo WHERE ID = "${key}" OR task LIKE "%${key}%" LIMIT ${offset}, ${limit} `, (err, res1) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        dataAll.push(res1);
        sql.query(` SELECT COUNT(*) AS jumlah FROM todo WHERE ID = "${key}" OR task LIKE "%${key}%" `, (err, res2) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            dataAll.push(res2[0]);
            result(null, dataAll);
        });
    });
};

// get All Data
// ---------------------------------------------------------------------------------------
todo.getAll = (result) => {
    sql.query("SELECT * FROM todo", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//--------------------------------------------------------------------------------------
//model menampilkan semua data di tabel per limit
todo.getPagination = (offset, limit, result) => {
    var dataAll = [];
    sql.query(` SELECT * FROM todo ORDER BY ID DESC LIMIT ${offset}, ${limit} `, (err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      dataAll.push(res1);
      sql.query('SELECT COUNT(*) AS jumlah FROM todo', (err, res2) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        dataAll.push(res2[0]);
        result(null, dataAll);
      });
    });
};


//--------------------------------------------------------------------------------------
//model menampilkan data per id
todo.findById = (ID, result) => {
    sql.query(` SELECT * FROM todo WHERE ID =  ${ID} `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("data todo: ", res[0]);
            result(null, res[0]);
            return;
        }
        result(null,[]);
    });
};
todo.getTODO = (result) => {
    sql.query("SELECT * FROM todo", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        var promises = [];

        for (let i = 0; i < res.length; i++) {
            let promise = new Promise((resolve, reject) => {
                sql.query(`SELECT * FROM list WHERE idTask = ${res[i].ID}`, (err, res2) => {
                    if (err) {
                        console.log("error: ", err);
                        reject(err);
                    } else {
                        resolve({ 
                            taskID: res[i].ID,
                            Task: res[i].Task,
                            taskName: res[i].task,
                            List: res2 
                        });
                    }
                });
            });
            promises.push(promise);
        }

        Promise.all(promises)
            .then((data) => {
                result(null, data);
            })
            .catch((err) => {
                result(err, null);
            });
    });
};

//--------------------------------------------------------------------------------------
//model menampilkan data per id
todo.TODOfindById = (ID, result) => {
    sql.query(` SELECT * FROM todo WHERE ID =  ${ID} `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        
        var promises = [];

        for (let i = 0; i < res.length; i++) {
            let promise = new Promise((resolve, reject) => {
                sql.query(`SELECT * FROM list WHERE idTask = ${res[i].ID}`, (err, res2) => {
                    if (err) {
                        console.log("error: ", err);
                        reject(err);
                    } else {
                        resolve({ 
                            taskID: res[i].ID,
                            Task: res[i].Task,
                            taskName: res[i].task,
                            List: res2 
                        });
                    }
                });
            });
            promises.push(promise);
        }

        Promise.all(promises)
            .then((data) => {
                result(null, data);
            })
            .catch((err) => {
                result(err, null);
            });
    });
};



//--------------------------------------------------------------------------------------
//model insert data ke tabel
todo.create = (newtodo, result) => {
    sql.query("INSERT INTO todo SET ?", newtodo, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("berhasil : ", { ID: res.insertId, ...newtodo });
        result(null, { ID: res.insertId, ...newtodo });
    });
};

//--------------------------------------------------------------------------------------
// model update data
todo.updateById = (ID, todo, result) => {
    sql.query(
        "UPDATE todo SET ID = ?,task = ?  WHERE ID = ?",
         [todo.ID,todo.task,ID],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "tidak ada data" }, null);
                return;
            }
            console.log("update data.. : ", { ID: ID, ...todo });
            result(null, { ID: ID, ...todo });
        }
    );
}; 
//--------------------------------------------------------------------------------------
// hapus data per-id
todo.remove = (ID, result) => {
    sql.query('DELETE FROM todo WHERE ID = ?', ID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        if (res.affectedRows == 0) {
            result({ kind: "tidak ada data" }, null);
            return;
        }
        console.log("terhapus data ID : ", ID);
        result(null, res);
    });
};
module.exports = todo;