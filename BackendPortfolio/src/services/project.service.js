const prisma = require("../../prisma/prisma")

const ProjectService = {
    async getAll() {
        return await prisma.projects.findMany({
            include:{technologies:true}
        });
    },

    async create(data) {
        const { technologieIds, title, lienProjet, github,type, image} = data;
         return await prisma.projects.create({
            data:{
                title,
                lienProjet,
                github,
                image,
                type,
                technologies: {
                    connect:(technologieIds || []).map(id=> ({id}))
                }
            }
         });
    },

    async update(id, data) {
        const { technologieIds, title, lienProjet, github, type, image} = data;
        return await prisma.projects.update({
            where :{id},
            data:{
                title,
                lienProjet,
                github,
                image,
                type,
                technologies: {
                    set: (technologieIds || []).map(id=> ({id}))
                }
            },
            include: { technologies:true}
        });
    },

    async delete(id) {
        return await prisma.projects.delete({where:{id}});
    }
};

module.exports = ProjectService;