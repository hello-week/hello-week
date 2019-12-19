import { HelloWeek as Calendar } from './core/calendar';
import { el } from './core/calendar';

import '../styles/main.scss';

export const HelloWeek = Calendar;
(window as any).HelloWeek = HelloWeek;

export default Calendar;
export { el };
