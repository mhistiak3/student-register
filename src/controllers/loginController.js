import bcrypt from "bcrypt";
import Student from "../model/Student.js";
import { createToken } from "../utility/tokenHandler.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (!student) {
      throw new Error("This student is not register.");
    }
    // compare password
    const isValidPassword = await bcrypt.compare(password, student.password);
    if (!isValidPassword) {
      throw new Error("Invalid Password");
    }

    // create token
    const token = createToken({email,studentId:student._id});
  
    // set in cookies
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,

    });
    
    res.json({
      type: "success",
      token
    });
  } catch (error) {
    console.log("Error: ", error.message);
    res.status(400).json({
      type: "Fail",
      message: error.message,
    });
  }
};
