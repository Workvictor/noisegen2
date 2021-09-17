import { EBtnAction } from 'src/type_assist';
import { draw_reset } from './draw';
import { gen_start, gen_stop } from './generator';
import { app_view, controls_toggle } from './view';

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
  app_view.action_btn.forEach(btn => {
    const action = btn.dataset.action && actions_map[btn.dataset.action];
    if (action) btn.addEventListener('click', action);
  });
}
