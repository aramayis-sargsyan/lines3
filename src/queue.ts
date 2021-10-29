import { Container } from 'pixi.js';
import { Ball } from './board/ball';
import { Cell } from './board/cell';
import { BoardConfig } from './config';
import { colors } from './const';
import { getRandomInRange } from './utils';

export class Queue extends Container {
    i: number;
    queueCells: Cell[];
    queueCell: Cell;
    queBall: Ball;
    colors: number;
    queColors: number[];
    constructor() {
        super();
        this.queColors = [];
        this.queueCells = [];
    }

    buildCell(): void {
        const { queue_balls_count, cell_width, cell_line_style } = BoardConfig;

        for (let i = 0; i < queue_balls_count; i++) {
            const queueCell = new Cell(queue_balls_count, 0);
            queueCell.i = i;
            queueCell.build(cell_line_style, cell_width);
            queueCell.position.set(queueCell.i * (cell_width + 1), cell_width);
            queueCell.tint = 0x555555;
            this.queueCells.push(queueCell);
            this.addChild(queueCell);
        }
    }

    buildBall() {
        const { queue_balls_count } = BoardConfig;
        for (let i = 0; i < queue_balls_count; i++) {
            const ball = new Ball();
            ball.build();
            const color = Math.floor(getRandomInRange(0, 5));
            ball.tint = colors[color];
            this.queColors.push(color);
            this.queueCells[i].setBall(this.queueCells[i], ball);
            this.queueCells[i].addChild(ball);
        }
        this.transferColor();
    }

    transferColor() {
        this.emit('transferColor', this.queColors);
        this.queColors = [];
    }
}
