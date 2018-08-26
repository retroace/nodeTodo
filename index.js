// requiring essential middleware and express
var express = require('express');
var bodyParser = require("body-parser");

var app = express();

// Setting up EJS(Embedded JavaScript) and bodyparser middleware and path
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public/'))

//Initial variables
var task = [];
var complete = [];

//Adding new task
app.post('/addtask', function (req, res) {
    var newTask = req.body.newtask;
	
	//add the new task from the post route into the array
    task.push(newTask);

	//after adding to the array go back to the root route
    res.redirect("/");
});

// Removing task
app.post("/completetask", function(req, res) {
     var completeTask = req.body.check;

	//check for the "typeof" the different completed task, then add into the complete task
	if (typeof completeTask === "string") {
	    complete.push(completeTask);
		
		//check if the completed task already exist in the task when checked, then remove using the array splice method
		task.splice(task.indexOf(completeTask), 1);
	  } else if (typeof completeTask === "object") {
	    for (var i = 0; i < completeTask.length; i++) {     
	    	complete.push(completeTask[i]);
		    task.splice(task.indexOf(completeTask[i]), 1);
		}
	}
   res.redirect("/");
});

app.get("/", function(req, res) {
    res.render("index", { task: task,complete: complete});
});



app.listen(3000, function () {
  console.log('Listening on port 3000!')
});