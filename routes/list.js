const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const List = mongoose.model("List", listSchema);

// 할 일 가져오기
router.get("/", async (req, res) => {
  try {
    const items = await List.find({});
    res.json(items);
  } catch (err) {
    res.status(500).send("불러오기 오류");
  }
});

// 할 일 추가
router.post("/", async (req, res) => {
  const { name } = req.body;

  try {
    const newList = new List({ name, date: new Date() });
    await newList.save();
    res.status(201).json(newList);
  } catch (err) {
    res.status(500).send("추가 오류");
  }
});

// 할 일 삭제
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await List.findByIdAndDelete(id);
    res.status(200).send('선택한 할 일 삭제');
  } catch(err) {
    res.status(500).send('삭제 오류');
  }
});

module.exports = router;