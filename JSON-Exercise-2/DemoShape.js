/** P1/ SHAPE CLASS (OBJECT) **/
class DemoShape {
    /* constructor :: for binding */
    constructor(x, y, w, h, col, parent) {
      // ADD
      let self = this;
      //position
      this.x = x;
      this.y = y;

      //dim:
      this.w = w;
      this.h = h;

      //origPos::
      this.orig_x = x;
      this.orig_y = y;

      //for movement (NOT USE YET)
      this.speedX = Math.random() * 4 + 1;
      this.speedY = Math.random() * 4 + 1;

      //for color
      this.a = 1.0;
      this.col = col;

      /* create an html element */
      this.el = document.createElement("div");
      this.el.classList.add("squ");

      //add background col
      this.el.style.background = this.col;
      //left and top positions.
      this.el.style.left = this.x + "px";
      this.el.style.top = this.y + "px";
      this.el.style.width = this.w +"px";
      this.el.style.height = this.h+"px";

      /* use DOM method for appending ... */
     parent.appendChild(this.el);

   
    } //close constructor

    /*:: member method - also the callback */
    shapeChange() {
      /** note here we must accss the html element! */
      // inbuilt function... and just toggle css class
      if (this.el.classList.contains("circ")) {
        this.el.classList.remove("circ");
        this.el.classList.add("squ");
      } else {
        this.el.classList.remove("squ");
        this.el.classList.add("circ");
      }
    }


    /*1 ::: add a function to update the pos ... */
    update() {
      //OPTIONAL (bonus ::)(5)
      //only animate if is a circ:: - will stop otherwise!
     // if (this.el.classList.contains("circ")) {
        this.x += this.speedX;
        this.y += this.speedY;
        this.el.style.left = this.x + "px";
        this.el.style.top = this.y + "px";
     // }
    }

    //4:: after inital animation - lets do one last thing -
    //implement the abiility to check the screen bounds::
    //and change direction ...
    //WE ARE MAKING OUR OWN SIZE HERE ...
    checkScreenBounds() {
      if (this.x > 500 || this.x < 0) {
        this.speedX = this.speedX * -1;
      }

      if (this.y > 500 || this.y < 0) {
        this.speedY = this.speedY * -1;
      }
    }
  } //shape object ...
  /*********************************************/
