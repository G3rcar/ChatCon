/* The API controller for tasks
 Exports 3 methods:
 * post - Creates a new task
 * list - Returns a list of tasks
 * show - Displays a task and
 */


var Task = require('../models/tasks.js');

exports.post = function(req, res) {
    var newTask = new Task({
        title: req.body.title,
        content: req.body.content
    });
    newTask.save();
    res.redirect('/tasks/create');
}

exports.list = function(req, res) {
    Task.find(function(err, threads) {
        res.send(threads);
    });
}

// first locates a thread by title, then locates the replies by thread ID.
exports.show = (function(req, res) {
    Task.findOne({title: req.params.title}, function(error, thread) {
        var posts = Post.find({thread: thread._id}, function(error, posts) {
            res.send([{thread: thread, posts: posts}]);
        });
    })
});
