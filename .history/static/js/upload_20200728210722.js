export function upload(previewImg) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("img", previewImg.getFile());
    // 图片上传到 server
    const xhr = new XMLHttpRequest();
    xhr.open("post", "/upload");
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.upload.onprogress = (e) => {
      console.log(e.loaded, e.total);
      previewImg.updateProgress(e.loaded, e.total);
    };
    //请求时带上JWT，放在HTTP请求头信息内， token通常被包产在名为Authorication的HTTP请求头
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    // 显示上传进度
    xhr.send(formData);
  });
}
