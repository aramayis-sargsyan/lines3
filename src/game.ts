import * as PIXI from 'pixi.js';
import { Board } from './board/board';
import { BoardConfig } from './config';
import { LoseGame } from './loseGame';
import { Queue } from './queue';
import { Score } from './score';

export class Game extends PIXI.Application {
    board: Board;
    queue: Queue;
    score: Score;
    score1: Score;
    los: LoseGame;

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

    callQue(x) {
        const { queue_balls_count } = BoardConfig;
        if (x === 'game over') {
            this.loseGame();

            if (this.los.click) {
                this.destroyContainer();
            }
        }
        this.board.queCollors = this.x;
        this.queue.buildBall();
        if (x > 0) {
            board: Board;
            queue: Queue;
            score: Score;
            score1: Score;
            los: LoseGame;
            this.score.yourScore += x;
            this.score.getYourScore(this.score.yourScore);

            if (this.score.yourScore > this.score.highScore) {
                this.score.highScore = this.score.yourScore;
                this.changeScore();
                this.save();
            }
        }
    }

    destroyContainer() {
        this.board.destroy();
        this.queue.destroy();
        this.score.destroy();
        this.los.destroy();
        this._onLoadComplete();
    }

    creteScore() {
        this.score = new Score();

        this.score.getYourScore(this.score.yourScore);
        this.score.getHighScore(this.score.highScore);
        this.changeScore();
        console.log(this.score);
        this.score.position.set(this.screen.width * 0.5, this.screen.height * 0.2);
        this.queue.pivot.set(this.queue.width * 0.5, this.queue.height * 0.5);

        this.stage.addChild(this.score);
    }
    save() {
        localStorage.setItem('highScore', `${this.score.highScore}`);
    }

    changeScore() {
        console.log(71);

        this.score.getHighScore(this.score.highScore);
        this.score.position.set(this.screen.width * 0.5, this.screen.height * 0.2);
        console.log(25);

        this.queue.pivot.set(this.queue.width * 0.5, this.queue.height * 0.5);
        this.stage.addChild(this.score);
    }

    loseGame() {
        this.los = new LoseGame();
        this.los.on('_onClick', this.destroyContainer, this);
        this.los.buildBoard(this.screen.width, this.screen.height, 0.3);
        this.los.buildLosBoard(this.screen.width, this.screen.height, 1);
        this.los.buildResetButton();
        this.los.callScore(this.score.highScore, this.score.yourScore);
        this.los.backCollor.pivot.set(this.los.backCollor.width * 0.5, this.los.backCollor.height * 0.5);
        this.los.backCollor.position.set(this.screen.width * 0.5, this.screen.height * 0.5);
        this.stage.addChild(this.los);
    }

    _update() {}
}
