const mongoose = require("mongoose");

const emailBodySchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    html: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const EmailBody = mongoose.model("EmailBody", emailBodySchema);
module.exports = EmailBody;
