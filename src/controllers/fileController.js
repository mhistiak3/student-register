import File from "../model/File.model.js";
import { uploadFile } from "../utility/fileUpload.js";
import fs from "fs";
export const uploadFileController = async (req, res) => {
  try {
    const { studentId } = req.headers;
    uploadFile(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          type: "Fail",
          message: err.message,
        });
      }
      //   Save filename in db
      const file = await File.create({
        filePath: req.file.filename,
        studentId,
      });
      if (file) {
        return res.json({
          type: "success",
          file,
        });
      }
      res.status(400).json({
        type: "Fail",
        message: "File not uploaded",
      });
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).json({
      type: "Fail",
      message: error.message,
    });
  }
};

export const deleteFileController = async (req, res) => {
  try {
    const { studentId } = req.headers;
    const { fileId } = req.params;

    const file = await File.findOne({ studentId, _id: fileId });
    if (!file) {
      throw new Error("File not found");
    }
    fs.unlink(`${appRoote}/uploads/${file.filePath}`, (err) => {
      if (err) {
        return res.status(400).json({
          type: "Fail",
          message: err.message,
        });
      }
    });

    await File.deleteOne({ studentId, _id: fileId });

    res.json({
      type: "success",
      message: "File deleted successfully",
    })
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).json({
      type: "Fail",
      message: error.message,
    });
  }
};
export const getFileController = async (req, res) => {
  try {
    const { studentId } = req.headers;
    const { fileId } = req.params;

    const file = await File.findOne({ studentId, _id: fileId });
    if (!file) {
      throw new Error("File not found");
    }
    
    res.sendFile(`${appRoote}/uploads/${file.filePath}`);
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).json({
      type: "Fail",
      message: error.message,
    });
  }
};
