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
