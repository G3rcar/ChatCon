/**
 * Created by gerardo on 30/05/15.
 * Routes to apiTasks
 */
var express = require('express');
var router = express.Router();

var apiTask = require('../controllers/apiTasks.js');

router.get('/create',function(req, res, next){
   res.render('tasks/create');
});
router.post('/create',apiTask.post);

module.exports = router;