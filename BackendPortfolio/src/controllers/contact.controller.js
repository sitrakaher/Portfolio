const ContactService = require("../services/contact.service");
const contactSchema = require("../validator/contact.validator");

const ContactController = {
    async getAll (req, res, next){
        try {
            const contacts = await ContactService.getAll();
            res.json(contacts);
        } catch (error) {
            next(error)
        }
    },

    async getId (req, res, next) {
        const {id} = req.params;
        try {
            const contact = await ContactService.getId(id);
            res.json(contact);
        } catch (error) {
            next(error)
        }
    },

    async create (req, res, next) {
        const parsed = contactSchema.safeParse(req.body);
        if(!parsed.success) return res.status(400).json({error: "Données invalides"});

        try {
            const contact = await ContactService.create(parsed.data);
            res.json({success: true, contact});
        } catch (error) {
            next(error);
        }
    },

    async reply (req, res, next) {
        try {
            await ContactService.reply(req.params.id, req.body.message);
            res.json({success: true});
        } catch (error) {
            next(error)
        }
    },

    async delete (req, res, next) {
        try {
            await ContactService.delete(req.params.id);
            res.json({success:true});     
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ContactController;