function  UpdateProps12(menuActive) {
  let menu = menuActive.menu;
  let subMenu = menuActive.subMenu;
  let props1 = {}, props2 = {};

  let choice1 = ['x','y','z'];
  let choice2 = ['a','b','c','d','e','f','g','h','i','j','k','m','n','p','q','r','s','t','u','v','w','x','y','z'];
  let n = 0, deg = 0;

  localStorage.setItem("menu", JSON.stringify(menuActive));

  if (menu === "form-0") {
    // formActive = 0;
    if (subMenu === "item-0") {
      props1 = {anPos:true, maxA:1, max: 11};
      props2 = {anPos:true, maxA:1, max: 11};

    } else if (subMenu === "item-1") {
      // let choice = ['x','y','z'];
      n = Math.floor( Math.random() * choice1.length);

      props1 = {anPos:true, maxA:1, numVar:[choice1[n]], max: 13};
      props2 = {anPos:true, maxA:1, numVar:[choice1[n]], max: 13};

    } else if (subMenu === "item-2") {
      // let choice = ['a','b','c','d','e','f','g','h','i','j','k','m','n','p','q','r','s','t','u','v','w','x','y','z'];
      n = Math.floor( Math.random() * choice2.length);

      props1 = {anPos:true, maxA:1, numVar:[choice2[n]], max: 13};
      props2 = {anPos:true, maxA:1, numVar:[choice2[n]], max: 13};

    }
    // END of menu form-0

  } else if (menu === "form-1") {
    // formActive = 1;
    if (subMenu === "item-0") {
      props1 = {anPos:true, maxA:5, max: 6};
      props2 = {anPos:true, maxA:5, max: 6};

    } else if (subMenu === "item-1") {
      n = Math.floor( Math.random() * choice1.length);

      props1 = {anPos:true, maxA:5, numVar:[choice1[n]], max: 11};
      props2 = {anPos:false, maxA:5, numVar:[choice1[n]], max: 11};

      // props1 = {anPos:true, maxA:5, max: 11};
      // props2 = {anPos:false, maxA:5, max: 11};

    } else if (subMenu === "item-2") {
      n = Math.floor( Math.random() * choice2.length);

      props1 = {anPos:true, maxA:6, numVar:[choice2[n]], max: 13};
      props2 = {anPos:false, maxA:6, numVar:[choice2[n]], max: 13};

      // props1 = {anPos:true, maxA:6, max: 16, numVar:['y']};
      // props2 = {anPos:false, maxA:6, max: 16, numVar:['y']};
      
    }
    // END of menu form-1
  } else if (menu === "form-2") {
    // formActive = 2;
    if (subMenu === "item-0") {
      deg = Math.floor( (Math.random() * 4)) + 1;

      props1 = {anPos:true, maxA:1, degArr:[deg, 0], max: 6};
      props2 = {anPos:true, maxA:1, degArr:[deg, 0], max: 6};

    } else if (subMenu === "item-1") {
      deg = Math.floor( (Math.random() * 5)) + 1;
      n = Math.floor( Math.random() * choice1.length);
      // deg = Math.floor( (Math.random() * 6));

      props1 = {anPos:true, maxA:1, numVar:[choice1[n]], degArr:[deg, 0], max: 11};
      props2 = {anPos:true, maxA:1, numVar:[choice1[n]], degArr:[deg, 0], max: 11};

    } else if (subMenu === "item-2") {
      deg = Math.floor( (Math.random() * 10)) + 1;
      n = Math.floor( Math.random() * choice2.length);
      // deg = Math.floor( (Math.random() * 11));

      props1 = {anPos:true, maxA:1, numVar:[choice2[n]], degArr:[deg, 0], max: 16};
      props2 = {anPos:true, maxA:1, numVar:[choice2[n]], degArr:[deg, 0], max: 16};

    }
    // END of menu form-2
  } else if (menu === "form-3") {
    // formActive = 3;
    if (subMenu === "item-0") {
      deg = Math.floor( (Math.random() * 4)) + 1;

      props1 = {anPos:true, maxA:5, degArr:[deg, 0], max: 11};
      props2 = {anPos:false, maxA:5, degArr:[deg, 0], max: 11};

    } else if (subMenu === "item-1") {
      deg = Math.floor( (Math.random() * 5)) + 1;
      n = Math.floor( Math.random() * choice1.length);

      props1 = {anPos:true, maxA:6, numVar:[choice1[n]], degArr:[deg, 0], max: 13};
      props2 = {anPos:false, maxA:6, numVar:[choice1[n]], degArr:[deg, 0], max: 13};

    } else if (subMenu === "item-2") {
      deg = Math.floor( (Math.random() * 10)) + 1;
      n = Math.floor( Math.random() * choice2.length);

      props1 = {anPos:true, maxA:6, numVar:[choice2[n]], degArr:[deg, 0], max: 16};
      props2 = {anPos:false, maxA:6, numVar:[choice2[n]], degArr:[deg, 0], max: 16};
      
    }
    // END of menu form-3
  }

  return {
    props1: props1,
    props2: props2
  }
}

export default UpdateProps12;