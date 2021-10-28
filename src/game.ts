import * as PIXI from 'pixi.js';
import { Board } from './board/board';
import { BoardConfig } from './config';
import { Queue } from './queue';
import { Score } from './score';

export class Game extends PIXI.Application {
    board: Board;
    queue: Queue;
    x: number[];
    constructor() {
        super({
            width: window.innerWidth,
            height: window.innerHeight,
            backgroundColor: 0x444444,
        });

        document.body.appendChild(this.view);

        this.ticker.add(this._update, this);
        this.ticker.start();

        this.loader.onComplete.add(this._onLoadComplete, this);
        this.loader.load();
    }

    _onLoadComplete() {
        this.buildBoard();
        this.buildQueue();
        this.creteScore();
    }

    _resize(width?, height?) {
        width = width || window.innerWidth;
        height = height || window.innerHeight;

        this._resizeCanvas(width, height);
        this._resizeRenderer(width, height);
    }

    _resizeCanvas(width, height) {
        const { style } = this.renderer.view;

        style.width = width + 'px';
        style.height = height + 'px';
    }

    _resizeRenderer(width, height) {
        this.renderer.resize(width, height);
    }

    buildBoard() {
        const { cell_width, cell_line_style, initial_balls_count } = BoardConfig;

        this.board = new Board();
        this.board.buildCells();
        this.board.pivot.set(this.board.width * 0.5, this.board.height * 0.5);
        this.board.position.set(this.screen.width * 0.5 + (cell_width + cell_line_style) / 2, this.screen.height * 0.6);
        this.stage.addChild(this.board);
        this.board.buildCellBalls(initial_balls_count, null);
        this.board.on('onCheck', this.callQue, this);
    }
    buildQueue() {
        const { cell_width, cell_line_style } = BoardConfig;
        this.queue = new Queue();
        this.queue.on('transferColor', this.transferColor, this);
        this.queue.buildCell();
        this.queue.position.set(
            this.screen.width * 0.5 + (cell_width + cell_line_style) / 2,
            this.screen.height * 0.05,
        );
        this.queue.pivot.set(this.queue.width * 0.5, this.queue.height * 0.5);
        this.queue.buildBall();
        this.stage.addChild(this.queue);
    }

    transferColor(collors) {
        this.x = collors;
    }

    callQue() {
        const { queue_balls_count } = BoardConfig;

        this.board.queCollors = this.x;
        this.queue.buildBall();
    }

    creteScore() {
        const score = new Score();
        score.getYourScore();
        const score1 = new Score();

        score1.getHighScore();
        score.position.set(this.screen.width * 0.5, this.screen.height * 0.15);
        this.queue.pivot.set(this.queue.width * 0.5, this.queue.height * 0.5);
        score1.position.set(this.screen.width * 0.5, this.screen.height * 0.2);
        this.queue.pivot.set(this.queue.width * 0.5, this.queue.height * 0.5);
        this.stage.addChild(score);
        this.stage.addChild(score1);
    }

    _update() {}
}
