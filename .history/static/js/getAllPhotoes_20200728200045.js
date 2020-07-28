export function getAllPhotoes() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", "/getPhotos");
    xhr.onload = () => {
      const dataArray = JSON.parse(xhr.response);

      resolve(dataArray);
    };
    //请求时带上JWT，放在HTTP请求头信息内， token通常被包产在名为Authorication的HTTP请求头
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.send();
  });
}

console.log("ensure getAllPhotoes works");
