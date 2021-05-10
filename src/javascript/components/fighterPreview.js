import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  if(fighter==undefined){
    return fighterElement;
  }
  const infoInner = createElement({
    tagName: 'div',
    className: `fighter-preview___inner`,
  });
  const charAll = createElement({
    tagName: 'div',
    className: `fighter-preview___charAll`,
  });
    const fighter_img = createFighterImage(fighter);
    const fighter_name = createFighterName(fighter);
    const fighter_health = createFighterCharacteristic(fighter,'health');
    const fighter_defense = createFighterCharacteristic(fighter,'defense');
    const fighter_attack = createFighterCharacteristic(fighter,'attack');
    fighterElement.appendChild(fighter_img);
    infoInner.appendChild(fighter_name);
    charAll.appendChild(fighter_health);
    charAll.appendChild(fighter_defense);
    charAll.appendChild(fighter_attack);
    infoInner.appendChild(charAll);
    fighterElement.appendChild(infoInner);


  return fighterElement;
}

export function createFighterName(fighter) {
  const { name } = fighter;

  const nameElement = createElement({
    tagName: 'div',
    className: 'fighter-preview___name'
  });
  nameElement.innerText = name;
  return nameElement;
}


export function createFighterCharacteristic(fighter,char) {
  const CharElement = createElement({
    tagName: 'div',
    className: 'fighter-preview___char'
  });

  const CharTextElement = createElement({
    tagName: 'span',
    className: 'fighter-preview___charText'
  });
  let choto = {value:0,source:''};
  switch (char) {
    case 'health':
      choto.value=fighter.health;
      choto.source='https://cdn.discordapp.com/attachments/689821266169036847/840972200411922472/heart.png';
      break;
    case 'defense':
      choto.value=fighter.defense;
      choto.source='https://i.redd.it/vd4yrq7ofue51.png';
      break;
    case 'attack':
      choto.value=fighter.attack;
      choto.source='https://www.pngarts.com/files/5/Punch-PNG-High-Quality-Image.png';
      break;
    default:

  }
  CharTextElement.innerText = choto.value;

  const attributes = {
    src:choto.source,
    title:char,
    alt:char+' icon'
  };

  const CharImgElement = createElement({tagName:'img',className:'fighter-preview___charImg',attributes});

  CharElement.appendChild(CharImgElement);
  CharElement.appendChild(CharTextElement);
  return CharElement;
}


export function createFighterImage(fighter) {
  const source = fighter.source;
  const name = fighter.name;

  const attributes = {
    src: source,
    title: name,
    alt: name
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
