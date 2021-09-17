export const enum EBtnAction {
  generate_start = '0',
  generate_stop = '1',
  toggle_controls = '2',
}

export const enum EDataID {
  period_x = 'px',
  period_y = 'py',
  gen_index = 'gi',
  gen_running = 'gr',
  gen_stopped = 'gs',
  gen_progress_current = 'prg',
  raf_sample_rate = '1',
  raf_subscribers = '2',
  raf_unsub_queue = '3',
  raf_remove_queue = '4',
  raf_time = '5',
  slides_list = '6',
  slides_total = 'st',
  slides_index = '8',
}

declare global {
  interface DOMStringMap {
    action?: EBtnAction;
    id?: EDataID;
  }
  type TAppData = {
    [EDataID.period_x]: number;
    [EDataID.period_y]: number;
    [EDataID.gen_index]: number;
    [EDataID.gen_running]: boolean;
    [EDataID.gen_stopped]: boolean;
    /** Range [0, 1] */
    [EDataID.gen_progress_current]: number;
    [EDataID.raf_sample_rate]: number;
    [EDataID.raf_subscribers]: TRafSubscriber[];
    [EDataID.raf_unsub_queue]: number[];
    [EDataID.raf_remove_queue]: (() => void)[];
    /** Timestamp */
    [EDataID.raf_time]: number;
    [EDataID.slides_list]: CRC2D[];
    [EDataID.slides_total]: number;
    [EDataID.slides_index]: number;
  };
  type TRafSubscriber = (remove_handler: () => void) => void;
  type Canvas = HTMLCanvasElement;
  type CRC2D = CanvasRenderingContext2D;
  interface AppView {
    screen: Canvas;
    buttons: HTMLButtonElement[];
    action_btn: HTMLButtonElement[];
    draw_context: CRC2D;
    inputs: HTMLInputElement[];
    output: HTMLOutputElement[];
  }
}
