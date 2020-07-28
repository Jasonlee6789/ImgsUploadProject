export function getAllPhotoes() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("get", "/getPhotos");
    xhr.onload = () => {
      const dataArray = JSON.parse(xhr.response);

      resolve(dataArray);
    };
    xhr.send();
  });
}

console.log("ensure getAllPhotoes works");
