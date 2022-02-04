import bcrypt from 'bcrypt'

export default [
    {
        name: "Hassan Rehan Memon",
        email: "hr@gmail.com",
        password: bcrypt.hashSync("hassan789", 10),
        isAdmin: true,
    },
    {
        name: "HR",
        email: "hr1@gmail.com",
        password: bcrypt.hashSync("hassan789", 10),
    }, {
        name: "Uchiha",
        email: "hr2@gmail.com",
        password: bcrypt.hashSync("hassan789", 10),
    },
]