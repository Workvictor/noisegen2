import './css/index.css';
import { draw_init } from './draw';
import { raf_init } from './raf';
import { gen_init } from './generator';
import { view_init } from './view';
import { actions_init } from './actions';
import { data_input_init } from './data_input';
import { data_output_init } from './data_output';
import { data_init } from './data';

data_init();
view_init();
actions_init();
data_input_init();
data_output_init();
draw_init();
raf_init();
gen_init();
