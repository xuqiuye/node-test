// import B from "./b";
const B = require('./B');
// 类似net static效果
/* class A {
    constructor() {
      console.log(new.target.name);
    }
}
class B extends A {
    constructor() {
        super();
    }
}
  new A() // A
  new B() // B */

new B();