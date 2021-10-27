import * as PIXI from 'pixi.js';
import { Board } from './board/board';
import { BoardConfig } from './config';

export class Game extends PIXI.Application {
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

        const board = new Board();
        board.buildCells();
        board.pivot.set(board.width * 0.5, board.height * 0.5);
        board.position.set(this.screen.width * 0.5 + (cell_width + cell_line_style) / 2, this.screen.height * 0.6);
        this.stage.addChild(board);
        board.buildCellBalls(initial_balls_count);
    }

    _update() {}
}
