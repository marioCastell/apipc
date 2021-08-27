const {Router} = require('express')
const  router = Router();
const {
    createUser, 
    getUsers,
    quantifies
} = require('../controllers/userControllers')

router.route('/')
    .post(createUser)
    .get(getUsers)

router.route('/quantifies')
    .get(quantifies)
module.exports = router;