const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "./public/uploads" });
const { merge } = require("./merge");
app.use("/static", express.static("public"));
const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.post("/merge", upload.array("pdfs", 10), function (req, res) {
  console.log(req.files);
  if (req.files.length < 2) {
    console.log("Less than two files to merge");
    return res.status(400).send("Must upload at least two files");
  }
  let filesToMerge = req.files.map((file) => path.join(__dirname, file.path));
  let d = new Date().getTime();
  let outputFilePath = path.join(__dirname, `./public/${d}.pdf`);
  console.log(filesToMerge);
  merge(filesToMerge, outputFilePath, function (err) {
    if (err) {
      console.log("Error merging files:", err);
      return res.status(500).send("Error merging files");
    }
    console.log("Merge success");
    res.redirect(`http://localhost:3000/static/${d}.pdf`);
  });
});

app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});
