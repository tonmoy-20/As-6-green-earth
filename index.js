const loadCategory = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategory(data.categories));
};
let cart = [];
let total = 0;
let cnt = 1;

const randomTreeLoad = () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayTrees(data.plants));
};

const loadTrees = (id) => {
  const url = id
    ? `https://openapi.programming-hero.com/api/category/${id}`
    : `https://openapi.programming-hero.com/api/plants`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayTrees(data.plants));
};

const displayCategory = (categories) => {
  // step-1
  const catContainer = document.getElementById("cat-container");
  // step-2
  catContainer.innerHTML = "";
  for (let cat of categories) {
    // step-3
    const categoryCard = document.createElement("div");
    categoryCard.innerHTML = `
        <p
            onclick="loadTrees(${cat.id})"
            class="mb-2 pl-[10px] py-4 hover:bg-[#15803D] hover:text-white hover:rounded-md cursor-pointer">
                ${cat.category_name}
              </p>
        `;

    catContainer.append(categoryCard);
  }
};
const displayTrees = (trees) => {
  // console.log(trees);
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";
  for (let tree of trees) {
    // console.log(tree);

    const cardTree = document.createElement("div");
    cardTree.innerHTML = `
    <div onclick="loadDetailsTrees(${tree.id})" class="card bg-base-100 max-w-[343px] shadow-sm">
              <figure class="px-4 pt-4">
                <img
                  src="${tree.image}"
                  alt="${tree.name}"
                  class="rounded-xl h-48 w-full object-cover"
                />
              </figure>
              <div class="card-body">
                <h2 class="card-title add-btn-name">${tree.name}</h2>
                <p class="line-clamp-3">
                  ${tree.description}
                </p>
                <div class="flex items-center mb-3">
                  <button
                    class="text-[#15803D] bg-[#DCFCE7] py-1 px-3 font-medium rounded-full"
                  >
                    ${tree.category}
                  </button>
                  <p class="text-right font-semibold ">৳<span class="add-btn-price">${tree.price}</span></p>
                </div>
                <div class="card-actions">
                  <button onclick="addToCart(event, this)"
                    class="btn rounded-full bg-[#15803D] text-white font-medium text-[16px] w-full px-5 py-3 add-btn"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
    `;

    cardContainer.append(cardTree);
  }
};
// details loading
const loadDetailsTrees = (id) => {
  const uri = `https://openapi.programming-hero.com/api/plant/${id}`;
  fetch(uri)
    .then((res) => res.json())
    .then((data) => displayTreesDetails(data.plants));
};

const displayTreesDetails = (tree) => {
  //   console.log("hello how are you");
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = "";

  detailsContainer.innerHTML = `
        <div class="">
          <h2 class="text-3xl font-bold pb-2">${tree.name}</h2>
        </div>
        <figure class="px-1 pb-2">
                <img
                  src="${tree.image}"
                  alt="${tree.name}"
                  class="rounded-xl h-100 w-full object-cover"
                />
              </figure>
        <p class="pt-2 pb-1 "><b>Category: </b>${tree.category}</p>
        <p class="pb-1"><b>Price: </b>৳${tree.price}</p>
        <p class="pb-4"><b>Description: </b>${tree.description}</p>
      </div>
  
  `;
  document.getElementById("my_modal_3").showModal();
};
// add to cart
const addToCart = (event, btn) => {
  event.preventDefault();
  event.stopImmediatePropagation();

  const card = btn.parentNode.parentNode;
  const addBtnPrice = Number(card.querySelector(".add-btn-price").innerText);
  const addBtnName = card.querySelector(".add-btn-name").innerText;

  const selectItem = {
    addName: addBtnName,
    addPrice: addBtnPrice,
    addCnt: cnt,
  };
  cnt++;
  cart.push(selectItem);
  displayCart();
};

const displayCart = () => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = "";
  for (let item of cart) {
    const newItem = document.createElement("div");
    newItem.innerHTML = `
        <div
                class="flex items-center justify-between px-3 py-2 bg-[#F0FDF4] rounded-lg mb-2"
            >
              <div class="w-[168px]">
                <p class="text-[14px] font-semibold treeName">${item.addName}</p>
                <p class="text-[16px] opacity-50">৳${item.addPrice} x 1</p>
              </div>
              <i onclick="deleteToCart(this,${item.addCnt})" class="fa-solid fa-xmark text-[#d52929]"></i>
              </div>
              
        `;
    total += item.addPrice;
    document.getElementById("tk").innerText = total;
    cartContainer.append(newItem);
  }
};
const deleteToCart = (btn, addCnt) => {
  const item = btn.parentNode;
  const addName = item.querySelector(".treeName").innerText;
  // console.log(addCnt);
  cart = cart.filter((i) => i.addCnt != addCnt);
  displayCart();
  total = 0;
  cart.forEach((i) => (total += i.addPrice));
  document.getElementById("tk").innerText = total;
};

loadCategory();
randomTreeLoad();
