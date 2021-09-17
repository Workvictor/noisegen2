import { app_data } from './data';
import { gen_stop } from './generator';
import { EDataID } from './type_assist';
import { app_view } from './view';

const data_bind_map: Record<string, (val: string) => any> = {
  [EDataID.period_x](val) {
    gen_stop();
    app_data[EDataID.period_x] = Number(val);
  },
  [EDataID.period_y](val) {
    gen_stop();
    app_data[EDataID.period_y] = Number(val);
  },
  [EDataID.slides_total](val) {
    gen_stop();
    app_data[EDataID.slides_total] = Number(val);
  },
};

export function data_input_init() {
  app_view.inputs.forEach(input => {
    if (!input.dataset.id) return;
    if (!(input.dataset.id in app_data)) return;
    input.value = String(app_data[input.dataset.id]);

    input.addEventListener('input', () => {
      if (!input.dataset.id) return;
      if (!(input.dataset.id in data_bind_map)) return;
      data_bind_map[input.dataset.id](input.value);
    });
  });
}
