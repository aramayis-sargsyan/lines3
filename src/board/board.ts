import { Container } from 'pixi.js';
import { Cell } from './cell';
import { BoardConfig } from '../config';
import { Ball } from './ball';
import { sampleSize } from 'lodash';
import { colors } from '../const';
import { getRandomInRange } from '../utils';
import * as PF from 'pathfinding';
import { Circle } from './circle';

export class Board extends Container {
    cells: Cell[];
    balls: Ball[];
    matrixCells: number[][];
    circleBall: Ball;
    constructor() {
        super();
        this.cells = [];
        this.balls = [];
        this.circleBall = null;
        this.matrixCells = [];
    }

    buildCell() {
        const { cell_count, cell_width } = BoardConfig;
        for (let i = 0; i < cell_count; i++) {
            const arr = [];

            for (let j = 0; j < cell_count; j++) {
                const boardCell = new Cell(i, j);
                arr.push(0);
                boardCell.on('onClick', (cell) => {
                    this.buildCircle(cell);
                });
                boardCell.ball = null;
                boardCell.i = j;
                boardCell.j = i;
                boardCell.buildCell(0);
                boardCell.position.set(j * (cell_width + 1), i * (cell_width + 1));
                boardCell.tint = (i + j) % 2 === 0 ? 0x888888 : 0xbbbbbb;
                this.cells.push(boardCell);
                this.addChild(boardCell);
            }
            this.matrixCells.push([...arr]);
        }
    }

    buildCellBall(ballCount) {
        let color = 0;
        const { cell_width, queue_balls_count } = BoardConfig;
        const emptyCells = this.cells.filter((cell) => {
            return cell.ball === null;
        });
        const initial_cell = sampleSize(emptyCells, ballCount);

        for (let i = 0; i < ballCount; i++) {
            const boardBall = new Ball();
            boardBall.buildBall();
            boardBall.IsActive = false;
            boardBall.circle = null;
            boardBall.j = null;
            boardBall.i = null;
            initial_cell[i].ball = boardBall;
            color = Math.floor(getRandomInRange(0, 5));
            initial_cell[i].ball.tint = colors[color];
            this.balls.push(initial_cell[i].ball);
            initial_cell[i].addChild(initial_cell[i].ball);

            initial_cell[i].setBall(initial_cell[i], boardBall);
            this.matrixCells[initial_cell[i].j][initial_cell[i].i] = 1;
        }
    }

    buildCircle(cell) {
        if (this.circleBall) {
            this.circleBall.circle.destroy();
            this.circleBall.circle = null;
            this.circleBall.IsActive = false;
        }

        if (cell.ball !== null) {
            this.circleBall = cell.ball;
            const circle = new Circle();
            this.circleBall.circle = circle;
            this.circleBall.i = cell.i;
            this.circleBall.j = cell.j;
            this.circleBall.IsActive = true;
            this.addChild(cell);
            this.circleBall.addChild(circle);
        } else {
            if (this.circleBall) {
                const paths = this.getPath(this.circleBall.i, this.circleBall.j, cell.i, cell.j);
                paths.length && this._moveBall(paths);
            }
            this.circleBall = null;
        }
    }

    getPath(xStart, yStart, xEnd, yEnd) {
        const grid = new PF.Grid(this.matrixCells);
        const finder = new PF.AStarFinder();
        const path = finder.findPath(xStart, yStart, xEnd, yEnd, grid);
        return path;
    }

    _moveBall(paths) {
        // const { cell_count, queue_balls_count } = BoardConfig;
        // this.matrixCells[paths[0][1]][paths[0][0]] = 0;
        // this.matrixCells[paths[paths.length - 1][1]][paths[paths.length - 1][0]] = 1;
        // let indexStart = paths[0][1] * cell_count + paths[0][0];
        // let indexEnd = paths[paths.length - 1][1] * cell_count + paths[paths.length - 1][0];
        // this.cells[indexEnd].ball = this.cells[indexStart].ball;
        // this.cells[indexEnd].addChild(this.cells[indexStart].ball);
        // this.cells[indexStart].ball = null;
        paths.reduce((acc, el) => {});
    }
}