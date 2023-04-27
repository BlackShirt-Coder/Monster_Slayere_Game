
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + max;
}
const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            win: null,
            round: 0,
            messages:[]
        }
    },
    methods: {
        attackMonster() {
            this.round++;
            let attackValue= getRandomValue(5, 12);
            this.monsterHealth -=attackValue;
            this.attackPlayer();
            this.addLogMessage('player',' attack ',attackValue);
        },
        attackPlayer() {
            this.round++;
             attackValue= getRandomValue(8, 15);
            this.playerHealth -=attackValue;
            this.addLogMessage('monster', ' attack ', attackValue);

        },
        specialAttack() {

            this.attackMonster();
            attackValue= getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', ' special_attack ', attackValue);

        },
        healPlayer() {
            this.round++;
            healValue = getRandomValue(8, 20);
            if (healValue + this.playerHealth > 100) {
                this.playerHealth = 100;
                this.addLogMessage('player', ' heal ', healValue);

            }
            else {
                this.playerHealth += healValue;
                this.addLogMessage('player', ' heal ', healValue);

            }
        },
        restart() {
            this.monsterHealth = 100
            this.playerHealth = 100
            this.round = 0
            this.win = null
            this.messages=[]
           
        },
        surrender(){
            this.win='monster' ;
            this.addLogMessage('player', 'surrender', 0);

        },
        addLogMessage(who,what,value){
            this.messages.unshift({
                actionBy:who,
                actionType:what,
                actionValue:value
            });
           
        }


    },
    computed: {
        monsterBarStyle() {
            if(this.monsterHealth<=0){
                return {
                    width:'0%'
                }
            }
           
            return {
                width: this.monsterHealth + '%'
            }
        },
        playerBarStyle() {
            if (this.playerHealth <= 0) {
                return {
                    width: '0%'
                }
            }
           else if (this.win === 'monster') {
                return {
                    width: '0%'
                }
            }
            return {
                width: this.playerHealth + '%'
            }

        },
        enabledHeal() {
            return this.round % 3 === 0;
        },
        
    },
    watch: {
        playerHealth(value) {
            if (value <= 0) {
                this.win = 'monster'
            }
            else if (value <= 0 && this.monsterHealth <= 0) {
                this.win = 'draw'
            }
            console.log(value);
        },
        monsterHealth(value) {
            if (value <= 0) {
                this.win = 'player';
            }
            else if (value <= 0 && this.playerHealth <= 0) {
                this.win = 'draw';
            }
            console.log('monster' + value);


        }
    }
});
app.mount('#game');



