// run in developer console when topping selection dialog open - will copy json to clipboard
var txt = document.createElement("textarea");
document.body.appendChild(txt);
txt.value = JSON.stringify({
    [$('#restaurant_header [itemprop=name]').text()]:
        $('.dlg_selectpicker.base_ingredient.changeable').first().children()
            .get()
            .map(d => d.textContent)
            .filter(d => d !== "Valitse täyte 1" && d !== "- Ei täytettä -")
}, null, "  ");
txt.select();
document.execCommand("copy");
txt.remove();