export default class PreviewImg {
  constructor(file) {
    this.file = file;
    this.element = this.createElement();
    this.setImg();
  }

  setImg() {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      console.log(fileReader.result);
      this.element.querySelector("img").src = fileReader.result;
    };

    fileReader.readAsDataURL(this.file);
  }

  createElement() {
    const div = document.createElement("div");

    div.classList.add("uploadPhotoItem");
    div.innerHTML = `  <span class="myProgress">
    <span class="plan"></span>
    30%
  </span>
  <img src="img/1.jpg" />
  <span class="pictureName">
    ${this.file.name} 
  </span>
    `;

    document.querySelector(".wantUpload").appendChild(div);
    return div;
    // div.classList.add("imgContainer");
    // div.innerHTML = `
    // <img class="photoName" src="img/1.jpg" />
    // `;
    //document.querySelector(".photoHeader".appendChild(div));
  }
}
