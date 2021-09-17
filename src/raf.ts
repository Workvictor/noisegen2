import { app_data } from './data';
import { EDataID } from './type_assist';

export function raf_add(sub: (remove_handler: () => void) => void) {
  const index = app_data[EDataID.raf_subscribers].length;
  app_data[EDataID.raf_remove_queue].push(() => app_data[EDataID.raf_unsub_queue].push(index));
  app_data[EDataID.raf_subscribers].push(sub);
}

function raf_update() {
  if (app_data[EDataID.raf_time] <= Date.now()) {
    app_data[EDataID.raf_time] = Date.now() + app_data[EDataID.raf_sample_rate];

    let i = 0;
    let iterations = app_data[EDataID.raf_subscribers].length;

    for (i; i < iterations; i++) {
      app_data[EDataID.raf_subscribers][i]?.(app_data[EDataID.raf_remove_queue][i]);
    }

    i = 0;
    iterations = app_data[EDataID.raf_unsub_queue].length;
    for (i; i < iterations; i++) {
      app_data[EDataID.raf_subscribers].splice(app_data[EDataID.raf_unsub_queue][i], 1);
    }
    app_data[EDataID.raf_unsub_queue].length = 0;
  }

  requestAnimationFrame(raf_update);
}

export function raf_init() {
  requestAnimationFrame(raf_update);
}
