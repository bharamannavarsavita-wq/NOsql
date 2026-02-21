require('dotenv').config(); // ✅ Fixed

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Teacher = require('./models/teacher'); // updated

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://127.0.0.1:27017/teacherdb", { // optional: rename DB
    serverSelectionTimeoutMS: 5000
})
.then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error("❌ MongoDB Connection Failed:");
    console.error(err);
});

/* CREATE */
app.post('/teachers', async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.json({ message: "Teacher Added Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* READ */
app.get('/teachers', async (req, res) => {
  try {
    const teachers = await Teacher.find().sort({ createdAt: -1 });
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* UPDATE */
app.put('/teachers/:id', async (req, res) => {
  try {
    const updated = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Teacher not found" });
    res.json({ message: "Teacher Updated Successfully", teacher: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

/* DELETE */
app.delete('/teachers/:id', async (req, res) => {
  try {
    const deleted = await Teacher.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Teacher not found" });
    res.json({ message: "Teacher Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});