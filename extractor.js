// run in developer console when category containing correct pizzas is open
// will add restaurant to localStorage.pizze_extractor
(function() {
    const data = localStorage.pizze_extractor
        ? JSON.parse(localStorage.pizze_extractor)
        : {};

    const id = db_short.value;
    const restaurant = data[id] = {
        id: id,
        url: document.location.href,
        name: document.querySelector('#restaurant_header [itemprop=name]').textContent,
        toppings: [].map.call(document.querySelectorAll(".dlg_selectpicker.base_ingredient.changeable:first-of-type option"), d => d.textContent)
            .filter(d => d !== "Valitse täyte 1" && d !== "- Ei täytettä -"),
        prices: []
    };

    if (restaurant.toppings.length === 0) {
        console.error("Open topping picker dialog first");
        return;
    }

    const category = document.querySelector("#product_categories .category_item.active > a").id.substring(5);
    const prodButtons = document.getElementById(category).querySelectorAll("button.edit_product.edit_only");

    for (let i = 0; i < prodButtons.length; i++) {
        const prod = prodButtons[i].closest('.product');
        const options = prod.querySelectorAll("select.product_variant option");
        const price = {
            toppingCount: prod.querySelector(".product_ingredients span").textContent.split(",").length,
            sizes: []
        };
        restaurant.prices.push(price);
        for (let p = 0; p < options.length; p++) {
            const opt = options[p];
            price.sizes.push({
                name: opt.dataset.name,
                price: opt.dataset.price
            });
        }
    }

    localStorage.pizze_extractor = JSON.stringify(data);
    console.log(localStorage.pizze_extractor);
})();
