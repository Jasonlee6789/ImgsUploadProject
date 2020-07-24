//前端逻辑
import PreviewImg from "./PreviewImg.js";

const imgFile = document.querySelector(".imgFile");
const showContainer = document.querySelector(".showContainer");
const loadContainer = document.querySelector(".loadContainer");

imgFile.addEventListener("change", (e) => {
  console.log(e);
  //把图片取过来并显示  类数组 e.target.files
  const fileList = Array.from(e.target.files);

  fileList.forEach((file) => {
    const previewImg = new PreviewImg(file);
  });

  showLoadContainer();
});

function showLoadContainer() {
  showContainer.style.display = "none";
  loadContainer.style.display = "block";
}
