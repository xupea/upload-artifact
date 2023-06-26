const Koa = require("koa");
const send = require("koa-send");
const Router = require("@koa/router");
const multer = require("@koa/multer");
const fs = require("fs");
const path = require("path");

const app = new Koa();
const router = new Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { platform, arch } = req.body;
    const relativeDest = `uploads/${platform}/${arch}`;
    const dest = path.resolve(relativeDest);

    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }

    cb(null, relativeDest); // 指定上传文件的保存路径
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

router.get("/download/remote-assistance/:platform/:arch", async (ctx) => {
  const { platform, arch } = ctx.params;
  const path = `uploads/${platform}/${arch}/IMG_5814.jpg`;
  ctx.attachment(path);
  await send(ctx, path);
});

// add the router to our app
app.use(router.routes());
app.use(router.allowedMethods());

// start the server
app.listen(3000);
