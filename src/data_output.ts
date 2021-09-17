import { app_data } from './data';
import { raf_add } from './raf';
import { EDataID } from './type_assist';
import { app_view } from './view';

const data_format_map: Record<string, () => string> = {
  [EDataID.gen_progress_current]() {
    return String(Math.floor(app_data[EDataID.gen_progress_current] * 100));
  },
};

export function data_output_init() {
  raf_add(() => {
    app_view.output.forEach(output => {
      if (!output.dataset.id) return;
      if (!(output.dataset.id in app_data)) return;
      if (!(output.dataset.id in data_format_map)) {
        output.value = String(app_data[output.dataset.id]);
        return;
      }
      output.value = data_format_map[output.dataset.id]();
    });
  });
}
