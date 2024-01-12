const merge = require("easy-pdf-merge");

let p1 = "D:/Js Projects";
let p2 = "D:/Js Projects";
let d = new Date().getTime();

merge(p1, p2, `public/${d}.pdf`, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log("Success");
  return d;
});

module.exports = { merge };
