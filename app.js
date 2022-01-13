function getRandomvalue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackvalue = getRandomvalue(5, 12);
      this.monsterHealth = this.monsterHealth - attackvalue;
      this.addLogMessages("player", "attack", attackvalue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackvalue = getRandomvalue(8, 15);
      this.playerHealth = this.playerHealth - attackvalue;
      this.addLogMessages("monster", "attack", attackvalue);
    },
    specialAttack() {
      this.currentRound++;
      const attackvalue = getRandomvalue(10, 25);
      this.monsterHealth = this.monsterHealth - attackvalue;
      this.addLogMessages("player", "attack", attackvalue);
      this.attackPlayer();
    },
    healPlayer() {
      const healValue = getRandomvalue(8, 20);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth = this.playerHealth + healValue;
      }
      this.addLogMessages("player", "heal", healValue);

      this.attackPlayer();
    },
    restartGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.winner = null;
      this.currentRound = 0;
      this.logMessages=[]
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessages(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    disableSpecialAttack() {
      return this.currentRound % 3 !== 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        //draw
        this.winner = "draw";
      } else if (value <= 0) {
        //player lost
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        //draw
        this.winner = "draw";
      } else if (value <= 0) {
        //monster lost
        this.winner = "player";
      }
    },
  },
});

app.mount("#game");
