const CreateUserValidator = (data) => {
    if(!data.name) {
        return new Error('Le nom est obligatoire.')
    } else if(!data.email) {
        return new Error('L email est obligatoire.')
    } else if(data.password && data.password.length < 6) {
        return new Error('Le mot de passe doit contenir au moins 6 caractères.')
    }
    return false;
}




module.exports = CreateUserValidator;