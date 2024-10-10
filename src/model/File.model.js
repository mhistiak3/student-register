import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    filePath: {
      type: String,
      required: true,
    },
    studentId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const File = mongoose.model("File", studentSchema);

export default File;
