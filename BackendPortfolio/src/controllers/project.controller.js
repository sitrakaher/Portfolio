const ProjectService = require("../services/project.service")

const ProjectController = {
    async get (req, res, next) {
        try {
            const projects = await ProjectService.getAll();
            res.json(projects);
        } catch (error) {
            next(error)
        }
    },

    async create(req, res, next) {
        try {
            const project = await ProjectService.create(req.body);
            res.status(201).json(project);
        } catch (error) {
            next(error)
        }
    },

    async update(req, res, next) {
        try {
            const project = await ProjectService.update(req.params.id, req.body);
            res.json(project);
        } catch (error) {
            next(error)
        }
    },

    async delete(req, res, next) {
        try {
            await ProjectService.delete(req.params.id);
            res.json({ success: true});
        } catch (error) {
            next(error)
        }
    }
};

module.exports = ProjectController;