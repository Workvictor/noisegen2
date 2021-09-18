export let app_view = {} as AppView;

function setup_screen() {
  app_view.screen.width = window.innerWidth;
  app_view.screen.height = window.innerHeight;
  app_view.draw_context = app_view.screen.getContext('2d')!;
}

export function view_init() {
  app_view.inputs = Array.from(document.querySelectorAll('input'));
  app_view.output = Array.from(document.querySelectorAll('output'));
  app_view.screen = document.querySelector<Canvas>('#screen')!;
  app_view.draw_context = app_view.screen.getContext('2d')!;
  app_view.controls = document.querySelector<HTMLElement>('#controls')!;

  if (!app_view.draw_context) throw new Error();
  if (!app_view.screen) throw new Error();
  if (!app_view.controls) throw new Error();

  setup_screen();

  window.addEventListener('resize', setup_screen);
}

export function controls_toggle() {
  app_view.controls.classList.toggle('hidden');
}
