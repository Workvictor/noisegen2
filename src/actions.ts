import { EBtnAction } from 'src/type_assist';
import { draw_reset } from './draw';
import { gen_start, gen_stop } from './generator';
import { controls_toggle } from './view';

const actions_map: Record<string, (e: MouseEvent) => void> = {
  [EBtnAction.generate_start]() {
    draw_reset();
    gen_stop();
    gen_start();
  },
  [EBtnAction.generate_stop]() {
    gen_stop();
  },
  [EBtnAction.toggle_controls]() {
    controls_toggle();
  },
};

export function actions_init() {
  addEventListener('click', e => {
    if (e.target instanceof HTMLButtonElement) {
      const btn = e.target;
      const action = btn.dataset.action && actions_map[btn.dataset.action];
      if (action) action(e);
    }
  });
}
