var arr = [[32,1],[456,2,3,44,234],[4567,1,4,5,6],[34,78,23,1]];

function sortArr(array) {
    let next = true;
    let entries = array.entries();
    while(next) {
        var result = entries.next();
        if(result.done === false) {
            result.value[1].sort((a,b) => a - b);
        } else {
            next = false;
        }
    }
    return array;
}

// console.log(sortArr(arr));

/* var arr1 = [1, 30, 39, 29, 10, 13];

var a = arr1.every(function(elem) {
    console.log(elem);
    return elem < 38;
}); */
const Mock = require('mockjs');
const random = Mock.Random;
class Odds {
    constructor (probabilty) {
        this.win_number = 0;
        this.init_probaility = probabilty;
        this.win_probability = probabilty; // 平台赢的概率
    }

    result () {
        // 收水阶段
        switch (this.win_number) {
            case 0: // 最多有54%赢钱机会
                this.win_probability = 100 - (this.win_probability + random.integer(46 - this.win_probability, 1));
                break;
            case 1: // 最多有40%的赢钱机会
                this.win_probability = 100 - (this.win_probability + random.integer(1, 60 - this.win_probability));
                break;
            case 2: // 最多有20%的赢钱机会
                this.win_probability = 100 - (this.win_probability + random.integer(1, 80 - this.win_probability));
                break;
            default: // 最多有4%的赢钱机会 
                this.win_probability = 100 - (this.win_probability + random.integer(1, 96 - this.win_probability));
                break;
        }
        
        let num = random.integer(1, 10000);
        let win = true; // 赢
        // 不中的概率
        if(num > this.win_probability * 100) { //输掉了，重新回到比例
            // 概率变成正常的
            this.win_probability = this.init_probaility;
            win = false;
            this.win_number = 0;
        } else {
            ++this.win_number;
        }
        console.log(`赢钱次数：${this.win_number}, 赢钱的概率：${this.win_probability}%, 随机的数字：${num}, 输赢结果: ${win}`);

        return win;
    }

    /* _shuffle() {
        var m = this._card.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = this._card[m];
            this._card[m] = this._card[i];
            this._card[i] = t;
        }
    } */
}

const odd = new Odds(50);

for(let i = 0; i < 200; i++) {
    // console.log(odd.result());
    odd.result()
}
