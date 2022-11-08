const { json } = require("express");
const expess = require("express")

let todolist = [];

let id = 0;

const app = expess();

app.use(expess.json());

app.get("/:todo_id", (req, res) => {
    const {todo_id} = req.params
    const todo = todolist.find((todo) => {
        return todo.id === Number(todo_id)
    
    });
    res.json(todo);
})



app.get("/", (req, res) => {
    res.json(todolist);
})

app.post("/", (req, res) => {
    const {title, discription} = req.body;
    if (!title) {
        return res.status(400).send("title is required")
    }
    todolist.push({"id": id, "title": title, "discription": discription});
    res.status(201).send("todo created")


    id++
})

app.put("/", (req, res) => {
    const {id, title, discription} = req.body
    const todo = todolist.find((todo) => {
        return todo.id === Number(id)
    });
    if (!todo) {
        return res.status(404).send("task doesn't exist");
    }
    if(title) {
        todo.title = title;
    }
    if (discription) {
        todo.discription = discription;
        
    }
    res.status(201).send("task updated");
})

app.delete("/:todo_id", (req, res) => {
    const {todo_id} = req.params
    const index = todolist.findIndex((todo) => {
        return todo.id === Number(todo_id);
    })
    if (index === -1) {
        return res.status(404).send("Task doesn't exist");
    }
    console.log(index);
    todolist.splice(index, 1);
    res.status(204).send("Task Deleted");
})

app.listen(3000, () => {
    console.log("lintenig on port 3000...")
})