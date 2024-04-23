dokumentasi API  menggunakan Node.js, Express.js, dan MySQL dengan autentikasi menggunakan JWT.
Authentication:

    JWT (JSON Web Token)

API Documentation:

    API Login
        Method: POST
        Endpoint: http://localhost:4000/login
        Fields:
            Email
            Password

    API Daftar Baru
        Method: POST
        Endpoint: http://localhost:4000/registrasi
        Fields:
            Email
            Password
            Name

    API Membuat Checklist
        Method: POST
        Endpoint: http://localhost:4000/todo
        Fields:
            Task

    API Menghapus Checklist
        Method: DELETE
        Endpoint: http://localhost:4000/todo/:ID

    API Menampilkan Checklist yang Sudah Dibuat
        Method: GET
        Endpoint: http://localhost:4000/todo/

    API Detail Checklist
        Method: GET
        Endpoint: http://localhost:4000/todoList/

    API Membuat Item To-Do di dalam Checklist
        Method: POST
        Endpoint: http://localhost:4000/list/
        Fields:
            idTask
            Task
            Status

    API Detail Item
        Dengan Checklist
            Method: GET
            Endpoint: http://localhost:4000/findtodo/:ID
        Hanya Item
            Method: GET
            Endpoint: http://localhost:4000/list/:ID

    API Mengubah Item di dalam Checklist
        Method: PUT
        Endpoint: http://localhost:4000/list/:ID
        Fields:
            ID
            idTask
            Task
            Status

    API Mengubah Status Item di dalam Checklist
        Method: PUT
        Endpoint: http://localhost:4000/changestatus/:ID
        Fields:
            ID
            Status

    API Menghapus Item dari Checklist
        Method: DELETE
        Endpoint: http://localhost:4000/list/:ID