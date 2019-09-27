(() => {
  window.onbeforeunload = () => {
    document.querySelector("nav").classList.remove("nav-scrolled");
    window.scrollTo(0, 0);
  };
  //#region (nav scrolling)
  let bCheckScroll = false;

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


  window.addEventListener("scroll", e => {
    console.log(window.scrollY);
    if (bCheckScroll) {
      bCheckScroll = false;
      if (
        window.scrollY >= navHeight &&
        !document.querySelector("nav").classList.contains("nav-scrolled")
      ) {
        changeNavClasses(true, true);
      } else if (
        window.scrollY < navHeight * 0.5 &&
        document.querySelector("nav").classList.contains("nav-scrolled")
      ) {
        changeNavClasses(false, true);
      }
    } else {
      setTimeout(() => {
        bCheckScroll = true;
      }, 30);
    }
  });
  //#endregion (nav scrolling)
})();
