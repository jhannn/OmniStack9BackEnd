const User = require('../models/User');
//index, show, store, update, destroy
// async = indicar função assicrona
// await = then = continuar a ação após da execução da função = cadeia de funções
module.exports = {
    async store(req, res) {
        const { email } = req.body;

        let user = await User.findOne({ email });
        if(!user){
            user = await User.create({ email });
        }

        return res.json(user);
    }
};