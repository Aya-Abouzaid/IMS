import crypto from 'crypto';

function generateJWTSecret() {
    return crypto.randomBytes(32).toString('hex'); 
}

const newSecret = generateJWTSecret();
console.log('New JWT Secret:', newSecret);
