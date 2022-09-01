import bcrypt from 'bcryptjs';
const saltRounds = 10;

export default {
    cryptPassword: async basePass => {
        return await bcrypt.hash(basePass, saltRounds);
    },

    comparePass: async(basePass, hashedPass) => {
        return await bcrypt.compare(basePass, hashedPass);
    }
}