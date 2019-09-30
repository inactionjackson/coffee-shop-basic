(() => {
    const hostURL = "localhost:5500";
    //#region (nav scrolling)
    let bCheckScroll = true;

    const pageStartRect = document
        .querySelector("#page-start")
        .getBoundingClientRect();
    const pageStartPos = pageStartRect.top;
    const pageStartHeight = pageStartRect.height;

    const navRef = document.querySelector("nav")
    const navHeight = navRef.getBoundingClientRect()
        .height;
    const changeNavClasses = (scrolled, animated) => {
        if (scrolled) {
            navRef.classList.add("nav-scrolled");
            if (animated) {
                navRef.classList.add("nav-animated");
            } else {
                navRef.classList.remove("nav-animated");
            }
        } else {
            navRef.classList.remove("nav-scrolled");
            if (animated) {
                navRef.classList.add("nav-animated");
            } else {
                navRef.classList.remove("nav-animated");
            }
        }
    }
    const navScrollHandler = (e) => {
        if (bCheckScroll) {
            bCheckScroll = false;
            if (window.scrollY >= navHeight) {
                changeNavClasses(true, true);
            } else if (window.scrollY < navHeight * 0.5 && document.querySelector("nav").classList.contains("nav-scrolled")) {
                changeNavClasses(false, true);
            }
        } else {
            setTimeout(() => {
                bCheckScroll = true;
            }, 30);
        }
    }
    if (window.location.hash) {
        changeNavClasses(true, false);
    }
    window.addEventListener("scroll", navScrollHandler);
    //#endregion (nav scrolling)

    const placeholderDesc = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi sint
 alias culpa quibusdam deleniti incidunt soluta tenetur.`;
    const getRandPrice = (min, max) => {
        return Math.max(Math.random() * max, min).toFixed(2);
    }
    const placeholderFoodMenu = new Array(20).fill({ name: "Food item", desc: placeholderDesc });

    const placeholderDrinkMenu = new Array(20).fill({ name: "Drink item", desc: placeholderDesc });

    //TODO: replace menus with actual list from ajax call
    const foodMenu = placeholderFoodMenu.map(item => {
        return { ...item, price: "$" + getRandPrice(3.99, 24.99) };
    });
    const drinkMenu = placeholderDrinkMenu.map(item => {
        return { ...item, price: "$" + getRandPrice(.99, 12.99) };
    });
    const drinkMenuPictureSrc = '/imgs/placeholders/nathan-dumlao-vbt-Fp3b5FA-unsplash.jpg';
    const foodMenuPictureSrc = '/imgs/placeholders/nathan-dumlao-vbt-Fp3b5FA-unsplash.jpg';

    const toggleMenuHandler = (e, manualMenu) => {
        let target = "";
        if (e) {
            target = e.target.getAttribute("data-target");
        } else if (manualMenu) {
            target = manualMenu;
        } else {
            return;
        }
        const fillMenu = (items) => {
            return ('<ul>' + items.reduce((menu, item) => {
                const listing = '<li><span class="item-name">' + item.name + '</span><span class="item-price">' + item.price + '</span><p class="item-desc">' + item.desc + '</p></li>'
                return menu + listing;
            }, "") + '</ul>')
        }
        const toggleImage = (forMenu) => {
            document.querySelectorAll(".menu-picture").forEach(el => {
                if (el.getAttribute("data-forMenu") === forMenu) {
                    el.classList.add("active");
                } else {
                    el.classList.remove("active");
                }
            })
        }
        document.querySelectorAll(".menu-toggle").forEach(el => {
            if (el.getAttribute("data-target") === target) {
                el.classList.add("active-menu");
            } else {
                el.classList.remove("active-menu");
            }
        });
        switch (target) {
            case "menu-drink":
                document.querySelector("#menu-list").innerHTML = fillMenu(drinkMenu);
                toggleImage("drink");
                break;
            case "menu-food":
                document.querySelector("#menu-list").innerHTML = fillMenu(foodMenu);
                toggleImage("food");
                break;
            default:
                break;
        }
    }

    toggleMenuHandler(null, "menu-drink"); //TODO: make this happen after promise getting menu items
    document.querySelectorAll(".menu-toggle").forEach(el => {
        el.addEventListener("click", toggleMenuHandler);
    });
})();
