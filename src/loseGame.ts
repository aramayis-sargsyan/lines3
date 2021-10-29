import { Container, Graphics, Sprite, Texture, Text, TextStyle } from 'pixi.js';

import { BoardConfig } from './config';
import { Score } from './score';

export class LoseGame extends Container {
    backCollor: Graphics;
    losBoard: Graphics;
    click: boolean;
    constructor() {
        super();
        this.click = false;
    }

    buildBoard(width, height, overflow) {
        this.backCollor = new Graphics();
        this.backCollor.beginFill(0xaaaaaa, overflow);
        this.backCollor.drawRoundedRect(5, 5, width, height, 8);
        this.backCollor.endFill();

        this.backCollor.pivot.x = width / 2;
        this.backCollor.pivot.y = height / 2;
        this.backCollor.interactive = true;
        this.addChild(this.backCollor);
    }

    buildLosBoard(width, height, overflow) {
        let { phopap_width, phopap_height } = BoardConfig;
        this.losBoard = new Graphics();

        this.losBoard.lineStyle(5, 0x000000);
        this.losBoard.beginFill(0xaaaaaa, overflow);
        this.losBoard.drawRoundedRect(5, 5, phopap_width, phopap_height, 8);
        this.losBoard.endFill();
        this.losBoard.pivot.x = phopap_width / 2;
        this.losBoard.pivot.y = phopap_height / 2;
        this.losBoard.position.set(width * 0.5, height * 0.5);

        this.backCollor.addChild(this.losBoard);
    }

    buildResetButton() {
        let { phopap_width, phopap_height } = BoardConfig;

        const texture = Texture.from('../assets/reset.png');
        const reset = new Sprite(texture);
        reset.anchor.set(0.5);
        reset.width = 50;
        reset.height = 50;
        reset.position.set(phopap_width * 0.5, phopap_height * 0.8);
        reset.interactive = true;
        reset.on('pointerdown', this._onClick, this);
        this.losBoard.addChild(reset);
    }

    callScore(scoreH, scoreY) {
        let { phopap_width, phopap_height } = BoardConfig;

        const score = new Score();
        score.getHighScore(scoreH);
        score.getYourScore(scoreY);
        score.position.set(phopap_width * 0.5, phopap_height * 0.2);
        this.losBoard.addChild(score);
    }

    _onClick() {
        this.emit('_onClick', this.click);
    }
}
