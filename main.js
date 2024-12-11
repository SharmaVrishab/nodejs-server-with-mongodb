const express = require("express");
const fs = require("fs");
const path = require("path");
const zod = require("zod");
const app = express();
const PORT = 3000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());
// Endpoint to list all files in a directory
// app.get("/files", (req, res) => {
//   const directoryPath = "./files"; // Replace with your directory path

//   fs.readdir(directoryPath, (err, files) => {
//     if (err) {
//       return res
//         .status(500)
//         .send({ error: "Unable to scan directory", details: err.message });
//     }

//     // Map files to include full paths and directory names
//     let fileDetails = files.map((files) => {
//       let filepath = path.join(directoryPath, files);
//       return {
//         filepath: filepath,
//         filename: path.basename(filepath),
//       };
//     });

//     res.json(fileDetails); // Send the file details as JSON
//   });
// });
// app.get("/file/:filename", (req, res) => {
//   const filename = req.params.filename;
//   console.log(`Filename: ${filename}`);
//   res.send(`Requested file: ${filename}`);
// });
// function check_value(req, res, next) {
//   let x = req.body.data;
//   if (x == 0 || x < 0) {
//     res.status(403).json({
//       data: "value is 0 or less than 0",
//     });
//   } else {
//     console.log(x);
//     console.log("line 45");
//     next();
//   }
// }
const schema = zod.array(zod.number());

// // this one is eample
// const schema2 = zod.object({
//   email: zod.string(),

//   password: z.string(),

//   country: z.literal("IN").or(z.literal("US")),

//   kidneys: z.array(z.number()),
// });
app.get("/", (req, res) => {
  let value = req.body.data;
  let response = schema.safeParse(value);
  if (!response.success) {
    res.status(411).json({
      error: "invalid input",
    });
  }
  res.send({
    response,
  });
});

app.use((err, req, res, next) => {
  if (err) {
    res.status(501).json({
      msg: "Something is wrong with our server",
    });
  } else {
    next();
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
