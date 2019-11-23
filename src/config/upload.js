const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        //destino de armazanagem da imagem
        destination: path.resolve(__dirname, '..', '..', 'uploads'),
        filename: (req, file, callback) => {
            // extensao da imagem
            const ext = path.extname(file.originalname);
            // nome da imagem
            const name = path.basename(file.originalname, ext);
            callback(null, `${name}-${Date.now()}${ext}`);
        }
    })
}