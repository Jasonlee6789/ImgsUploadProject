const Koa = require("koa");
const serve = require("koa-static");
const Router = require("koa-router");
const koaBody = require("koa-body");

const fs = require("fs");
const path = require("path");

const mysql = require("mysql2/promise");

const jwt = require("jsonwebtoken");
const koaJwt = require("koa-jwt");

const secret = "woailijing";

const app = new Koa();

app.use(serve(__dirname + "/static"));

app.use(
  koaBody({
    multipart: true,
  })
);

app.use(
  koaJwt({
    secret: "woailijing",
  }).unless({
    path: [/^\/login/],
  })
);

const router = new Router();

(async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "web09",
  });

  router.post("/upload", async (ctx) => {
    t;
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

    const sql = `INSERT INTO photos (imgUrl,name,useid) VALUES (?,?,?)`;

    await connection.execute(sql, ["/upload/" + imgName, imgName, userid]);
  });

  router.get("/getPhotos", async (ctx) => {
    const sql = `SELECT * FROM photos WHERE useid = "${ctx.state.user.uid}"`;

    const dataArray = await connection.execute(sql);

    // const token = ctx.get("Authorication");

    ctx.body = dataArray;
  });

  //验证用户名和密码
  router.post("/login", async (ctx) => {
    const { username, password } = ctx.request.body;
    const sql = `SELECT * FROM users WHERE username="${username}" AND PASSWORD = "${password}"`;
    let useInfo = await connection.execute(sql);
    console.log(useInfo);
    if (useInfo[0]) {
      const token = jwt.sign({ id: useInfo[0].id }, secret, {
        expiresIn: "2h",
      });

      ctx.body = {
        state: 1,
        msg: "login success",
        data: {
          token,
        },
      };
    } else {
      ctx.body = {
        state: 0,
        msg: "账号或者密码输入错误",
        data: {},
      };
    }
  });
})();

// router.get("/getPhotos", (ctx) => {
//   const token = ctx.get("Authorication");
// jwt.verify(token, secret, (err, decoded) => {
//   if (err) {
//     ctx.body = {
//       state: 0,
//       msg: "login failed",
//       data: {},
//     };
//     return;
//   }
//   ctx.body = {
//     state: 0,
//     msg: "login failed",
//     data: { decoded },
//   };
// });
// });

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
