const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const prisma = require("../../prisma/prisma");
const rateLimit = require('express-rate-limit');

const router = express.Router();

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 5, //bloque après 5 tentives échouées
    message:{message:"Trop de tentaives, réessayez plus tard."}
});

router.post('/login', loginLimiter, async (req, res, next)=>{

    const {email, password} = req.body;
    try {
        const user = await prisma.user.findUnique({ where: {email}});
        if(!user) return res.status(401).json({message:'Accès refusé'});

        const valid = await bcrypt.compare(password, user.password);
        if(!valid) return res.status(401).json({message: "Accès refusé"});

        if (user.role !== "ADMIN"){
            return res.status(403).json({message:"Non autorisé"});
        }

        const token = jwt.sign(
            {id: user.id, role:user.role},
                process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.json({token, role:user.role});
    } catch (error) {
        next(error);
    }
});

module.exports = router;