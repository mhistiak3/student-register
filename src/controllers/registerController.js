import bcrypt from "bcrypt";
import Student from "../model/Student.js";

export const registerController = async (req, res) => {
  try {
    const reqBody = req.body;
    // Check if student is alredy exist
    const student = await Student.findOne({ email: reqBody.email });
    if (student) {
      throw new Error("This student is alredy exist.");
    }
    // Hash Password
    const hashedPassword = await bcrypt.hash(reqBody.password, 10);
    reqBody.password = hashedPassword;

    const newStudent = await Student.create(reqBody);

    res.json({
      type: "success",
      message: "Student register success.",
      student: { ...newStudent._doc, password: undefined },
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).json({
      type: "Fail",
      message: error.message,
    });
  }
};
