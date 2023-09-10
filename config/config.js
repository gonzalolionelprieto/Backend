// config.js
export default {
    express: {
      port: 8080,
    },
    mongo: {
      url: "mongodb+srv://Gonza:3209@cluster0.ueiadmz.mongodb.net/sessionsExample",
      options: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    },
    session: {
      secret: "victoriasecret",
      resave: false,
      saveUninitialized: false,
    },
  };
  