'use strict';

var response = require('./res');
var connection = require('./conn');
var jwt = require('jsonwebtoken');


exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};


exports.login = function(req, res) {
    var email = req.body.email;
    var password = req.body.password

    //console.log(email)
    //console.log(password)

    if (email && password) {
        // check if user exists
                connection.query('SELECT * FROM table_users WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
                    
                    if (results.length > 0) {
                        
                        const user = {
                            //id:1,
                            email:email,
                            password:password
                        }
                 
                        jwt.sign({user:user}, 'secretkey', (err,token) => {
                            res.json({
                                token:token
                            });
                        });   


                        //request.session.loggedin = true;
                        //request.session.username = username;
                        //response.redirect('/listpegawai');
                    } else {
                        res.send('Incorrect Email and/or Password!');
                        
                    }           
                    //res.end();
                });
            } else {
                res.send('Please enter Email and Password!');
                //res.end();
            }
};

exports.usulan = function(req, res) {
    connection.query('SELECT * FROM table_usulan', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.pembangunan = function(req, res) {
    connection.query('SELECT * FROM table_pembangunan', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.findUsulan = function(req, res) {
    
    var id = req.params.id;

    connection.query('SELECT * FROM table_usulan where id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)

        }
    });
};

exports.findPembangunan = function(req, res) {
    
    var id = req.params.id;

    connection.query('SELECT * FROM table_pembangunan where id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)

        }
    });
};


exports.findNip = function(req, res) {
    
    var nip = req.params.nip;
    
    connection.query('SELECT * FROM tabel_log where nip = ?',
    [ nip ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

exports.createUsulan = function(req, res) {
    
    var tgl_usulan = req.body.tgl_usulan;
    var nama = req.body.nama;
    var kota = req.body.kota;
    var desa = req.body.desa;
    var alamat = req.body.alamat;
    var status = req.body.status;
    var tahun = req.body.tahun;
    var lat = req.body.lat;
    var lon = req.body.lon;
    var image = req.body.path_image;
    var stat = req.body.stat;

    connection.query('INSERT INTO table_usulan (tgl_usulan, nama, kota, desa, alamat, status, tahun, lat, lon, image, stat) values (?,?,?,?,?,?,?,?,?,?,?)',
    [tgl_usulan, nama, kota, desa, alamat, status, tahun, lat, lon, image, stat],  
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan data usulan perbaikan!", res);
        }
    });
};

exports.createPembangunan = function(req, res) {
    
    var tgl_usulan= req.body.tgl_usulan;
    var nama = req.body.nama;
    var kota = req.body.kota;
    var desa = req.body.desa;
    var alamat = req.body.alamat;
    var lebar = req.body.lebar;
    var panjang = req.body.panjang;
    var lat = req.body.lat;
    var lon = req.body.lon;
    var stat = req.body.stat;

    connection.query('INSERT INTO table_pembangunan (tgl_usulan, nama, kota, desa, alamat, panjang, lebar, lat, lon, stat) values (?,?,?,?,?,?,?,?,?,?)',
    [tgl_usulan, nama, kota, desa, alamat, panjang, lebar, lat, lon, stat],  
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menambahkan data usulan perbaikan!", res);
        }
    });
};


exports.updateUsulan = function(req, res) {
    
    var id = req.body.id;

    connection.query('UPDATE table_usulan SET nama = ? WHERE id = ?',
    [ nama, id], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah nama!", res)
        }
    });
};

exports.deleteUsulan = function(req, res) {
    
    var id = req.params.id;

    connection.query('DELETE FROM table_usulan WHERE id = ?',
    [ id ], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil menghapus usulan!", res)
        }
    });
};


exports.updateStatus = function(req, res) {
    
    var get_id = req.body.get_id;
    var stat = req.body.stat;

    connection.query('UPDATE table_usulan SET stat = ? WHERE id = ?',
    [ stat, get_id], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah status !", res)
        }
    });
};

exports.updateStatus_pmb = function(req, res) {
    
    var get_id = req.body.get_id;
    var stat = req.body.stat;

    connection.query('UPDATE table_pembangunan SET stat = ? WHERE id = ?',
    [ stat, get_id], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("Berhasil merubah status !", res)
        }
    });
};


exports.jumlahusulan = function(req, res) {
    
            connection.query('SELECT count(id) AS jumlah_usulan FROM table_usulan', function (error, rows, fields){
                if(error){
                    console.log(error)
                } else{
                    response.ok(rows, res)
                }
            }); 
};

exports.jumlahusulanditolak = function(req, res) {
    
    connection.query('SELECT count(id) AS jumlah_usulan FROM table_usulan WHERE stat="2" ', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    }); 
};

exports.jumlahusulanditerima = function(req, res) {
    
    connection.query('SELECT count(id) AS jumlah_usulan FROM table_usulan WHERE stat="1" ', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    }); 
};


exports.cekData = function(req, res) {
    
    var nip = req.params.nip;
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    var currentDate =  [year, month, day].join('-');

    connection.query('SELECT count(nip) AS cek_data FROM tabel_log WHERE nip= ? AND tanggal = ?',
    [ nip, currentDate], 
    function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    });
};

