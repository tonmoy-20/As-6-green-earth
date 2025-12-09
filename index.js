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
