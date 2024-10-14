const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const accountSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});


accountSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
