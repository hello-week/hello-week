import { HelloWeek as MyHelloWeek } from "./core/calendar";

export const HelloWeek = MyHelloWeek;

(window as any).HelloWeek = HelloWeek;

export default MyHelloWeek;
