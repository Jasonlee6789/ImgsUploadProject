// const parentElement = document.querySelector(".photoHeader");
export default class ShowImg {
  constructor(data) {
    this.data = data;
    this.createElement();
  }

  createElement() {
    console.log(this.data);
    const div = document.createElement("div");
    div.classList.add("photoItem");
    div.innerHTML = `
    <img src="${this.data.imgUrl}" />
    <span>${this.data.name}</span>
    `;
    document.querySelector(".photoContainer").appendChild(div);
    return div;
  }
}
