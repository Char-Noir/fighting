import { createElement } from '../helpers/domHelper';
import { createFightersSelector } from './fighterSelector';
import { getFighterInfo } from './fighterSelector';


export function createFighters(fighters) {
  const selectFighter = createFightersSelector();
  const container = createElement({ tagName: 'div', className: 'fighters___root' });
  const preview = createElement({ tagName: 'div', className: 'preview-container___root' });
  const fightersList = createElement({ tagName: 'div', className: 'fighters___list' });
  const fighterElements = fighters.map((fighter) => createFighter(fighter, selectFighter));

  fightersList.append(...fighterElements);
  container.append(preview, fightersList);

  return container;
}

function createFighter(fighter, selectFighter) {
  let fighter_bom;
  const char = createElement({ tagName: 'p', className: 'fighter_info' });
  let fighter_details = getFighterInfo(fighter._id);
  fighter_details.then((value) => {
    fighter_bom = value;
    char.innerText = `Name: ${fighter.name} \n Health: ${fighter_bom.health} \n Defense: ${fighter_bom.defense} \n Attack: ${fighter_bom.attack} \n`;
  });
  const fighterElement = createElement({ tagName: 'div', className: 'fighters___fighter' });
  const imageElement = createImage(fighter);

  const onClick = (event) => selectFighter(event, fighter._id);

  fighterElement.append(imageElement, char);
  fighterElement.addEventListener('click', onClick, false);

  return fighterElement;
}

function createImage(fighter) {
  const { source, name } = fighter;
  const attributes = {
    src: source,
    title: name,
    alt: name,
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter___fighter-image',
    attributes
  });

  return imgElement;
}
