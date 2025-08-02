const Diary = require("../models/diary. model");

const createDiary = async (req, res) => {
  try {
    const { title, date, mood, description, user, content } = req.body;
    console.log("data", req.body);

    if (!title || !date || !mood || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const diary = await Diary.create({
      title: title,
      date: date,
      mood,
      description: description,
      user: user,
      content,
    });

    return res.status(200).json({
      success: true,
      message: "diary inserted successfully!",
      diary,
    });
  } catch (error) {
    console.error("Error while creating diary:", error); // <-- this helps
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message, // <-- helpful for debugging
    });
  }
};

const editDiary = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    console.log("bdy me kya aya", id, data);
    const diary = await Diary.findByIdAndUpdate(id, data);

    if (!diary) {
      return res.status(404).json({
        success: false,
        message: "diary not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "diary updated",
      diary,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

const deleteDiary = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDiary = await Diary.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
      message: "diary deleted successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

const fetchDiary = async (req, res) => {
  try {
    //add pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    //search logic
    const searchTerm = req.query.search || "";
    

    const diaries = await Diary.find({
      $or: [
        { title: { $regex: searchTerm, $options: "i" } },
        { mood: { $regex: searchTerm, $options: "i" } }
      ]
    })
      .sort({ _id: -1 })
      .skip(skip)
      .limit(limit);
    
    return res.status(200).json({
      success: true,
      message: "diary fetched successfully!",
      diaries,
      page,
      limit,
      total: diaries.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

module.exports = { createDiary, editDiary, deleteDiary, fetchDiary };
