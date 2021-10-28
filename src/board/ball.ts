import { Graphics } from 'pixi.js';
import { BoardConfig } from '../config';
import { Circle } from './circle';
export class Ball extends Graphics {
    i: number;
    j: number;
    IsActive: boolean;
    circle: Circle;
    color: number;

    constructor() {
        super();
    }

    build() {
        const { ball_width } = BoardConfig;

        this.beginFill(0xffffff);
        this.drawCircle(0, 0, ball_width);
        this.endFill();
    }
}
