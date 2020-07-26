//前端逻辑
import PreviewImg from "./PreviewImg.js";
import { upload } from "./upload.js";
import { getAllPhotoes } from "./getAllPhotoes.js";

const imgFile = document.querySelector(".imgFile");
const imgFileAdd = document.querySelector(".imgFile-add");
const showContainer = document.querySelector(".showContainer");
const loadContainer = document.querySelector(".loadContainer");
const uploadBtn = document.querySelector(".uploadBtn");
//待上传刀server的所有图片
let uploadImgList = [];

imgFile.addEventListener("change", (e) => {
  //   console.log(e);
  //   //把图片取过来并显示  类数组 e.target.files
  //   const fileList = Array.from(e.target.files);

  //   fileList.forEach((file) => {
  //     const previewImg = new PreviewImg(file);
  //   });

  //   showLoadContainer();
  renderPreviewImg(e.target.files);
});

imgFileAdd.addEventListener("change", (e) => {
  renderPreviewImg(e.target.files);
});

function renderPreviewImg(files) {
  // console.log(e);
  //把图片取过来并显示  类数组 e.target.files
  const fileList = Array.from(files);

  fileList.forEach((file) => {
    //   这是一开始的实例化 把file这个文件传进去了
    const previewImg = new PreviewImg(file);
    uploadImgList.push(previewImg);
  });

  showLoadContainer();
}

function showLoadContainer() {
  showContainer.style.display = "none";
  loadContainer.style.display = "block";
}

function hideLoadContainer() {
  showContainer.style.display = "block";
  loadContainer.style.display = "none";
}

// uploadBtn.addEventListener("click", () => {
//   //图片上传到server
//   uploadImgList.forEach((previewImg) => {
//     const formData = new FormData();
//     formData.append("img", previewImg.getFile());
//     //formData.append('img',file)--- formData.append("img", previewImg.file）；
//     const xhr = new XMLHttpRequest();
//     xhr.open("post", "/upload");
//     xhr.onload = () => {
//       console.log(xhr.response);
//     };
//     xhr.send(formData);
//   });
// });

uploadBtn.addEventListener("click", async () => {
  //图片上传到server
  //   uploadImgList.forEach((previewImg) => {
  //     upload(previewImg);
  //   });
  for (const previewImg of uploadImgList) {
    await upload(previewImg);
  }

  uploadCompleted();

  console.log("上传完成了");
});

function uploadCompleted() {
  reset();
  hidemasking();
}

function reset() {
  hideLoadContainer();
  uploadImgList = [];
  document.querySelector(".wantUpload").innerHTML = "";
}

function hidemasking() {
  document.querySelector(".masking").style.display = "none";
}

//回显

async function initUploadedImgs() {
  await getAllPhotoes();
}
console.log(initUploadedImgs());
