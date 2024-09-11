
API Structure
1. Feature - USER
   APIs
   1. post - '/signup'
   2. post - '/signin'

router.post('/logout', (req, res, next)=>{
    userController.userLogout(req, res, next);
})

router.post('/logout-all-devices', (req, res, next)=>{
    userController.userLogoutFromAllDevices(req, res, next);
})

router.get('/get-details/:userId', (req, res, next)=>{
    userController.getUserDetailById(req, res, next);
})

router.get('/get-all-details', auth, (req, res, next)=>{
    userController.getAllUserDetail(req, res, next);
})

router.put('/update-details/:userId', auth, (req, res, next)=>{
    userController.updateUserDetails(req, res, next);
})

router.post('/avatar-upload', auth, uploadAvatar.single('image'), (req, res, next)=>{
    userController.uploadAvatar(req, res, next);
})

router.get('/get-avatar/:id', auth, (req, res, next)=>{//userId
    userController.fetchAvatar(req, res, next);
