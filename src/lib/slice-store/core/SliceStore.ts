import { Observer } from "./Observer";

export class SliceStore<T> extends Observer<T> {
  private mounted = false;
  state: T;

  constructor(initState: () => T) {
    super();
    this.state = initState();
  }

  setup = (fn: any) => {
    if (this.mounted) {
      return;
    }
    this.mounted = true;
    fn();
  };

  emit = (state: T) => {
    this.state = state;
    this.notify(state);
  };
}
