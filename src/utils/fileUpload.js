
import multer from 'multer';

var avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/avatars')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var postImageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/postImages')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

const uploadAvatar = multer({ storage: avatarStorage });
const uploadPostImage = multer({ storage: postImageStorage });

export {uploadAvatar, uploadPostImage}