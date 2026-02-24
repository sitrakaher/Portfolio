const express = require("express")
const auth = require("../middlewares/auth.middlewares");
const adminOnly = require("../middlewares/adminOnly");
const TechnologieController = require("../controllers/technologie.controller");
const router = express.Router();

router.get('/', TechnologieController.getAll);

router.get('/favoris', TechnologieController.getFavorite);

router.post("/ajouter", auth,adminOnly, TechnologieController.create);

router.put('/modifier/:id', auth, adminOnly, TechnologieController.update);


router.delete('/supprimer/:id', auth, adminOnly, TechnologieController.delete);

module.exports = router