const z = require('zod');

const contactSchema = z.object({
    email: z.string().email(),
    message: z.string(),
})

module.exports = contactSchema;