
    const express = require('express');
        const db = require('./config/database');
        const cors = require("cors");

        //-------------------------------------------------------------------------
        // load body-parser
        const bodyParser = require("body-parser");
        const app = express();
        app.use('/assets', express.static('assets/'));
        app.use(cors());

        //-------------------------------------------------------------------------
        // parse permintaan express - application / json
        app.use(express.json());
        // parse permintaan jenis konten - application / json
        app.use(bodyParser.json());
        // parse permintaan jenis konten - application / x-www-form-urlencoded
        app.use(bodyParser.urlencoded({ extended: true }));

        //-------------------------------------------------------------------------
        // port untuk server lokal
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log('Server berjalan pada port 4000 :');
        });

            //-------------------------------------------------------------------------
            // route index
            app.get("/", (req, res) => {
                res.json({ message: "Tes Online BTS ID" });
            });

             //list route
             require("./controller/list")(app);
             
             //todo route
             require("./controller/todo")(app);
             
             //Login routes
             require("./controller/Login")(app);


        //-------------------------------------------------------------------------
        // Handling Errors
        app.use((err, req, res, next) => {
            err.statusCode = err.statusCode || 500;
            err.message = err.message || "Internal Server Error";
            res.status(err.statusCode).json({
                message: err.message,
            });
        });
        