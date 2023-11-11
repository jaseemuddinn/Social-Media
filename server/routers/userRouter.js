const requireUser = require('../middlewares/requireUser');
const userController = require('../controllers/userController')
const  router = require('express').Router(); 


router.post('/follow', requireUser, userController.followOrUnfollowUser) 
router.get('/getPostsOfFollowing', requireUser, userController.getPostsOfFollowing)
router.post('/getMyPosts', requireUser, userController.getMyPosts)
router.post('/getUserPosts', requireUser, userController.getUserPosts)
router.delete('/', requireUser, userController.deleteMyProfile)
router.get('/getMyInfo', requireUser, userController.getMyInfo)


module.exports = router;