var express = require("express");
var nodemailer = require("nodemailer");
var hbs = require ("express-handlebars");

var app = express();


//dice que lo que este en public si el ususario pide esa info
//se le entrega
app.use(express.static("public"));
//convierte todo lo que recibi del formulario y lo mete en una variable dentro de body
//se usa cuando usamos un formulario
app.use(express.urlencoded({extended: true}));
//se puede repetir este codigo con otras carpetas
// ejemplo app.use(express.static("imagenes"));
app.engine("handlebars", hbs());
app.set("view engine", "handlebars");

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "",
        pass:""
    }
});
//hace una peticion mediante un get al server
//req es request que hace el usurio
//res es para devolver informacion al usuario


app.get("/hola", function (req, res){
    //http://localhost/hola?nombre=Gustavo
    
     
//res.send("Bienvenido "+req.query.nombre);
res.send(`Bienvenido ${req.query.nombre}`);
});

//llamar al servidor
//80 es el puerto
//la function es una callback que hace cuando levanto bien el servidor
/*app.listen(8080, function (){
    console.log("App escuchando en el puerto 80");
}
);*/

/*app.get("/", function(req, res){

res.send("pagina principal");
});*/         

//app.post el usuario envia datos a traves de un formulario

// otra manera http://localhost/hola/Gustavo

/*app.get("/hola/:nombre", function (req, res){
    //http://localhost/hola?nombre=Gustavo
    // req.params.nombre
     
res.send("Bienvenido "+req.params.nombre);

});

*/
app.post("/contacto", function(req, res){
    //para ver en console qué mandó el server
    var opciones = {
        from: "kkk@hhh",
        to:"fff@gggg",
        subject: "titulo del mail",
        text: "cuerpo del mail"
    }
    transporter.sendMail(opciones, function(error, data){
        if(error){
            res.send("no se pudo enviar el mail");
        } else {
            res.send(req.body.nombre);
        }
  
    console.log(req.body);
    })
});

app.get("/acerca-de", function (req, res){
res.render("acerca", {titulo: "Mi titulo"});
});


app.listen(8080, function (){
    console.log("App escuchando en el puerto 80");
});
