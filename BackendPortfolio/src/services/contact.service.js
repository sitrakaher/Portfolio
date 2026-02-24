const prisma = require("../../prisma/prisma");
const { sendNotificationEmail, sendAutoReply, sendResponseMail } = require("./email.service");

const ContactService = {
    async getAll () {
        return await prisma.contacts.findMany(
            {orderBy:{createdAt:"desc"}}
        );
    },

    async getId (id) {
        return await prisma.contacts.update({
            where: {id}, data:{isRead: true}
        })
    },

    async create (data) {
        const {name, email, message} = data;
        const contact = await prisma.contacts.create({
            data:{name, email, message}
        });
        sendNotificationEmail(email, message).catch(console.error);
        sendAutoReply(name, email).catch(console.error);
        return contact;
    },

    async reply (id, data) {
        const {message} = data;
        const contact = await prisma.contacts.findUnique({
            where:{id}
        });

        if(!contact) throw new Error("Message Introuvable");
        
        await sendResponseMail(contact.email, message);

        return prisma.contacts.update({
            where:{id},
            data:{isReplied:true}
        });
    },

    async delete (id) {
        return await prisma.contacts.delete({where:{id}})
    }
}

module.exports = ContactService;