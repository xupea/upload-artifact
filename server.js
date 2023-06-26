const Koa = require("koa");
const Router = require("@koa/router");
const multer = require("@koa/multer");

const app = new Koa();
const router = new Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // 指定上传文件的保存路径
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // 保持原始文件名
  },
});

const upload = multer({ storage }); // note you can pass `multer` options here

// add a route for uploading single files
router.post("/upload-single-file", upload.single("file"), (ctx) => {
//   console.log("ctx.request.file", ctx.request.file);
//   console.log("ctx.file", ctx.file);
  console.log("ctx.request.body", ctx.request.body);
  ctx.body = "done";
});

// add the router to our app
app.use(router.routes());
app.use(router.allowedMethods());

// start the server
app.listen(3000);
