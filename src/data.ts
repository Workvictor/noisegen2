import { EDataID } from './type_assist';

export let app_data = {} as TAppData;

export function data_init() {
  app_data[EDataID.period_x] = 1;
  app_data[EDataID.period_y] = 4;
  app_data[EDataID.period_y] = 4;
  app_data[EDataID.gen_index] = 0;
  app_data[EDataID.gen_running] = false;
  app_data[EDataID.gen_progress_current] = 0;
  app_data[EDataID.raf_sample_rate] = 1000 / 24;
  app_data[EDataID.raf_subscribers] = [];
  app_data[EDataID.raf_unsub_queue] = [];
  app_data[EDataID.raf_remove_queue] = [];
  app_data[EDataID.raf_time] = Date.now();
  app_data[EDataID.slides_list] = [];
  app_data[EDataID.slides_total] = 6;
  app_data[EDataID.slides_index] = 0;
}
