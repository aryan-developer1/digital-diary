const express = require('express')
const router = express.Router()
const {createDiary,editDiary,deleteDiary,fetchDiary} = require("../controllers/diary.controller")

router.post("/create",createDiary)
router.post("/update/:id",editDiary)
router.delete("/delete/:id",deleteDiary)
router.get("/diaries",fetchDiary)
router

module.exports = router