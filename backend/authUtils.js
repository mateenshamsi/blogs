

import bcrypt from 'bcrypt';

const saltRounds = 10;


export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        throw new Error('Error hashing password: ' + err.message);
    }
};


export const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (err) {
        throw new Error('Error comparing passwords: ' + err.message);
    }
};

