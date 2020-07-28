export function getAllPhotoes() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", "/getPhotos");
    xhr.onload = () => {
      const dataArray = JSON.parse(xhr.response);

      resolve(dataArray);
    };
    const token = localStorage.getItem("token");
    xhr.setRequestHeader("Authorization", "Bearer " + token);
    xhr.send();
  });
}

console.log("ensure getAllPhotoes works");
