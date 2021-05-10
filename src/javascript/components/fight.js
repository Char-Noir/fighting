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
  PlayerTwoCriticalHitCombinationTwo: false,//79
  PlayerTwoCriticalHitCombinationThree: false//73
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
  PlayerTwoCriticalHitCombinationTwo: 79,//79
  PlayerTwoCriticalHitCombinationThree: 73//73
};


var first = null;
var second = null;
var isStart = false;

var coolBarOne =null;
var coolBarTwo =null;
var healthBarOne = null;
var healthBarTwo = null;
var prom = null;
var secsOne=0;
var secsTwo=0;

var oneHealth=null;
var twoHealth=null;


export async function fight(firstFighter, secondFighter) {
  let winner = null;
   oneHealth = firstFighter.health;
   twoHealth = secondFighter.health;
  startmyFight(firstFighter,secondFighter);
  const timer = new TaskTimer(10);
  timer.add({
    id: 'job1',       // unique id of the task
    tickInterval: 30,    // run every 5 ticks (5 x interval = 5000 ms)
    totalRuns: 0,      // run 10 times only. (set to 0 for unlimited times)
    callback(task) {
      healthBarOne.style.width=((first.health/oneHealth)*100)+1+'%';
      healthBarTwo.style.width=((second.health/twoHealth)*100)+1+'%';
      coolBarOne.style.width=(100-((secsOne/10000)*100)+1)+'%';
      coolBarTwo.style.width=(100-((secsTwo/10000)*100)+1)+'%';
      if(first.health<=0){
        winner = second;
        healthBarOne.style.width=0+'%';
        prom(winner);
        timer.stop();
      }
      else if (second.health<=0) {
        winner = first;
        healthBarTwo.style.width=0+'%';
        prom(winner);
        timer.stop();
      }
    }
  });
  timer.add({
    id: 'job2',       // unique id of the task
    tickInterval: 1,    // run every 5 ticks (5 x interval = 5000 ms)
    totalRuns: 0,      // run 10 times only. (set to 0 for unlimited times)
    callback(task) {
      if(secsOne>=10){
        secsOne-=10;
      }
      else if(secsOne<10 && secsOne>0){
        secsOne=0;
      }
      if(secsTwo>=10){
        secsTwo-=10;
      }
      else if(secsTwo<10 && secsTwo>0){
        secsTwo=0;
      }
    }
  });
        timer.on(TaskTimer.Event.STOPPED, () => {
          return winner;
        });
        second.position='right';
        first.position='left';
   return new Promise((resolve) => {
     prom = resolve;
    let start = timer.start();
  });
}

export function getDamage(attacker, defender) {
  let damage = getHitPower(attacker) - getBlockPower(defender);
  //console.log('Damage:'+damage);
  return (damage<0)?0:damage;
}

export function getHitPower(fighter) {
  const {attack} = fighter;
  let criticalHitChance = Math.random() + 1;
  let power = attack * criticalHitChance;
  //console.log('Power: '+power);
  return power;
}

export function getBlockPower(fighter) {
  const {defense} = fighter;
  let dodgeChance = Math.random() + 1;
  let power = defense * dodgeChance;
  //console.log('Block:'+power);
  return power;
}

function startmyFight(one,two){
  healthBarOne = document.getElementById('left-fighter-indicator');
  healthBarTwo = document.getElementById('right-fighter-indicator');
  coolBarOne = document.getElementById('left-fighter-coolDown');
  coolBarTwo = document.getElementById('right-fighter-coolDown');
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
    case codes.PlayerTwoCriticalHitCombinationOne:
      keys.PlayerTwoCriticalHitCombinationOne=false;
      break;
    case codes.PlayerTwoCriticalHitCombinationTwo:
      keys.PlayerTwoCriticalHitCombinationTwo=false;
      break;
    case codes.PlayerTwoCriticalHitCombinationThree:
      keys.PlayerTwoCriticalHitCombinationThree=false;
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
    case codes.PlayerTwoCriticalHitCombinationOne:
      keys.PlayerTwoCriticalHitCombinationOne=true;
      break;
    case codes.PlayerTwoCriticalHitCombinationTwo:
      keys.PlayerTwoCriticalHitCombinationTwo=true;
      break;
    case codes.PlayerTwoCriticalHitCombinationThree:
      keys.PlayerTwoCriticalHitCombinationThree=true;
      break;
    default:

  }
  checkKeys(event.keyCode);
}

function checkKeys(key){
  if(isStart){
    switch (key) {
      case codes.PlayerOneCriticalHitCombinationOne:
      case codes.PlayerOneCriticalHitCombinationTwo:
      case codes.PlayerOneCriticalHitCombinationThree:
        if(keys.PlayerOneCriticalHitCombinationOne && keys.PlayerOneCriticalHitCombinationTwo && keys.PlayerOneCriticalHitCombinationThree){
          if(!secsOne){
          attack({attacker:first,victim:second,isSpec:true});
          secsOne=10000;
          }
        }
        break;
      case codes.PlayerTwoCriticalHitCombinationOne:
      case codes.PlayerTwoCriticalHitCombinationTwo:
      case codes.PlayerTwoCriticalHitCombinationThree:
        if(keys.PlayerTwoCriticalHitCombinationOne && keys.PlayerTwoCriticalHitCombinationTwo && keys.PlayerTwoCriticalHitCombinationThree){
          if(!secsTwo){
          attack({attacker:second,victim:first,isSpec:true});
          secsTwo=10000;
          }
        }
        break;
      case codes.PlayerOneAttack:
        if(!keys.PlayerOneBlock)
        attack({attacker:first,victim:second,hasBlock:keys.PlayerTwoBlock});
        break;
      case codes.PlayerTwoAttack:
        if(!keys.PlayerTwoBlock)
        attack({attacker:second,victim:first,hasBlock:keys.PlayerOneBlock});
        break;
      default:

    }
  }
}

function attack({attacker,victim,hasBlock,isSpec}) {
  if(isSpec){
      victim.health-=attacker.attack*2;
  }else{
    if(hasBlock){
    }else{
      victim.health-=getDamage(attacker,victim);
    }
  }
}


//Ujas
