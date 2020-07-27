const Koa = require("koa");
const serve = require("koa-static");
const Router = require("koa-router");
const koaBody = require("koa-body");

const fs = require("fs");
const path = require("path");

const mysql = require("mysql2/promise");

const app = new Koa();

app.use(
  koaBody({
    multipart: true,
  })
);

app.use(serve(__dirname + "/static"));

const router = new Router();

(async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "web09",
  });

  router.post("/upload", async (ctx) => {
    //   console.log(ctx.request.files);
    let { img } = ctx.request.files;
    console.log(img);
    //   saveImg(img);
    const readStream = fs.createReadStream(img.path);
    const imgName = Date.now() + "_" + img.name;
    let uploadPath = path.resolve(
      __dirname,
      "../ImgsUploadProject/static/upload",
      imgName
    );
    console.log(uploadPath);

    const writeStream = fs.createWriteStream(uploadPath);

    readStream.pipe(writeStream);

    ctx.body = "Uploaded successfully";

    const sql = `INSERT INTO photos (imgUrl,name) VALUES (?,?)`;

    await connection.execute(sql, ["/upload/" + imgName, imgName]);
  });

  router.get("/getPhotos", async (ctx) => {
    const sql = `SELECT * FROM photos`;

    const dataArray = await connection.execute(sql);

    ctx.body = dataArray;
  });
})();

app.use(router.routes());

app.listen(8080);

// function saveImg(img) {
//   const readStream = fs.createReadStream(img.path);
//   const imgName = img.name + "_" + Date.now();
//   let uploadPath = path.resolve(
//     __dirname,
//     "../ImgsUploadProject/static/upload",
//     imgName
//   );
//   console.log(uploadPath);
//   const writeStream = fs.createWriteStream(uploadPath);
//   readStream.pipe(writeStream);

//   async function saveImgToData(address, imgname) {
//     const connection = await mysql.createConnection({
//       host: "localhost",
//       user: "root",
//       password: "",
//       database: "web09",
//     });

//     const sql = `INSERT INTO photos (imgUrl,name) VALUES (?,?)`;

//     await connection.execute(sql, [address, imgname]);
//   }

//   saveImgToData("upload/" + imgName, imgName);
// }
