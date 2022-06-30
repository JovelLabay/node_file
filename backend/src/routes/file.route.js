const express = require("express");
const multer = require("multer");
const fileController = require("../controllers/file.controller");

const upload = multer({ dest: "files/" });
const router = express();

router.post("/file", upload.single("file"), fileController.file);
router.get("/files", fileController.searchFile);
router.get("/file/:id", fileController.searchFileOne);

module.exports = router;
