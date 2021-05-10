import { createElement } from '../helpers/domHelper';
import { createFighterImage } from './fighterPreview';
import { fight } from './fight';
import { showWinnerModal } from './modal/winner';

export function renderArena(selectedFighters) {
  const root = document.getElementById('root');
  const arena = createArena(selectedFighters);

  root.innerHTML = '';
  root.append(arena);

  let gusi = fight(...selectedFighters);
  var winner;
  gusi.then((value) => {
    winner=value;
    showWinnerModal(winner);
  });
}

function createArena(selectedFighters) {
  const arena = createElement({ tagName: 'div', className: 'arena___root' });
  const healthIndicators = createHealthIndicators(...selectedFighters);
  const fighters = createFighters(...selectedFighters);

  arena.append(healthIndicators, fighters);
  return arena;
}

function createHealthIndicators(leftFighter, rightFighter) {
  const healthIndicators = createElement({ tagName: 'div', className: 'arena___fight-status' });
  const versusSign = createElement({ tagName: 'div', className: 'arena___versus-sign' });
  const leftFighterIndicator = createHealthIndicator(leftFighter, 'left');
  const rightFighterIndicator = createHealthIndicator(rightFighter, 'right');

  healthIndicators.append(leftFighterIndicator, versusSign, rightFighterIndicator);
  return healthIndicators;
}

function createHealthIndicator(fighter, position) {
  const { name } = fighter;
  const container = createElement({ tagName: 'div', className: 'arena___fighter-indicator' });

  const cool = createElement({ tagName: 'div', className: 'arena___cool-indicator' });
  const coolDown = createElement({ tagName: 'div', className: 'arena___cool-bar', attributes: { id: `${position}-fighter-coolDown` }});

  const fighterName = createElement({ tagName: 'span', className: 'arena___fighter-name' });

  const indicator = createElement({ tagName: 'div', className: 'arena___health-indicator' });
  const bar = createElement({ tagName: 'div', className: 'arena___health-bar', attributes: { id: `${position}-fighter-indicator` }});

  const keys = createElement({ tagName: 'div', className: 'arena___keys-indicator' });
  const attack =  createElement({ tagName: 'div', className: 'arena___keys-attack'});
  var attributes = {
    src:'https://www.pngarts.com/files/5/Punch-PNG-High-Quality-Image.png',
    title:'attack',
    alt:'attack icon'
  };
  const attackText =  createElement({ tagName: 'div', className: 'arena___keys-attackText'});
  const attackImg = createElement({tagName:'img',className:'fighter-arena___keys-attackImg',attributes});
  attack.append(attackImg,attackText);
  const defense =  createElement({ tagName: 'div', className: 'arena___keys-defense'});
   attributes = {
    src:'https://i.redd.it/vd4yrq7ofue51.png',
    title:'defense',
    alt:'defense icon'
  };
  const defenseText =  createElement({ tagName: 'div', className: 'arena___keys-defenseText'});
  const defenseImg = createElement({tagName:'img',className:'fighter-arena___keys-defenseImg',attributes});
  defense.append(defenseImg,defenseText);
  const spec =  createElement({ tagName: 'div', className: 'arena___keys-spec'});
   attributes = {
    src:'https://cdn.discordapp.com/attachments/689821266169036847/841315463636058122/1.png',
    title:'special-attack',
    alt:'special-attack icon'
  };
  const specText =  createElement({ tagName: 'div', className: 'arena___keys-specText'});
  const specImg = createElement({tagName:'img',className:'fighter-arena___keys-specImg',attributes});
  spec.append(specImg,specText);
  if(position=='left'){
    attackText.innerText='A';
    defenseText.innerText='D';
    specText.innerText='Q+W+E';
  }else{
    attackText.innerText='J';
    defenseText.innerText='L';
    specText.innerText='U+I+O';
  }
  keys.append(attack,defense,spec);
  fighterName.innerText = name;
  cool.append(coolDown);
  indicator.append(bar);
  container.append(fighterName, indicator,cool,keys);

  return container;
}

function createFighters(firstFighter, secondFighter) {
  const battleField = createElement({ tagName: 'div', className: `arena___battlefield` });
  const firstFighterElement = createFighter(firstFighter, 'left');
  const secondFighterElement = createFighter(secondFighter, 'right');

  battleField.append(firstFighterElement, secondFighterElement);
  return battleField;
}

function createFighter(fighter, position) {
  const imgElement = createFighterImage(fighter);
  const positionClassName = position === 'right' ? 'arena___right-fighter' : 'arena___left-fighter';
  const fighterElement = createElement({
    tagName: 'div',
    className: `arena___fighter ${positionClassName}`,
  });

  fighterElement.append(imgElement);
  return fighterElement;
}
