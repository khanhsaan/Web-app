import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
// var array = [];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", {
        server_port: port,
    });
});

class taskClass{
    constructor(weight, time, name){
        this.weight = weight;
        this.time = time;
        this.name = name;
    }

    getWeight(){
        return this.weight;
    }

    getTime(){
        return this.time;
    }

    getName(){
        return this.name;
    }
}

var timeTotal = 0;
app.post("/result", (req, res) =>{
    let taskN = req.body["task_name"];
    let taskW = req.body["task_weight"];
    let taskT = req.body["task_time"];
    let totalT = req.body["total_time"];
    var array = [];
    var result= [];
    // array.push(taskW)
    for(var i = 0; i < taskW.length && i < taskT.length && i < taskN.length; i ++){
        var task = new taskClass(taskW[i], taskT[i], taskN[i]);
        array.push(task);
        timeTotal += taskT[i];
        console.log(task.getName());
    }
    array.sort((a, b) => b.getWeight() - a.getWeight());
    console.log("Total time: " + totalT);
    for(var i = 0; i < array.length; i ++){
        console.log("Task: " + array[i].getName() + " " + array[i].getTime());
        if(totalT - array[i].getTime() >=0){
            console.log("Picked Task: " + array[i].getName() + " " + array[i].getTime());
            result.push(array[i]);  
            totalT -= array[i].getTime();
            console.log("Total time left: " + totalT);
        }
    }
    console.log(result);
    res.render("result.ejs", {
        result_array: result,
        time_left: totalT,
        sever_port: port,
        total_time: timeTotal,
    });
    // res.redirect("/main");   
});

app.get("/facebook", (req, res) =>{
    res.redirect("http://www.facebook.com");
});

app.post("/main", (req, res) => {
    let totalT = req.body["total_time"];
    res.render("main.ejs", {
        server_port: port,
        total_time: timeTotal,
        time_left: totalT,
    });
});

app.get("/main", (req, res) => {
    let totalT = req.body["total_time"];
    res.render("main.ejs", {
        server_port: port,
        total_time: timeTotal,
        time_left: totalT,
    });
});

app.get("/result", (req, res) => {
    res.render("result.ejs");
});

app.listen(port, () => {
    console.log("Server running on port 3000");
});

