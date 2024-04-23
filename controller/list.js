
module.exports = app => {
    const list = require("../model/list_model");

//--------------------------------------------------------------------------------------
// controller temukan semua data
app.get("/list", (req, res) => {
    const { page = null, limit = null } = req.query;
    if (page != null) {
        const offset = (page - 1) * limit;
        list.getPagination(offset, limit, (err, data) => {
                if (err)
                res.status(500).send({
                    message:
                    err.message || "ada beberapa yang error."
                });
                else res.send(data);
            });
    } else {
        list.getAll((err, data) => {
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
// controller temukan data dengan key
app.get("/list/pencarian", (req, res) => {
    const { page = 1, limit = 20, key = null } = req.query;
    const offset = (page - 1) * limit;
    list.pencarian(key, offset, limit, (err, data) => {
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
app.get("/list/total", (req, res) => {
    list.jumlah((err, data) => {
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
app.get("/list/totalPencarian", (req, res) => {
    const { key = null } = req.query;
    list.jumlahPencarian(key, (err, data) => {
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
app.get("/list/:ID", (req, res) => {
    list.findById(req.params.ID, (err, data) => {
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
app.post('/list', async (req, res) => {
    // validasi
    if (!req.body) {
        res.status(400).send({
            message: "form tidak boleh kosong!"
        });
    }
    // buatdata
    const listPost = new list({
        idTask: req.body.idTask,
        task: req.body.task,
        status: req.body.status,

    });
    
    // simpan data ke tabel  
    list.create(listPost, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "ada beberapa yang error."
            });
        else res.send(data);
    });
});

// --------------------------------------------------------------------------------------
// controller update data list
app.put("/list/:ID", async (req, res) => {
    // validasi
    if (!req.body) {
        res.status(400).send({
            message: "form tidak boleh kosong!"
        });
    }
    //update per-id
    list.updateById(
        req.params.ID,
        new list(req.body),
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
// --------------------------------------------------------------------------------------
// controller update data list
app.put("/changestatus/:ID", async (req, res) => {
    // validasi
    if (!req.body) {
        res.status(400).send({
            message: "form tidak boleh kosong!"
        });
    }
    //update per-id
    list.updateStatus(
        req.params.ID,
        new list(req.body),
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


// Delete list data per-id
app.delete("/list/:ID", (req, res) => {
    list.remove(req.params.ID, (err, data) => {
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
