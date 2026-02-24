const prisma = require("../../prisma/prisma");

const TechnologiesService= {
    async getAll() {
        return await prisma.technologies.findMany();
    },

    async getFavorite() {
        return await prisma.technologies.findMany({
            where: {isFavorite:true}
        })
    },

    async create(data) {
        const { title, href, level, description, isFavorite} = data;
        return await prisma.technologies.create({
            data:{
                title,
                href,
                level,
                description,
                isFavorite,
            }
        })
    },

    async update(id, data) {
        const { title, href, level, description, isFavorite} = data;
        return await prisma.technologies.update({
            where:{id},
            data:{
                title,
                href,
                level,
                description,
                isFavorite,
            }
        })
    },

    async delete(id) {
        await prisma.technologies.delete({where:{id}});
    }
}

module.exports = TechnologiesService;