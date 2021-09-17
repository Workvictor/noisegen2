export let app_view = {} as AppView;

function setup_screen() {
  app_view.screen.width = window.innerWidth;
  app_view.screen.height = window.innerHeight;

  window.addEventListener('resize', () => {
    console.log('resize', [window.innerWidth, window.innerHeight]);
  });
}

export function view_init() {
  app_view.buttons = Array.from(document.querySelectorAll('button'));
  app_view.inputs = Array.from(document.querySelectorAll('input'));
  app_view.output = Array.from(document.querySelectorAll('output'));
  app_view.action_btn = app_view.buttons.filter(btn => !!btn.dataset.action);
  app_view.screen = document.querySelector<Canvas>('#screen')!;
  app_view.draw_context = app_view.screen.getContext('2d')!;

  if (!app_view.draw_context) throw new Error();
  if (!app_view.screen) throw new Error();

  setup_screen();

  window.addEventListener('resize', setup_screen);
}
