/* eslint-disable @typescript-eslint/no-empty-interface */
import { VNode } from "vue";

declare global {
  // eslint-disable-next-line no-unused-vars
  namespace JSX {
    // eslint-disable-next-line no-unused-vars
    interface Element extends VNode {}
  }

  interface LooseObject {
    [key: string]: any;
  }

  interface Window {
    // window对象属性
    [key: string]: any;
  }

  interface Date {
    format(fmt: string): string;
  }
}
