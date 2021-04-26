'use strict';

module.exports = function(app) {

    app.all('/', function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      next();
    });
    
    var todoList = require('./controller');

    // membuat router untuk "/" dan render file 'index.ejs' ke browser.
    app.get("/", function (request, resolve) {
        resolve.render("index")
    });

    app.get("/info_api", function (request, resolve) {
        resolve.render("info_api")
    });

    app.get("/dashboard/", function (request, resolve) {
        resolve.render("dashboard")
    });   

    app.get("/monitoring/:id", function (request, resolve) {
        resolve.render("jembatan")
    });

    app.get("/monitoring/", function (request, resolve) {
        resolve.render("monitoring")
    });

    app.get("/pembangunan/", function (request, resolve) {
        resolve.render("pembangunan")
    });

    app.get("/add_pembangunan/", function (request, resolve) {
        resolve.render("add_pembangunan")
    });

    app.get("/view_pembangunan/:id", function (request, resolve) {
        resolve.render("view_pembangunan")
    });

    app.route('/login').post(todoList.login);

    app.route('/listusulan')
        .get(todoList.usulan);

    app.route('/usulan/:id')
        .get(todoList.findUsulan);

    app.route('/tambah_usulan')
        .post(todoList.createUsulan);

    app.route('/update_usulan')
        .put(todoList.updateUsulan);

    app.route('/update_status')
        .put(todoList.updateStatus);

    app.route('/update_status_pmb')
        .put(todoList.updateStatus_pmb);
    
    app.route('/delete_usulan')
        .delete(todoList.deleteUsulan);


    app.route('/listpembangunan')
        .get(todoList.pembangunan);
    
    app.route('/pembangunan/:id')
        .get(todoList.findPembangunan);

    app.route('/tambah_pembangunan')
        .post(todoList.createPembangunan);


    app.route('/jumlahusulan').get(todoList.jumlahusulan); 
    app.route('/jumlahusulanditerima').get(todoList.jumlahusulanditerima); 
    app.route('/jumlahusulanditolak').get(todoList.jumlahusulanditolak);    
        
};