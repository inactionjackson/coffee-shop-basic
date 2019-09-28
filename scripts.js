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
  /** force scroll to location, causing jittering with css smooth scroll */
  // const scrollDownToPageStart = animated => {
  //   changeNavClasses(true, animated);
  //   const ScrollBehavior = animated ? "smooth" : "auto";
  //   window.scroll({
  //     top: pageStartPos,
  //     left: 0,
  //     behavior: ScrollBehavior
  //   });
  // };

  // const scrollUpToPageTopper = animated => {
  //   changeNavClasses(false, animated);
  //   const ScrollBehavior = animated ? "smooth" : "auto";
  //   window.scroll({ top: 0, left: 0, behavior: ScrollBehavior });
  // };

  //#endregion (nav scrolling)

  const placeholderDesc = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi sint
 alias culpa quibusdam deleniti incidunt soluta tenetur, beatae voluptates nam ipsam
 possimus quod sed nobis cupiditate, facere est laborum perspiciatis. Vel deleniti fuga
 saepe iure, enim voluptatum quisquam molestias reprehenderit repellendus. Dolorem,
 aliquam provident nulla voluptas odit repellendus dolore fuga!`;
  const getRandPrice = (min, max) => {
    return Math.max(Math.random() * max, min);
  }
  const placeholderFoodMenu = new Array(20).fill({ name: "Food item", price: "$" + getRandPrice(.99, 12).toFixed(2), desc: placeholderDesc });
  const placeholderDrinkMenu = new Array(20).fill({ name: "Drink item", price: "$" + Math.max(Math.random() * 50, 3.99).toFixed(2), desc: placeholderDesc });

  //TODO: replace menus with actual list from ajax call
  const foodMenu = placeholderFoodMenu;
  const drinkMenu = placeholderDrinkMenu;
  const foodMenuPictureSrc = '/imgs/placeholders/nathan-dumlao-vbt-Fp3b5FA-unsplash.jpg';
  const drinkMenuPictureSrc = '/imgs/placeholders/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg';

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
    switch (target) {
      case "menu-drink":
        document.querySelector("#menu-content").innerHTML = fillMenu(drinkMenu) + '<img src="http://' + hostURL + drinkMenuPictureSrc + '" />';
        break;
      case "menu-food":
        document.querySelector("#menu-content").innerHTML = fillMenu(foodMenu) + '<img src="http://' + hostURL + foodMenuPictureSrc + '" />';
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
