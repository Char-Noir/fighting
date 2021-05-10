import { controls } from '../../constants/controls';
import { TaskTimer } from 'tasktimer';

var keys = {
  PlayerOneAttack: false,//65
  PlayerOneBlock: false,//68
  PlayerTwoAttack: false,//74
  PlayerTwoBlock: false,//76
  PlayerOneCriticalHitCombinationOne: false,//81
  PlayerOneCriticalHitCombinationTwo: false,//87
  PlayerOneCriticalHitCombinationThree: false,//69
  PlayerTwoCriticalHitCombinationOne: false,//85
  PlayerOneCriticalHitCombinationThree: false,//73
  PlayerTwoCriticalHitCombinationTwo: false//79
};
var codes = {
  PlayerOneAttack: 65,//65
  PlayerOneBlock: 68,//68
  PlayerTwoAttack: 74,//74
  PlayerTwoBlock: 76,//76
  PlayerOneCriticalHitCombinationOne: 81,//81
  PlayerOneCriticalHitCombinationTwo: 87,//87
  PlayerOneCriticalHitCombinationThree: 69,//69
  PlayerTwoCriticalHitCombinationOne: 85,//85
  PlayerOneCriticalHitCombinationThree: 73,//73
  PlayerTwoCriticalHitCombinationTwo: 79//79
};


var first = null;
var second = null;
var isStart = false;

var healthBarOne = null;
var healthBarTwo = null;
var prom = null;


export async function fight(firstFighter, secondFighter) {
  let winner = null;
  let oneHealth = firstFighter.health;
  let twoHealth = secondFighter.health;
  startmyFight(firstFighter,secondFighter);
  const timer = new TaskTimer(300);
  timer.add({
    id: 'job1',       // unique id of the task
    tickInterval: 1,    // run every 5 ticks (5 x interval = 5000 ms)
    totalRuns: 0,      // run 10 times only. (set to 0 for unlimited times)
    callback(task) {
      healthBarOne.style.width=((first.health/oneHealth)*100)+'%';
      healthBarTwo.style.width=((second.health/twoHealth)*100)+'%';
      if(first.health<=0){
        winner = second;
        healthBarOne.style.width=0+'%';
        prom(winner);
      }
      else if (second.health<=0) {
        winner = first;
        healthBarTwo.style.width=0+'%';
        prom(winner);
      }
    }
  });
  timer.on('tick', () => {
        if(first.health<=0||second.health<=0)
          timer.stop();
        });
        timer.on(TaskTimer.Event.STOPPED, () => {
          return winner;
        });
        second.position='right';
        first.position='left';
   return new Promise((resolve) => {

     prom = resolve;

    let start = timer.start();
    healthBarOne.style.width=((first.health/oneHealth)*100)+'%';
    healthBarTwo.style.width=((second.health/twoHealth)*100)+'%';
    //if(firstFighter.health<=0 && secondFighter.health<=0)
    // Ничья
    // else if(firstFighter.health<=0)
    // Победа второго
    // else
    // Победа первого
  });
}

export function getDamage(attacker, defender) {
  let damage = getHitPower(attacker) - getBlockPower(defender);
  return (damage<0)?0:damage;
}

export function getHitPower(fighter) {
  const {attack} = fighter;
  let criticalHitChance = Math.random() + 1;
  let power = attack * criticalHitChance;
  return power;
}

export function getBlockPower(fighter) {
  const {defense} = fighter;
  let dodgeChance = Math.random() + 1;
  let power = defense * dodgeChance;
  return power;
}

function startmyFight(one,two){
  healthBarOne = document.getElementById('left-fighter-indicator');
  healthBarTwo = document.getElementById('right-fighter-indicator');
  document.onkeydown = OnKeyDown;
  document.onkeyup = OnKeyUp;
  first=one;
  second=two;
  isStart=true;
}

function OnKeyUp(event){
  switch (event.keyCode ) {
    case codes.PlayerOneAttack:
      keys.PlayerOneAttack=false;
      break;
    case codes.PlayerOneBlock:
      keys.PlayerOneBlock=false;
      break;
    case codes.PlayerTwoAttack:
      keys.PlayerTwoAttack=false;
      break;
    case codes.PlayerTwoBlock:
      keys.PlayerTwoBlock=false;
      break;
    case codes.PlayerOneCriticalHitCombinationOne:
      keys.PlayerOneCriticalHitCombinationOne=false;
      break;
    case codes.PlayerOneCriticalHitCombinationTwo:
      keys.PlayerOneCriticalHitCombinationTwo=false;
      break;
    case codes.PlayerOneCriticalHitCombinationThree:
      keys.PlayerOneCriticalHitCombinationThree=false;
      break;
    case codes.PlayerOneCriticalHitCombinationOne:
      keys.PlayerOneCriticalHitCombinationOne=false;
      break;
    case codes.PlayerOneCriticalHitCombinationTwo:
      keys.PlayerOneCriticalHitCombinationTwo=false;
      break;
    case codes.PlayerOneCriticalHitCombinationThree:
      keys.PlayerOneCriticalHitCombinationThree=false;
      break;
    default:

  }
}

function OnKeyDown(event){
  switch (event.keyCode ) {
    case codes.PlayerOneAttack:
      keys.PlayerOneAttack=true;
      break;
    case codes.PlayerOneBlock:
      keys.PlayerOneBlock=true;
      break;
    case codes.PlayerTwoAttack:
      keys.PlayerTwoAttack=true;
      break;
    case codes.PlayerTwoBlock:
      keys.PlayerTwoBlock=true;
      break;
    case codes.PlayerOneCriticalHitCombinationOne:
      keys.PlayerOneCriticalHitCombinationOne=true;
      break;
    case codes.PlayerOneCriticalHitCombinationTwo:
      keys.PlayerOneCriticalHitCombinationTwo=true;
      break;
    case codes.PlayerOneCriticalHitCombinationThree:
      keys.PlayerOneCriticalHitCombinationThree=true;
      break;
    case codes.PlayerOneCriticalHitCombinationOne:
      keys.PlayerOneCriticalHitCombinationOne=true;
      break;
    case codes.PlayerOneCriticalHitCombinationTwo:
      keys.PlayerOneCriticalHitCombinationTwo=true;
      break;
    case codes.PlayerOneCriticalHitCombinationThree:
      keys.PlayerOneCriticalHitCombinationThree=true;
      break;
    default:

  }
  checkKeys(event.keyCode);
}

function checkKeys(key){
  if(isStart){
    switch (key) {
      case codes.PlayerOneAttack:
        attack(first,second,keys.PlayerTwoBlock);
        break;
      case codes.PlayerTwoAttack:
        attack(second,first,keys.PlayerOneBlock);
        break;
      default:

    }
  }
}

function attack(attacker,victim,hasBlock) {
  if(hasBlock){
    victim.health-=getDamage(attacker,victim);
  }else{
    victim.health-=getHitPower(attacker);
  }
}
