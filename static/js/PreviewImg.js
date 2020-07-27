export default class PreviewImg {
  constructor(file) {
    this.file = file;
    this.element = this.createElement();
    this.setImg();
  }

  updateProgress(loaded, total) {
    const percent = Math.floor((loaded / total) * 100);

    this.showProcess();
    this.updateProcessView(percent);

    if (percent >= 100) {
      this.hideProcess();
      //   this.hidemasking();
    }
  }

  updateProcessView(percent) {
    this.element.querySelector(".plan").style.width = percent + "%";
    this.element.querySelector(".val").innerText = percent + "%";
  }

  showProcess() {
    this.element.querySelector(".myProgress").style.display = "block";
  }

  hideProcess() {
    this.element.querySelector(".myProgress").style.display = "none";
  }

  getFile() {
    return this.file;
  }

  setImg() {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      //   console.log(fileReader.result);
      this.element.querySelector("img").src = fileReader.result;
    };

    fileReader.readAsDataURL(this.file);
  }

  createElement() {
    const div = document.createElement("div");
    div.classList.add("uploadPhotoItem");
    div.innerHTML = `  <span class="myProgress">
    <span class="plan"></span>
    <span class="val">30%</span>
  </span>
  <img src="img/1.jpg" />
  <span class="pictureName">
    ${this.file.name} 
  </span>
    `;

    document.querySelector(".wantUpload").appendChild(div);
    return div;
  }
}
