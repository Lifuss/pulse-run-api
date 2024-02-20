import { model } from "mongoose";
import userSchema from "../schemas/mongoose/users";

const User = model("User", userSchema);

export default User;
