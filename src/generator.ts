import { app_data } from './data';
import { EDataID } from './type_assist';
import { create_canvas } from './utils/canvas';
import { clamp } from './utils/clamp';
import { app_view } from './view';

function random() {
  return `hsl(0,0%,${Math.random() * 100}%)`;
}

function on_complete() {
  app_data[EDataID.gen_running] = false;
}

function gen_step() {
  const slide_lenght = app_view.screen.width * app_view.screen.height;
  const total = slide_lenght * app_data[EDataID.slides_total];
  const complete = app_data[EDataID.gen_index] === total;
  const slide_index = clamp(
    Math.floor(app_data[EDataID.gen_index] / slide_lenght),
    0,
    app_data[EDataID.slides_total] - 1
  );

  if (!app_data[EDataID.slides_list][slide_index]) {
    app_data[EDataID.slides_list].push(create_canvas(app_view.screen.width, app_view.screen.height)!);
  }

  const slide = app_data[EDataID.slides_list][slide_index];
  const x = app_data[EDataID.gen_index] % app_view.screen.width;
  const y = Math.floor((app_data[EDataID.gen_index] - x) / app_view.screen.width) % app_view.screen.height;

  if (y % app_data[EDataID.period_y] === 0 && x % app_data[EDataID.period_x] === 0) {
    slide.fillStyle = random();
    slide.fillRect(x, y, 1, 1);
    app_data[EDataID.gen_progress_current] = clamp(app_data[EDataID.gen_index] / total, 0, 1);
  }

  if (complete) {
    app_data[EDataID.gen_index] = total;
  }

  app_data[EDataID.gen_index]++;

  return complete;
}

function gen_run() {
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
  requestAnimationFrame(gen_run);
}

export function gen_init() {
  app_data[EDataID.gen_index] = 0;
  app_data[EDataID.gen_running] = false;
  app_data[EDataID.gen_stopped] = false;
}

export function gen_stop() {
  app_data[EDataID.gen_stopped] = true;
  app_data[EDataID.slides_list].forEach(slide => {
    slide.clearRect(0, 0, slide.canvas.width, slide.canvas.height);
  });
}

export function gen_start() {
  gen_stop();
  app_data[EDataID.gen_index] = 0;
  app_data[EDataID.gen_stopped] = false;
  if (app_data[EDataID.gen_running]) return;
  gen_run();
}
