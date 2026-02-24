const TechnologiesService = require("../services/technologie.service");

const TechnologieController = {
    async getAll (req, res, next) {
        try {
            const technologies = await TechnologiesService.getAll();
            res.json(technologies)
        } catch (error) {
            next(error)
        }
    },

    async getFavorite (req, res, next) {
        try {
            const technologiesFavorite = await TechnologiesService.getFavorite();
            res.json(technologiesFavorite);
        } catch (error) {
            next(error)
        }
    },

    async create (req, res, next) {
        try {
            const technologie = await TechnologiesService.create(req.body)
            res.json(technologie)
        } catch (error) {
            next(error)
        }
    },

    async update (req, res, next) {
        try {
            const technologie = await TechnologiesService.update(req.params.id, req.body);
            res.json(technologie)
        } catch (error) {
            next(error)
        }
    },

    async delete (req, res, next) {
        try {
            await TechnologiesService.delete(req.params.id);
            res.json({ success: true})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TechnologieController;