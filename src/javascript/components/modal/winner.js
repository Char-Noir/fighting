import { createElement } from '../../helpers/domHelper';
import { showModal } from './modal';
export function showWinnerModal(fighter) {
  // call showModal function
  var body = createElement({tagName:'div',className:'winner-body'});
  body.innerText='You are businka!\nAnother player, try again!';
  var title = `Winner is ${fighter.position} : ${fighter.name}`;
  var rel_lo =()=>{ window.location.reload()};
  var params = {
    title:title,
    bodyElement:body,
    onClose:rel_lo
  };
  showModal(params);
}
