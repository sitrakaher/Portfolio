const express = require("express");
const auth = require("../middlewares/auth.middlewares");
const adminOnly = require("../middlewares/adminOnly");
const ProjectController = require("../controllers/project.controller");

const router = express.Router();

router.get('/', ProjectController.get);

router.post('/ajouter', auth, adminOnly, ProjectController.create);

router.put('/modifier/:id', auth, adminOnly, ProjectController.update);

router.delete("/supprimer/:id", auth, adminOnly, ProjectController.delete);

module.exports = router;