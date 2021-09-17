import { EBtnAction } from 'src/type_assist';
import { draw_reset } from './draw';
import { gen_start, gen_stop } from './generator';
import { app_view } from './view';

const actions_map: Record<string, (e: MouseEvent) => void> = {
  [EBtnAction.generate_start]() {
    draw_reset();
    gen_start();
  },
  [EBtnAction.toggle_controls]() {
    //
  },
  [EBtnAction.generate_stop]() {
    gen_stop();
  },
};

export function actions_init() {
  app_view.action_btn.forEach(btn => {
    const action = btn.dataset.action && actions_map[btn.dataset.action];
    if (action) btn.addEventListener('click', action);
  });
}
