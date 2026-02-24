const auth = require("../middlewares/auth.middlewares");
const adminOnly = require("../middlewares/adminOnly");
const express = require("express");
const ContactController = require("../controllers/contact.controller");

const router = express.Router();

router.get('/', auth, adminOnly, ContactController.getAll);

router.get('/:id', auth, adminOnly, ContactController.getId)

router.post('/message', ContactController.create);

router.post('/message/:id/reply', auth, adminOnly, ContactController.reply);

router.delete('/supprimer/:id', auth, adminOnly, ContactController.delete)

module.exports = router;