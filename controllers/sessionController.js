// sessionController.js
import User from "../models/userModel.js";
import boom from "boom";
import { createHash, isValidPassword } from "../utils/utils.js";

const sessionController = {
  async register(req, res) {
    try {
      res.redirect("/login");
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al registrar el usuario",
        error: boom.boomify(error), // Convierte el error en un error de boom
      });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Verificar las credenciales del usuario en la base de datos
      const user = await User.findOne({ email });

      if (!user) {
        throw boom.unauthorized("Credenciales inválidas");
      }

      if (!isValidPassword(user, password)) {
        return res
          .status(403)
          .json({ status: "error", error: "incorrect Password" });
      }

      req.session.user = user;
      res.redirect("/profile");
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error en el inicio de sesión",
        error: boom.boomify(error), // Convierte el error en un error de boom
      });
    }
  },

  // Ruta de cierre de sesión
  async logout(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          throw boom.internal("Error al eliminar la sesión");
        } else {
          res.redirect("/");
        }
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: "Error al cerrar sesión",
        error: boom.boomify(error),
      });
    }
  },

  // Ruta protegida que requiere autenticación
  async adminProtected(req, res) {
    try {
      if (req.session.user) {
        // El usuario está autenticado
        res.json({
          status: "success",
          message: "Acceso permitido a la ruta protegida",
        });
      } else {
        throw boom.unauthorized("No estás autenticado");
      }
    } catch (error) {
      throw boom.boomify(error);
    }
  },

  async getPreference(req, res) {
    try {
      if (req.session.user) {
        res.send(req.session.user.ui_preference);
      } else {
        throw boom.unauthorized("No estás autenticado");
      }
    } catch (error) {
      throw boom.boomify(error);
    }
  },

  async deleteConfig(req, res) {
    try {
      req.session.destroy((err) => {
        if (err) {
          throw boom.internal("Error al eliminar la configuración");
        } else {
          res.json({ status: "success", message: "Configuración eliminada" });
        }
      });
    } catch (error) {
      throw boom.boomify(error);
    }
  },
};

export default sessionController;
