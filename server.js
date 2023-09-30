const express = require("express");
const fs = require("fs");
const {validateTaskPayload} = require("./middlewares/validate");

const app = express();
const PORT = 5000;
const dataPath = "./data/tasks.json";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/**
 * For getting all task. Tasks can be filtered based on status on priority, status and sorted bt createdOn
 */
app.get("/tasks", (req, res) => {
  const { status, sort, priority } = req.query;
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
    let tasks = JSON.parse(data);
    if (status) {
      tasks = tasks.filter((task) => task.status == status);
    }
    if (priority) {
        tasks = tasks.filter((task) => task.priority == priority);
      }
    if (sort === "asc") {
      tasks.sort((task1, task2) => new Date(task1.createdOn) - new Date(task2.createdOn));
    } else if (sort === "desc") {
      tasks.sort((a, b) => new Date(b.createdOn) - new Date(a.createdOn));
    }
    return res.status(200).json({
      success: true,
      data: tasks,
      message: "ok",
    });
  });
});

/**
 * Fetch task by ID
 */
app.get("/tasks/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
    const tasks = JSON.parse(data);
    const task = tasks.find((task) => task.id == id);
    if (!task) {
      return res.status(404).json({
        success: true,
        message: "NOT FOUND",
      });
    }
    return res.status(200).json({
      success: true,
      data: task,
      message: "ok",
    });
  });
});

/**
 * Create a task
 */
app.post("/tasks/:id", validateTaskPayload, (req, res) => {
  const { title, description, status, priority } = req.body;
  const { id } = req.params;
  const task = {
    id,
    title,
    description,
    status,
    priority,
    createdOn: new Date(),
  };
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
    const tasks = JSON.parse(data);
    tasks.push(task);
    fs.writeFile(
      dataPath,
      JSON.stringify(tasks, null, 2),
      "utf8",
      async (err, data) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Failed to create task",
          });
        }
        return res.status(201).json({
          success: true,
          message: "Task Created",
          data: task,
        });
      }
    );
  });
});

/**
 * Update task by id
 */
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
    const tasks = JSON.parse(data);
    const taskIndex = tasks.findIndex((task) => task.id == id);
    if (taskIndex == -1) {
      return res.status(404).json({
        success: true,
        message: "TASK NOT FOUND",
      });
    }
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      ...req.body,
    };
    fs.writeFile(
      dataPath,
      JSON.stringify(tasks, null, 2),
      "utf8",
      async (err, data) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Failed to update task",
          });
        }
        return res.status(201).json({
          success: true,
          message: "Task Update",
          data: tasks[taskIndex],
        });
      }
    );
  });
});

/**
 * delete task by id
 */
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }
    let tasks = JSON.parse(data);
    const task = tasks.find((task) => task.id == id);
    if (!task) {
      return res.status(404).json({
        success: true,
        message: "NOT FOUND",
      });
    }
    tasks = tasks.filter((task) => task.id != id);
    fs.writeFile(
      dataPath,
      JSON.stringify(tasks, null, 2),
      "utf8",
      async (err, data) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Failed to delete task",
          });
        }
        return res.status(200).json({
          success: true,
          message: "Task Deleted",
        });
      }
    );
  });
});

/**
 * Fetch tasks based on priority
 */
app.get("/tasks/priority/:level", (req, res) => {
    const { level } = req.params;
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      const tasks = JSON.parse(data).filter((task) => task.priority == level);;
      return res.status(200).json({
        success: true,
        data: tasks,
        message: "ok",
      });
    });
  });

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Server is running on port ${PORT}`);
});
