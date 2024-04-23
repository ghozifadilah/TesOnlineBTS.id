
const sql = require("../config/database");
const list = function (list) {
   this.ID = list.ID;
this.idTask = list.idTask;
this.task = list.task;
this.status = list.status;

};

// ---------------------------------------------------------------------------------------
// model menampilkan jumlah semua data di tabel
list.jumlah = (result) => {
    sql.query('SELECT COUNT(*) AS jumlah FROM list', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

//model menampilkan jumlah semua data di tabel
list.jumlahPencarian = (key, result) => {
    sql.query(` SELECT COUNT(*) AS jumlah FROM list WHERE ID = "${key}" OR idTask LIKE "%${key}%" OR task LIKE "%${key}%" OR status LIKE "%${key}%" `, (err, res) => {
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
list.pencarian = (key, offset, limit, result) => {
    var dataAll = [];
    sql.query(` SELECT * FROM list WHERE ID = "${key}" OR idTask LIKE "%${key}%" OR task LIKE "%${key}%" OR status LIKE "%${key}%" LIMIT ${offset}, ${limit} `, (err, res1) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        dataAll.push(res1);
        sql.query(` SELECT COUNT(*) AS jumlah FROM list WHERE ID = "${key}" OR idTask LIKE "%${key}%" OR task LIKE "%${key}%" OR status LIKE "%${key}%" `, (err, res2) => {
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
list.getAll = (result) => {
    sql.query("SELECT * FROM list", (err, res) => {
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
list.getPagination = (offset, limit, result) => {
    var dataAll = [];
    sql.query(` SELECT * FROM list ORDER BY ID DESC LIMIT ${offset}, ${limit} `, (err, res1) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      dataAll.push(res1);
      sql.query('SELECT COUNT(*) AS jumlah FROM list', (err, res2) => {
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
list.findById = (ID, result) => {
    sql.query(` SELECT * FROM list WHERE ID =  ${ID} `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("data list: ", res[0]);
            result(null, res[0]);
            return;
        }
        result(null,[]);
    });
};

//--------------------------------------------------------------------------------------
//model insert data ke tabel
list.create = (newlist, result) => {
    sql.query("INSERT INTO list SET ?", newlist, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("berhasil : ", { ID: res.insertId, ...newlist });
        result(null, { ID: res.insertId, ...newlist });
    });
};

//--------------------------------------------------------------------------------------
// model update data
list.updateById = (ID, list, result) => {
    sql.query(
        "UPDATE list SET ID = ?,idTask = ? , task = ?  WHERE ID = ?",
         [list.ID,list.idTask,list.task,ID],
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
            console.log("update data.. : ", { ID: ID, ...list });
            result(null, { ID: ID, ...list });
        }
    );
}; 
//--------------------------------------------------------------------------------------
// model update data status only
list.updateStatus = (ID, list, result) => {
    sql.query(
        "UPDATE list SET ID = ?, status = ?  WHERE ID = ?",
         [list.ID, list.status, ID],
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
            console.log("update data.. : ", { ID: ID, ...list });
            result(null, { ID: ID, ...list });
        }
    );
}; 

//--------------------------------------------------------------------------------------
// hapus data per-id
list.remove = (ID, result) => {
    sql.query('DELETE FROM list WHERE ID = ?', ID, (err, res) => {
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
module.exports = list;