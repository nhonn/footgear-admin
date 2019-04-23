var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res) {
  res.render("index", { title: "Express" });
});

router.get("/accounts", function(req, res) {
  res.render("accounts", { title: "Quản lý tài khoản" });
});

router.get("/account-detail", (req, res) => {
  res.render("accountDetail", { title: "Thông tin tài khoản" });
});

module.exports = router;
