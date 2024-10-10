import bcrypt from "bcrypt";
import Student from "../model/Student.js";
export const getProfileController = async (req, res) => {
  try {
    const { email } = req.headers;
    const student = await Student.findOne({ email }).select("-password");
    if (!student) {
      throw new Error("This student is not register.");
    }

    res.json({
      type: "success",
      student,
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).json({
      type: "Fail",
      message: error.message,
    });
  }
};

export const updateProfileController = async (req, res) => {
  try {
    const { email } = req.headers;
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    // User Can't update Email
    req.body.email = undefined;
    const reqBody = req.body;
    const student = await Student.findOneAndUpdate({ email }, reqBody, {
      new: true,
    }).select("-password");

    res.json({
      type: "success",
      updateStudent: student,
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).json({
      type: "Fail",
      message: error.message,
    });
  }
};
