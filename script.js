const products = [
	{
		id: 1,
		name: "iPhone 15",
		brand: "Apple",
		price: 1200,
		stock: 3,
		image:
			"https://object.pscloud.io/cms/cms/Photo/img_0_77_5082_0_6_OUJzlo.webp",
	},
	{
		id: 2,
		name: "Galaxy S23",
		brand: "Samsung",
		price: 900,
		stock: 5,
		image: "https://object.pscloud.io/cms/cms/Photo/img_0_77_4230_3_1.webp",
	},
];

class Price {
	getFinal(price) {
		return price;
	}
}

class DiscountPrice extends Price {
	getFinal(price) {
		return price * 0.9;
	}
}

class PromoPrice extends Price {
	getFinal(price) {
		return price - 100;
	}
}

const pricing = new DiscountPrice();
const cart = [];

function renderProducts(list) {
	const catalog = document.getElementById("catalog");
	catalog.innerHTML = "";

	list.forEach((p) => {
		const card = document.createElement("div");
		card.className = "card";

		card.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="price">${pricing.getFinal(p.price)} $</p>
      <p class="stock">Остаток: ${p.stock}</p>
      <button ${p.stock === 0 ? "disabled" : ""}>
        ${p.stock === 0 ? "Нет в наличии" : "В корзину"}
      </button>
    `;

		card.querySelector("button").onclick = () => addToCart(p.id);
		catalog.appendChild(card);
	});
}

function addToCart(id) {
	const product = products.find((p) => p.id === id);

	if (product.stock > 0) {
		product.stock--;
		cart.push(product);
		renderProducts(products);
		renderCart();
	}
}

function renderCart() {
	const cartEl = document.getElementById("cart");
	const totalEl = document.getElementById("total");

	cartEl.innerHTML = "";
	let total = 0;

	cart.forEach((p) => {
		const price = pricing.getFinal(p.price);
		total += price;
		cartEl.innerHTML += `<li>${p.name} — ${price} $</li>`;
	});

	totalEl.textContent = total.toFixed(2);
}

document.getElementById("brandFilter").onchange = (e) => {
	const value = e.target.value;
	const filtered =
		value === "all" ? products : products.filter((p) => p.brand === value);

	renderProducts(filtered);
};

renderProducts(products);
