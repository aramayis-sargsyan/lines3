import { sampleSize } from 'lodash';
import * as PF from 'pathfinding';
import { Container } from 'pixi.js';
import { getBoomBall } from '../boomPos';
import { BoardConfig } from '../config';
import { colors } from '../const';
import { getRandomInRange } from '../utils';
import { Ball } from './ball';
import { Cell } from './cell';
import { Circle } from './circle';
export class Board extends Container {
    cells: Cell[];
    balls: Ball[];
    matrixCells: number[][];
    activeBall: Ball;
    boomBalls: Ball[][];
    queCollors: number[];
    constructor() {
        super();
        this.cells = [];
        this.balls = [];
        this.activeBall = null;
        this.matrixCells = [];
        this.boomBalls = [];
        this.queCollors = [];
    }

    buildCells() {
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

                boardCell.build(0, cell_width);
                boardCell.position.set(j * (cell_width + 1), i * (cell_width + 1));
                boardCell.tint = (i + j) % 2 === 0 ? 0x888888 : 0xbbbbbb;
                this.cells.push(boardCell);
                this.addChild(boardCell);
            }
            this.matrixCells.push([...arr]);
            arr.push([...arr]);
        }
    }

    buildCellBalls(ballCount, collor) {
        let color = 0;
        const { cell_width, queue_balls_count, cell_count } = BoardConfig;
        const emptyCells = this.cells.filter((cell) => {
            return cell.ball === null;
        });

        const initial_cell = sampleSize(emptyCells, ballCount);

        for (let i = 0; i < ballCount; i++) {
            const boardBall = new Ball();
            boardBall.build();
            boardBall.IsActive = false;
            boardBall.circle = null;

            if (!initial_cell[i]) {
                this._onCheck('game over');
            }

            boardBall.j = this.cells[initial_cell[i].i * cell_count + initial_cell[i].j].j;
            boardBall.i = this.cells[initial_cell[i].i * cell_count + initial_cell[i].j].i;

            initial_cell[i].ball = boardBall;

            if (collor) {
                color = collor[i];
            } else {
                color = Math.floor(getRandomInRange(0, 5));
            }
            initial_cell[i].ball.tint = colors[color];
            boardBall.color = colors[color];
            this.balls.push(initial_cell[i].ball);
            initial_cell[i].addChild(initial_cell[i].ball);

            initial_cell[i].setBall(initial_cell[i], boardBall);
            this.matrixCells[initial_cell[i].j][initial_cell[i].i] = 1;
        }
    }

    buildCircle(cell) {
        if (this.activeBall) {
            this.activeBall.circle.destroy();
            this.activeBall.circle = null;
            this.activeBall.IsActive = false;
        }

        if (cell.ball !== null) {
            this.activeBall = cell.ball;
            const circle = new Circle();
            this.activeBall.circle = circle;
            this.activeBall.i = cell.i;
            this.activeBall.j = cell.j;
            this.activeBall.IsActive = true;
            this.addChild(cell);
            this.activeBall.addChild(circle);
        } else {
            if (this.activeBall) {
                const paths = this.getPath(this.activeBall.i, this.activeBall.j, cell.i, cell.j);
                paths.length && this._moveBall(paths);
            }
            this.activeBall = null;
        }
    }

    getPath(xStart, yStart, xEnd, yEnd) {
        const grid = new PF.Grid(this.matrixCells);
        const finder = new PF.AStarFinder();
        const path = finder.findPath(xStart, yStart, xEnd, yEnd, grid);
        return path;
    }

    _moveBall(paths) {
        const { cell_count, queue_balls_count } = BoardConfig;
        let ballCount = queue_balls_count;

        this.cells.forEach((el) => {
            el.interactive = false;
        });
        const promises = [];
        paths.reduce((acc, el, i) => {
            const prom = new Promise((res) => {
                setTimeout(() => {
                    const indexEl = el[1] * cell_count + el[0];
                    const indexAcc = acc[1] * cell_count + acc[0];
                    this.cells[indexEl].addChild(this.cells[indexAcc].ball);
                    this.cells[indexEl].ball = this.cells[indexAcc].ball;
                    this.cells[indexEl].ball.i = Math.floor(indexEl / cell_count);
                    this.cells[indexEl].ball.j = indexEl % cell_count;

                    this.cells[indexAcc].ball = null;
                    res(paths[paths.length - 1]);
                }, 100 * i);
                this.matrixCells[acc[1]][acc[0]] = 0;
                this.matrixCells[el[1]][el[0]] = 1;
            });
            promises.push(prom);
            return el;
        });

        Promise.all(promises).then((result) => {
            this.cells.forEach((el) => {
                el.interactive = true;
            });
            setTimeout(() => {
                this.boomBalls = getBoomBall(this.cells, result[0]);

                this.boomBall(result[0]);

                const checkLength = this.boomBalls.find((item) => {
                    return item.length > 0;
                });
                if (checkLength) {
                    this._onCheck(checkLength.length);
                    ballCount = 0;
                }

                //
                this._onCheck(0);
                return this.buildCellBalls(ballCount, this.queCollors);
            });
        });
    }

    boomBall(result) {
        const { cell_count, match_balls_count } = BoardConfig;

        let count = 0;
        for (let i = 0; i < this.boomBalls.length; i++) {
            if (this.boomBalls[i].length >= match_balls_count) {
                count += 1;
                for (let j = 0; j < this.boomBalls[i].length; j++) {
                    if (this.cells[cell_count * result[1] + result[0]].ball !== this.boomBalls[i][j]) {
                        this.boomBalls[i][j].destroy();

                        this.matrixCells[this.boomBalls[i][j].i][this.boomBalls[i][j].j] = 0;
                        this.cells[this.boomBalls[i][j].j + this.boomBalls[i][j].i * cell_count].ball = null;
                    }
                }
            }
        }
        if (count > 0) {
            this.cells[cell_count * result[1] + result[0]].ball.destroy();
            this.matrixCells[result[1]][result[0]] = 0;
            this.cells[cell_count * result[1] + result[0]].ball = null;
        }
    }

    _onCheck(x) {
        this.emit('onCheck', x);
    }
}
