const express = require("express");
const router = express.Router();
const Todo = require("../models/Todo");

// GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
});

// POST create todo
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const todo = new Todo({ title });
    const saved = await todo.save();

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "Failed to create todo" });
  }
});

// GET single todo
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: "Invalid ID or server error" });
  }
});

// UPDATE todo
router.put("/:id", async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});

// DELETE todo
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

module.exports = router;