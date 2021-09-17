import { app_data } from './data';
import { EDataID } from './type_assist';
import { create_canvas } from './utils/canvas';
import { clamp } from './utils/clamp';
import { app_view } from './view';

function hsla(l = 0, a = 0.5) {
  return `hsla(0,0%,${l}%,${a})`;
}

function solid_black() {
  return hsla(0, app_data[EDataID.gen_void]);
}

function random_solid() {
  return hsla(Math.random() * 100, app_data[EDataID.gen_alpha]);
}

function on_complete() {
  app_data[EDataID.gen_running] = false;
}

function gen_step() {
  let local_index = app_data[EDataID.gen_index];
  let local_progress = app_data[EDataID.gen_progress_current];
  const slides = app_data[EDataID.slides_list];
  const period = app_data[EDataID.period];
  const gen_radius = app_data[EDataID.gen_radius];
  const slides_total = app_data[EDataID.slides_total];
  const slide_width = app_view.screen.width;
  const slide_height = app_view.screen.height;
  const slide_lenght = slide_width * slide_height;
  const total = slide_lenght * slides_total;
  const complete = local_index >= total;
  const slide_index = clamp(Math.floor(local_index / slide_lenght), 0, slides_total - 1);

  if (!slides[slide_index]) slides.push(create_canvas(slide_width, slide_height));

  const slide = slides[slide_index];
  const x = local_index % slide_width;
  const y = Math.floor((local_index - x) / slide_width) % slide_height;

  if (y % period === 0) {
    slide.fillStyle = random_solid();
    slide.fillRect(x, y, gen_radius, gen_radius);
  }
  if (y % period !== 0 && x === 0) {
    slide.fillStyle = solid_black();
    slide.fillRect(x, y, slide_width, gen_radius);
    local_progress = clamp(local_index / total, 0, 1);
  }

  local_index += gen_radius;

  if (local_index > total) {
    local_index = total;
    local_progress = 1;
  }

  app_data[EDataID.gen_index] = local_index;
  app_data[EDataID.gen_progress_current] = local_progress;

  return complete;
}

function gen_run_loop() {
  const exit_time = Date.now() + 1000 / 60;
  let is_complete = false;
  app_data[EDataID.gen_running] = true;

  if (app_data[EDataID.gen_stopped]) {
    is_complete = true;
  }

  while (exit_time > Date.now() && !is_complete) {
    is_complete = gen_step();
  }

  if (is_complete) return on_complete();
  requestAnimationFrame(gen_run_loop);
}

export function gen_stop() {
  app_data[EDataID.gen_stopped] = true;
  app_data[EDataID.gen_index] = 0;
  app_data[EDataID.gen_progress_current] = 0;
}

export function gen_start() {
  app_data[EDataID.gen_index] = 0;
  app_data[EDataID.gen_stopped] = false;
  app_data[EDataID.slides_list].forEach(slide => {
    slide.clearRect(0, 0, slide.canvas.width, slide.canvas.height);
  });
  if (app_data[EDataID.gen_running]) return;
  gen_run_loop();
}

export function gen_init() {
  app_data[EDataID.gen_index] = 0;
  app_data[EDataID.gen_running] = false;
  app_data[EDataID.gen_stopped] = true;
  window.addEventListener('resize', gen_stop);
}
