import * as PIXI from 'pixi.js';

export class Game extends PIXI.Application {
  constructor() {
    super({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0x009334,
    });

    document.body.appendChild(this.view);

    this.ticker.add(this._update, this);
    this.ticker.start();

    this.loader.onComplete.add(this._onLoadComplete, this);
    this.loader.load();
  }

  _onLoadComplete() {
    console.warn('load complete');
  }

  _update() {
    console.log('update');
  }
}
