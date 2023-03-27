const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use ((req, res) => {
res.status(404).send('<p>404 error<p>');

});

module.exports = router;