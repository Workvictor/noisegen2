import { app_data } from './data';
import { raf_add } from './raf';
import { EDataID } from './type_assist';
import { app_view } from './view';

function next_slide() {
  const is_ready = app_data[EDataID.gen_progress_current] === 1;
  if (!is_ready) return app_data[EDataID.slides_list][0];
  const slide = app_data[EDataID.slides_list][app_data[EDataID.slides_index]];
  app_data[EDataID.slides_index] = (app_data[EDataID.slides_index] + 1) % app_data[EDataID.slides_total];
  return slide;
}

export function draw_reset() {
  app_data[EDataID.slides_index] = 0;
}

export function draw_init() {
  draw_reset();
  raf_add(() => {
    const slide = next_slide();
    app_view.draw_context.clearRect(0, 0, app_view.draw_context.canvas.width, app_view.draw_context.canvas.height);
    if (!slide) return;
    app_view.draw_context.drawImage(slide.canvas, 0, 0);
  });
}
