const mongoose = require("mongoose");
const fs = require("fs");

const { dbFiles } = require("../schema/database");

const file = async (req, res) => {
  try {
    const files = await dbFiles.create({
      name: req.file.originalname,
      idName: req.file.filename,
      description: req.body.description,
    });
    res.send(files);
  } catch (error) {
    res.send(error);
  }
};

const searchFile = async (req, res) => {
  try {
    const files = await dbFiles.find();
    res.send(files);
  } catch (error) {
    res.send(error);
  }
};

const searchFileOne = async (req, res) => {
  const id = req.params.id;

  if (mongoose.isValidObjectId(id)) {
    try {
      const files = await dbFiles.find({
        id,
      });

      files.map((data) => {
        const readStream = fs.createReadStream(`files/${data.idName}`);
        readStream.pipe(res);
      });
    } catch (error) {
      res.send(error);
    }
  } else {
    res.send("not valid id");
  }
};

module.exports = { file, searchFile, searchFileOne };
