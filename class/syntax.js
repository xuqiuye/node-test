class Point {
    constructor () {
        return Object.create(null);
    }

    toString() {
        return 'toString';
    }
}

console.log(typeof Point);
console.log(Point.prototype.constructor === Point);
console.log(Point.prototype);
console.log(Object.keys(Point));
console.log(Object.getOwnPropertyNames(Point.prototype));
console.log(new Point() instanceof Point);

const point = new Point(12,2,2);
// console.log(Object.getOwnPropertyDescriptor(point));

class Logger {
    constructor () {
        // 解决方法 使用bind()方法向printName方法注入this实例
        // this.printName = this.printName.bind(this);
        //另外一只
        this.printName = (name='there') => { 
            this.print(`hello ${name}`);
        }
    }

    /* printName (name = 'three') {
        this.print(`hello ${name}`);
    } */

    print (str) {
        console.log(str)
    }
}

const logger = new Logger();
// 方法printName析构出现，导致了函数内的this指向错误
const {printName} = logger; // 析构
printName();
console.log(Logger.name)

// 属性的取值
class GameMessage {
    constructor () {
        this.notice = 'notice';
    }
    get notice() {
        return this.notice;
        // console.log('getter');
    }

    set notice(value) {
        // this.notice = value;
        // return this.notice = val;
        console.log('setter' + value);
        // return;
    }
}

let msg = new GameMessage();
// msg.notice = 'game notice';
msg.notice;

