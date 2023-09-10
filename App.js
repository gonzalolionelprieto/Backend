import express from "express";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io"; // Importa la clase Server desde socket.io
import handlebars from "express-handlebars";
import flash from "express-flash"; // Debes importar express-flash aquí
import sessionRouter from "./routes/sessionRoutes.js";
import viewRouter from "./routes/viewRoutes.js";
import config from "./config/config.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import passport from "passport";
import initializePassport from "./config/passport.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const httpServer = new HttpServer(app);
const io = new SocketIOServer(httpServer); // Crea un servidor Socket.IO vinculado a tu servidor HTTP

// Configura el motor de plantillas Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");

// Conexión a la base de datos MongoDB utilizando la configuración
mongoose.connect(config.mongo.url, config.mongo.options);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
db.once("open", () => {
  console.log("Conexión exitosa a la base de datos MongoDB");
});

// Configura el middleware de express-session utilizando la configuración
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: config.mongo.url,
      dbName: "sessionsExample",
      mongoOptions: config.mongo.options,
    }),
    secret: config.session.secret,
    resave: config.session.resave,
    saveUninitialized: config.session.saveUninitialized,
  })
);

//inicializar passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Define un evento de conexión de Socket.IO
io.on("connection", (socket) => {
  console.log("Un cliente se ha conectado");

  // Maneja la desconexión de clientes
  socket.on("disconnect", () => {
    console.log("Un cliente se ha desconectado");
  });
});

// Configura express-flash
app.use(flash());

// Luego, configura tus rutas
app.use("/api/sessions", sessionRouter);
app.use("/", viewRouter);

app.use(errorMiddleware);

httpServer.listen(config.express.port, () =>
  console.log("Server up on port " + config.express.port)
);

export { io };
