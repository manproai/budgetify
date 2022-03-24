const {Account} = require('../../models/userAccountModel');
const {User} = require('../../models/userModel');
const {validateAccount} = require('../../validation/validationAccount');


const createAccount =  async (req, res, next) => {
    const { error } = await validateAccount.validate(req.body);
    if(error){
        return next (new Error(error));
    }
    const {
        accountName, 
        accountCurrency, 
        accountAmount, 
        accountDescription, 
        accountStat
    }   = req.body;

    const isAccount = await Account.findOne({accountName});

    if(isAccount){
        return next (new Error(`${isAccount.accountName} already exists.`));
    }

    const userID = req.user.id;
    const account = await Account.create({
        user: userID,
        accountName, 
        accountCurrency, 
        accountAmount, 
        accountDescription, 
        accountStat,
        accountCreated: new Date().toGMTString()
    });

    if (account) {
        res.status(201).json({
            _id: account.id,
            accountName: account.accountName, 
            accountCurrency: account.accountCurrency, 
            accountAmount: account.accountAmount, 
            accountDescription: account.accountDescription, 
            accountStat: account.accountStat,
            accountCreated: account.accountCreated
    });
    } else {
        return next (new Error('Invalid data'));
    }   

    
};

const updateAccount = async (req, res, next) => {
    
    const user = await User.findById(req.user.id);

    if (!user) {
        return next (new Error('User has invalid cridentials'));
    }

    const account = await Account.findById(req.params.id);

    if (!account) {
        return next (new Error('Not found record with this ID'));
    }

    const savedUserID = account.user.toString();

    if (savedUserID !== user.id) {
        return next (new Error('No data with this user ID'));
    }

    const updatedAccount = await Account.findOneAndUpdate(
        {
            _id: req.params.id
        }, 
        req.body, 
        {
            new: true
        }
    );
    res.status(200).json(updatedAccount);
};


const deleteAccount = async (req, res, next) => {

    const user = await User.findById(req.user.id);

    const account = await Account.findById(req.params.id);

    if (!account) {
        return next (new Error('Invalid Currency account'));
    }

    const savedUserID = account.user.toString();

    if (savedUserID !== user.id) {
        return next (new Error('Invalid user'));
    }

    await account.remove();
    res.status(200).send('Account has been successfully deleted');

};

const getAccounts = async (req, res, next) => {
    const accounts = await Account.find({});
    res.json(accounts);
}

module.exports = {
    createAccount,
    updateAccount,
    deleteAccount,
    getAccounts
};