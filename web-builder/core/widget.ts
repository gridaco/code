export class Widget {
  constructor() {}
}

export class MultiChildWidget extends Widget {
  constructor() {
    super();
  }
  children: Widget[];
}
