import { app_data } from './data';
import { raf_add } from './raf';
import { EDataID } from './type_assist';
import { app_view } from './view';

function next_slide() {
  const slides = app_data[EDataID.slides_list];
  const index = app_data[EDataID.slides_index];
  const is_ready = app_data[EDataID.gen_progress_current] === 1;
  if (!is_ready) return slides[0];
  const slide = slides[index];
  app_data[EDataID.slides_index] = (index + 1) % app_data[EDataID.slides_total];
  return slide;
}

export function draw_reset() {
  app_data[EDataID.slides_index] = 0;
}

export function draw_init() {
  draw_reset();
  raf_add(() => {
    const slide = next_slide();
    const crc = app_view.draw_context;
    crc.clearRect(0, 0, crc.canvas.width, crc.canvas.height);
    if (!slide) return;
    if (app_data[EDataID.gen_stopped]) return;
    crc.drawImage(slide.canvas, 0, 0);
  });
}
