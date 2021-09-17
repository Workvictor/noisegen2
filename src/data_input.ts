import { app_data } from './data';
import { gen_stop } from './generator';
import { EDataID } from './type_assist';
import { app_view } from './view';

const data_bind_map: Record<string, (val: string) => any> = {
  [EDataID.period](val) {
    gen_stop();
    app_data[EDataID.period] = Number(val);
  },
  [EDataID.gen_radius](val) {
    gen_stop();
    app_data[EDataID.gen_radius] = Number(val);
  },
  [EDataID.gen_alpha](val) {
    gen_stop();
    app_data[EDataID.gen_alpha] = Number(val);
  },
  [EDataID.gen_void](val) {
    gen_stop();
    app_data[EDataID.gen_void] = Number(val);
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
