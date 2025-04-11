import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderName: {
    type: String,
    minLenght: [2, "Name must contain at least 2 characters!"],
  },
  subject: {
    type: String,
    minLenght: [2, "Subject must contain at least 2 characters!"],
  },
  message: {
    type: String,
    minLenght: [2, "message must contain at least 2 characters!"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Message = mongoose.model("Message", messageSchema);
