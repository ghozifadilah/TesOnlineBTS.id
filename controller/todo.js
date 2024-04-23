
module.exports = app => {
    const todo = require("../model/todo_model");

//--------------------------------------------------------------------------------------
// controller temukan semua data
app.get("/todo", (req, res) => {
    const { page = null, limit = null } = req.query;
    if (page != null) {
        const offset = (page - 1) * limit;
        todo.getPagination(offset, limit, (err, data) => {
                if (err)
                res.status(500).send({
                    message:
                    err.message || "ada beberapa yang error."
                });
                else res.send(data);
            });
    } else {
        todo.getAll((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "ada beberapa yang error."
                });
            else res.send(data);
        });
    }
});

//--------------------------------------------------------------------------------------
// controller temukan semua data
app.get("/todoList", (req, res) => {
   
        todo.getTODO((err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "ada beberapa yang error."
                });
            else res.send(data);
        });
});

//--------------------------------------------------------------------------------------
// controller temukan data per-id
app.get("/findtodo/:ID", (req, res) => {
    todo.TODOfindById(req.params.ID, (err, data) => {
        if (err) {
            if (err.kind === "tidak_ada") {
                res.status(404).send({
                    message: 'tidak ada data dengan id ID.'
                });
            } else {
                res.status(500).send({
                    message: "error tidak ada data dengan id : ID" 
                });
            }
        } else res.send(data);
    });
});

//--------------------------------------------------------------------------------------
// controller temukan data dengan key
app.get("/todo/pencarian", (req, res) => {
    const { page = 1, limit = 20, key = null } = req.query;
    const offset = (page - 1) * limit;
    todo.pencarian(key, offset, limit, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ada beberapa yang error."
            });
        else res.send(data);
    });
});

//--------------------------------------------------------------------------------------
// controller jumlah data
app.get("/todo/total", (req, res) => {
    todo.jumlah((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ada beberapa yang error."
            });
        else res.send(data);
    });
});

//--------------------------------------------------------------------------------------
// controller jumlah data dengan key
app.get("/todo/totalPencarian", (req, res) => {
    const { key = null } = req.query;
    todo.jumlahPencarian(key, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ada beberapa yang error."
            });
        else res.send(data);
    });
});

//--------------------------------------------------------------------------------------
// controller temukan data per-id
app.get("/todo/:ID", (req, res) => {
    todo.findById(req.params.ID, (err, data) => {
        if (err) {
            if (err.kind === "tidak_ada") {
                res.status(404).send({
                    message: 'tidak ada data dengan id ID.'
                });
            } else {
                res.status(500).send({
                    message: "error tidak ada data dengan id : ID" 
                });
            }
        } else res.send(data);
    });
});
//--------------------------------------------------------------------------------------
// controller buat dan simpan data
app.post('/todo', async (req, res) => {
    // validasi
    if (!req.body) {
        res.status(400).send({
            message: "form tidak boleh kosong!"
        });
    }
    // buatdata
    const todoPost = new todo({
        task: req.body.task,

    });
    
    // simpan data ke tabel  
    todo.create(todoPost, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ada beberapa yang error."
            });
        else res.send(data);
    });
});
// --------------------------------------------------------------------------------------
// controller update data todo
app.put("/todo/:ID", async (req, res) => {
    // validasi
    if (!req.body) {
        res.status(400).send({
            message: "form tidak boleh kosong!"
        });
    }
    //update per-id
    todo.updateById(
        req.params.ID,
        new todo(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "tidak_ada") {
                    res.status(404).send({
                        message: 'tidak ada data  id .'
                    });
                } else {
                    res.status(500).send({
                        message: "tidak bisa update data dengan id :ID "
                    });
                }
            } else res.send(data);
        }
    );
}); // --------------------------------------------------------------------------------------
// Delete todo data per-id
app.delete("/todo/:ID", (req, res) => {
    todo.remove(req.params.ID, (err, data) => {
        if (err) {
            if (err.kind === "tidak_ada") {
                res.status(404).send({
                    message: 'tidak ada data dengan id : ID.'
                });
            } else {
                res.status(500).send({
                    message: "tidak bisa hapus data dengan id :ID "
                });
            }
        } else res.send({ message: 'data terhapus!' });
    });
});
};
