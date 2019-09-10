import { on, off } from './listeners';

export interface SortableOptions {
  animationSpeed: number;
  animationEasing: 'ease-out';
}

class Sortable {
  private list: HTMLElement;

  private items: HTMLElement[];

  private item?: HTMLElement;

  private itemHeight?: number;

  private listHeight?: number;

  private startTouchY?: number;

  private startTop?: number;

  private positions?: number[];

  private position?: number;

  private touch?: boolean;

  private handle?: HTMLElement | null;

  private animation: boolean;

  private options: SortableOptions;

  public constructor(list: HTMLElement, options?: SortableOptions) {
    if (!list) throw Error('Element is not defined');

    this.list = list;

    this.items = Array.from(this.list.children) as HTMLElement[];
    this.animation = false;

    this.options = {
      animationSpeed: 200,
      animationEasing: 'ease-out',
      ...options,
    };

    this.dragStart = this.dragStart.bind(this);
    this.dragMove = this.dragMove.bind(this);
    this.dragEnd = this.dragEnd.bind(this);

    on(this.list, 'touchstart', this.dragStart);
    on(this.list, 'mousedown', this.dragStart);
  }

  private dragStart(event: MouseEvent & TouchEvent): void {
    if (this.animation) return;
    if (event.type === 'mousedown' && event.which !== 1) return;
    if (event.type === 'touchstart' && event.touches.length > 1) return;

    this.handle = null;

    let el = event.target as HTMLElement;

    while (el) {
      if (el.hasAttribute('sortable-handle')) this.handle = el;
      if (el.hasAttribute('sortable-item')) this.item = el;
      if (el.hasAttribute('sortable-list')) break;

      el = el.parentElement as HTMLElement;
    }

    if (!this.handle) return;

    this.list.style.position = 'relative';
    this.list.style.height = `${this.list.offsetHeight}px`;

    if (!this.item) return;

    this.item.classList.add('is-dragging');

    this.itemHeight = this.items[1].offsetTop;
    this.listHeight = this.list.offsetHeight;
    this.startTouchY = this.getDragY(event);
    this.startTop = this.item.offsetTop;

    const offsetsTop = this.items.map((item): number => item.offsetTop);

    this.items.forEach((item, index): void => {
      item.style.position = 'absolute'; // eslint-disable-line no-param-reassign
      item.style.top = '0'; // eslint-disable-line no-param-reassign
      item.style.left = '0'; // eslint-disable-line no-param-reassign
      item.style.width = '100%'; // eslint-disable-line no-param-reassign
      item.style.transform = `translateY(${offsetsTop[index]}px)`; // eslint-disable-line no-param-reassign
      item.style.zIndex = item === this.item ? '2' : '1'; // eslint-disable-line no-param-reassign
    });

    setTimeout((): void => {
      this.items.forEach((item): void => {
        if (this.item === item) return;

        // eslint-disable-next-line no-param-reassign
        item.style.transition = `transform ${this.options.animationSpeed}ms ${this.options.animationEasing}`;
      });
    });

    this.positions = this.items.map((item, index): number => index);
    this.position = Math.round((this.startTop / this.listHeight) * this.items.length);

    this.touch = event.type === 'touchstart';

    on(window, this.touch ? 'touchmove' : 'mousemove', this.dragMove, { passive: false });
    on(window, this.touch ? 'touchend' : 'mouseup', this.dragEnd);
  }

  private dragMove(event: TouchEvent & MouseEvent): void {
    if (this.animation) return;

    const top = (this.startTop as number) + this.getDragY(event) - (this.startTouchY as number);
    const newPosition = Math.round((top / (this.listHeight as number)) * this.items.length);

    if (!this.item) return;

    this.item.style.transform = `translateY(${top}px)`;

    (this.positions as number[]).forEach((index: number): void => {
      if (index === this.position || index !== newPosition) return;

      this.swapElements((this.position as number), index);

      this.position = index;
    });

    this.items.forEach((item, index): void => {
      if (item === this.item) return;

      // eslint-disable-next-line no-param-reassign, max-len
      item.style.transform = `translateY(${(this.positions as number[]).indexOf(index) * (this.itemHeight as number)}px)`;
    });

    event.preventDefault();
  }

  private dragEnd(event: TouchEvent & MouseEvent): void {
    this.animation = true;

    if (!this.item) return;

    this.item.style.transition = `all ${this.options.animationSpeed}ms ${this.options.animationEasing}`;
    this.item.style.transform = `translateY(${(this.position as number) * (this.itemHeight as number)}px)`;

    this.item.classList.remove('is-dragging');

    setTimeout((): void => {
      this.list.style.position = '';
      this.list.style.height = '';

      this.items.forEach((item): void => {
        item.style.top = ''; // eslint-disable-line no-param-reassign
        item.style.left = ''; // eslint-disable-line no-param-reassign
        item.style.right = ''; // eslint-disable-line no-param-reassign
        item.style.position = ''; // eslint-disable-line no-param-reassign
        item.style.transform = ''; // eslint-disable-line no-param-reassign
        item.style.transition = ''; // eslint-disable-line no-param-reassign
        item.style.width = ''; // eslint-disable-line no-param-reassign
        item.style.zIndex = ''; // eslint-disable-line no-param-reassign
      });

      (this.positions as number[]).forEach((index: number): HTMLElement => this.list.appendChild(this.items[index]));

      this.items = Array.from(this.list.children) as HTMLElement[];

      this.animation = false;
    }, this.options.animationSpeed);

    off(window, this.touch ? 'touchmove' : 'mousemove', this.dragMove);
    off(window, this.touch ? 'touchend' : 'mouseup', this.dragEnd);
  }

  private swapElements(a: number, b: number): void {
    if (!this.positions || !this.positions.length) return;

    const temp = this.positions[a];

    this.positions[a] = this.positions[b];
    this.positions[b] = temp;
  }

  // eslint-disable-next-line class-methods-use-this
  private getDragY(event: TouchEvent & MouseEvent): number {
    return event.touches ? (event.touches[0] || event.changedTouches[0]).pageY : event.pageY;
  }
}

export default Sortable;
