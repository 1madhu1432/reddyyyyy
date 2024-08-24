const express = require("express");
const {
  sendMail,
  saveMails,
  getAllMails,
  AddMails,
  deleteMail,
  getAllMailSender,
  AddEmailSenderDetails,
  saveEmailbody,
  getEmailBody,
  getHistoryEmails,
  updateMailBody,
  userSenderMailDelete,
} = require("./mailController");
const authMiddleware = require("../middlwares/authMiddleware");

const router = express.Router();

router.post("/save", saveMails);
router.post("/all-sendermails", authMiddleware, getAllMailSender);
router.post("/all", authMiddleware, getAllMails);
router.post("/send", authMiddleware, sendMail);
router.post("/add-mails", authMiddleware, AddMails);
router.post("/delete/:id", authMiddleware, deleteMail);
router.post("/add-sendermails", authMiddleware, AddEmailSenderDetails);
router.post("/save-emailbody", authMiddleware, saveEmailbody);
router.post("/all-emailbody", authMiddleware, getEmailBody);
router.post("/emails-history", authMiddleware, getHistoryEmails);
router.post("/update-emailbody", authMiddleware, updateMailBody);
router.delete("/delete-sendermails/:id", authMiddleware, userSenderMailDelete);
module.exports = router;
