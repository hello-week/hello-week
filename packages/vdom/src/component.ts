import { h } from "./hyperscript";
import { diff } from "./vdom";
import { VNode, PrevState } from "./types";

/**
 * Function to update the component by diffing the virtual DOM.
 * @param component - The component to be updated.
 */
export function updateComponent<T extends Component>(component: T): void {
  const rendered = component.render(component.props, component.state);
  component.base = diff(component.base, rendered);
}

/**
 * Base class for creating components.
 * @typeParam P - The type of the component's props.
 * @typeParam S - The type of the component's state.
 */
export default class Component<P = unknown, S = unknown> {
  /**
   * The props passed to the component.
   */
  public props: P;
  /**
   * The state of the component.
   */
  public state: S;
  /**
   * The base element of the component.
   */
  public base: Element;

  /**
   * Creates a new instance of the Component class.
   * @param props - The props to be passed to the component.
   */
  constructor(props: P) {
    this.props = props;
    this.state = null;
  }

  /**
   * Sets the state of the component.
   * @param state - The new state to be set or a function to update the current state.
   */
  setState(state: PrevState<S> | S): void {
    if (typeof state === "function") {
      this.state = (state as PrevState<S>)(this.state);
    } else {
      this.state = state;
    }
    updateComponent<Component>(this);
  }

  /**
   * Renders the component to a virtual node (VNode).
   * @param props - The props of the component.
   * @param state - The state of the component.
   * @returns The virtual node representing the component's content.
   */
  render(props: P, state: S): VNode<Component | string> {
    const attributes = { ...props, ...state };
    return h<Component>(this, attributes);
  }
}
