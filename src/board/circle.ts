import { Graphics } from 'pixi.js';
import { BoardConfig } from '../config';

export class Circle extends Graphics {
    constructor() {
        super();

        this._buildCircle();
    }

    _buildCircle() {
        const { circle_width } = BoardConfig;
        this.lineStyle(2, 0xffffff);
        this.drawCircle(0, 0, circle_width);
        this.endFill();
    }
}
