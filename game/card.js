const mockjs = require('mockjs');
const Random = mockjs.Random;
// Random.integer

class SequenceHolder {
    constructor () {
        this._income = 300;
        this._outgo = 1500;
        this._gameConfig = {
            "banker_rate": 0.95,
            "player_rate": 1,
            "player_double_rate": 11,
            "banker_double_rate": 11,
            "he_rate": 8,
            "commission_rate": 0.005,
            "release_water_amount": 2000,
            profix_rate: 0.05
        }
    }

    genResult([playerAmount, bankerAmount, heAmount,playerDoubleAmount, bankerDoubleAmount], roundId, result) {

        //平台积压金 总收入 减去 输钱 减去系统抽水
        const newBacklog = (this._income - this._outgo) * (1 - this._gameConfig.commission_rate);
        // 每项赔付金额
        this._resultAmount(playerAmount, bankerAmount, heAmount,playerDoubleAmount, bankerDoubleAmount, newBacklog);
        let resultAmount = this._resultAmount.get(result);
        // 局总收入
        let roundAmount = playerAmount + bankerAmount + heAmount + playerDoubleAmount + bankerDoubleAmount;
        // 局的分配金额
        roundAmount = roundAmount * (1 - this._gameConfig.commission_rate);
        console.log(resultAmount);
        this._genResult(newBacklog, resultAmount);
        return result;
        //积压金比例  积压金 除以 总收入
        // const newBacklogRate = newBacklog / this._income;
    }

    _genResult(newBacklog, roundAmount, amount, heNum) {
        const newBacklogRate = newBacklog / this._income;
        
        if(newBacklogRate > this._gameConfig.profix_rate) {
            if(this._income < this._gameConfig.release_water_amount && this._gameConfig.max_loss_amount < (roundAmount - amount + newBacklog)) return true;
        } else {
           if(roundAmount - amount + newBacklog >=0) return true;
        }

        // 判断和场次
        
        /* let hasResult = [];
        this._resultAmount.forEach((amount, key, map) => {
            if((roundAmount - amount + newBacklog) >= 0 || (this._income < this._gameConfig.release_water_amount && this._gameConfig.max_loss_amount < (roundAmount - amount + newBacklog))) { //平台赢钱
                hasResult.push(key);
            } 
        });

        let hper = Random.integer(1, 10000);
        let finalResult = [];
        if(hper >= 1 && hper <= 1000 && heNum < 6) {
            for(let i=0; i < hasResult.length; i++) {
                if(hasResult[i][0] == '0') {
                    finalResult.push(hasResult[i]);
                }
            }
        } else {
            for(let i = 0; i < hasResult.length; i++) {
                if(hasResult[i][0] != '0') {
                    finalResult.push(hasResult[i]);
                }
            }
        }
        if(!finalResult.length) {
           let noneResult = this._resultAmount.get('000') > this._resultAmount.get('100') ? this._resultAmount.get('100') > this._resultAmount.get('200') ? '200' : '100' : this._resultAmount.get('000') > this._resultAmount.get('200') ? '200' : '000'; 
           return [noneResult];
        }
        return finalResult; */
    }

    /**
     * 枚举所有可能出现的结果
     * @param {*} playerAmount 
     * @param {*} bankerAmount 
     * @param {*} heAmount 
     * @param {*} playerDoubleAmount 
     * @param {*} bankerDoubleAmount 
     */
    _resultAmount(playerAmount, bankerAmount, heAmount,playerDoubleAmount, bankerDoubleAmount) {
        
        let playerRateAmount = playerAmount * (1 + this._gameConfig.player_rate);
        let bankerRateAmount = bankerAmount * (1 + this._gameConfig.banker_rate);
        let playerDoubleRateAmount = playerDoubleAmount * (1 + this._gameConfig.player_double_rate);
        let bankerDoubleRateAmount = bankerDoubleAmount * (1 + this._gameConfig.banker_double_rate);
        let heRateAmount = heAmount * (1 + this._gameConfig.he_rate);

        this._resultAmount = new Map();
        //基本的和闲庄
        this._resultAmount.set('000',heRateAmount + bankerAmount + playerAmount);
        this._resultAmount.set('100',playerRateAmount);
        this._resultAmount.set('200',bankerRateAmount);
        // 和对庄，和对闲 和对闲对庄
        this._resultAmount.set('010',heRateAmount + playerDoubleRateAmount + bankerAmount + playerAmount);
        this._resultAmount.set('001',heRateAmount + bankerDoubleRateAmount + bankerAmount + playerAmount);
        this._resultAmount.set('011',heRateAmount + bankerDoubleRateAmount + playerDoubleRateAmount + bankerAmount + playerAmount);
        //闲对闲 闲对庄 闲对庄对闲
        this._resultAmount.set('110',playerRateAmount + playerDoubleRateAmount);
        this._resultAmount.set('101',playerRateAmount + bankerDoubleRateAmount);
        this._resultAmount.set('111',playerRateAmount + bankerDoubleRateAmount + playerDoubleRateAmount);
        //庄对闲 庄对庄 庄对庄对闲
        this._resultAmount.set('210',bankerRateAmount + playerDoubleRateAmount);
        this._resultAmount.set('201',bankerRateAmount + bankerDoubleRateAmount);
        this._resultAmount.set('211',bankerRateAmount + bankerDoubleRateAmount + playerDoubleRateAmount);
    }
}



class Round {
    constructor (sequence) {
        this._results = '';
        this._playerCard = [];
        this._bankerCard = [];
        this._bankerCardColour= [];
        this._playerCardColour= [];
        this._sequence = sequence;
        this._player = 4000;
        this._banker = 3000;
        this._playerDouble = 60;
        this._bankerDouble = 500;
        this._he = 200;
    }

    run() {
       let results = this._sequence.genResult([this._player, this._banker, this._he, this._playerDouble, this._bankerDouble], this._id, this._results);
    //    console.log(results);
    }
}


class Card {

    constructor () {
        this._results = [];
        this._card = [];
        for(let i = 0; i < 7; i++) {
            this._card.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13);
            // this._shuffle();
        }
        this._count = 1;
    }

    init (round) {
        this._round = round;
    }
    //生成牌
    calculateCard() {
        this._round._bankerCardColour.push(Random.integer(1, 4), Random.integer(1, 4), Random.integer(1, 4));
        this._round._playerCardColour.push(Random.integer(1, 4), Random.integer(1, 4), Random.integer(1, 4));
        
        /* this._results = String(this._round._results);
        this._result = Number(this._results[0]); */
        // 先给庄闲发牌
        this._genCards();
        this._round._results = this._results;
        console.log(`生成结果是: ${this._round._results}`);
    }

    _genThirdCard(min,max) {
        return Random.integer(min,max);
    }

    _shuffle() {
        var m = this._card.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = this._card[m];
            this._card[m] = this._card[i];
            this._card[i] = t;
        }
    }

    // J Q k 映射
    _mapCard(c) {
        if(c > 10) return 0;
        else return c;
    }

    _genCard() {
        let count = Random.integer(8,10)
        while(count > 0) {
            this._shuffle();
            count--;
        }
        let [a, b, c, d] = [this._card[0], this._card[1], this._card[2], this._card[3]];
        if(a === c || b === d) this._genCard();
        return [a, b, c, d];
    }
    // 生成对子
    _genDoubleCard(number) {
        let per = number % 2;
        let avg = 0;
        if(per === 0) {
            avg = number / 2;
        } else {
            avg = (number + 1) / 2;
        }
        if(avg <= 3) avg = avg + (10 * Random.integer(0,1));
        if(avg === 0) avg = 10;
        return avg;
    }

    _genCards() {
        this._round._playerCard = [];
        this._round._bankerCard = [];
        //13,13 ---- 4,5
        let [one, three, two, four] = [3,4, 4,1]// this._genCard();
        // console.log(this._count + '----------' + one, two, three, four + '---------' + this._results);
        this._round._playerCard.push(one, two);
        this._round._bankerCard.push(three, four);
        let [ p_r, b_r ] = [(this._mapCard(one) + this._mapCard(two)) % 10, (this._mapCard(three) + this._mapCard(four)) % 10];
        let third_player_card = this._genThirdCard(1,13);
        let third_banker_card = this._genThirdCard(1,13);
        

        // 是否对闲
        /* if(Number(this._results[1]) === 1) {
            let avg = this._genDoubleCard(p_r);
            this._round._playerCard[0] = this._round._playerCard[1] = avg;
        }

        // 是否对庄
        if(Number(this._results[2]) === 1) {
            let avg = this._genDoubleCard(b_r);
            this._round._bankerCard[0] = this._round._bankerCard[1] = avg;
        } */

        // 闲增牌
        if([0, 1, 2, 3, 4, 5].indexOf(p_r) !== -1 && [8, 9].indexOf(b_r) === -1) {
            this._round._playerCard.push(third_player_card);
            p_r = (this._mapCard(third_player_card) + p_r) % 10;
        }
        this._canAddBanker = false;
        // console.log(p_r,p_r <= 7);
        if(p_r <= 7)
            this._addRule(b_r, this._round._playerCard[2], p_r);
        if(this._canAddBanker) {
            // 计算给庄家增什么牌
            this._round._bankerCard.push(third_banker_card);
            b_r = (this._mapCard(third_banker_card) + b_r) % 10;
        }
        console.log(`${this._count} ---------- ${this._round._playerCard.toLocaleString()} ---- ${this._round._bankerCard.toLocaleString()} --------- ${this._results}`);

        // 结果
        if(p_r === b_r) {
            this._results[0] = 0;
        } else if (p_r > b_r) {
            this._results[0] = 1;
        } else {
            this._results[0] = 2;
        }
        if (this._round._playerCard[0] === this._round._playerCard[1]) {
            this._results[1] = 1;
        } else {
            this._results[1] = 0;
        }

        if(this._round._bankerCard[0] === this._round._bankerCard[1]) {
            this._results[2] = 1;
        } else {
            this._results[2] = 0;
        }
        this._results = this._results.toString().replace(/,/g, '');
        // 根据结果算牌是否正确
        /* if(this._result === 0) {
            if(p_r === b_r) {
                return ;
            } else {
                p_r = 0;
                b_r = 0;
                return this._genCards();
            }
        } else if(this._result === 1) {
            if(p_r > b_r) {
                return ;
            } else {
                p_r = 0;
                b_r = 0;
                return this._genCards();
            }
        } else if(this._result === 2) {
            if(p_r < b_r) {
                return ;
            } else {
                p_r = 0;
                b_r = 0;
                return this._genCards();
            }
        } */
        return ;
    }

    _addRule(b_r, third_player_card, p_r) {
        switch (b_r) {
            case 3:
                if(this._round._playerCard.length === 2 || third_player_card != 8 ) this._canAddBanker = true;
                break;
            case 4:
                if(this._round._playerCard.length === 2 || [2, 3, 4, 5, 6, 7].indexOf(third_player_card) !== -1) this._canAddBanker = true;
                break;
            case 5:
                if(this._round._playerCard.length === 2 || [5, 6, 7].indexOf(third_player_card) !== -1) this._canAddBanker = true;
                break;
            case 6: 
                if(this._round._playerCard.length === 3 && [6, 7].indexOf(third_player_card) !== -1) this._canAddBanker = true;
                break;
            case 7:
                this._canAddBanker = false;
                break; 
            case 8:
                this._canAddBanker = false;
                break;
            case 9:
                this._canAddBanker = false;
                break;
            default:
                if([0, 1, 2].indexOf(b_r) !== -1 && [8, 9].indexOf(p_r) === -1) this._canAddBanker = true
                break;
        }
    }

}

// export default new Card();

for(let i =0; i < 5; i++) {
    const sequence = new SequenceHolder();
    const round = new Round(sequence);
    // round.run();
    const card = new Card();
    card.init(round)
    card.calculateCard();
    round.run();
}