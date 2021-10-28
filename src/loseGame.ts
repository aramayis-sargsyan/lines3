import { Container, Graphics, Sprite, Texture, Text, TextStyle } from 'pixi.js';

import { BoardConfig } from './config';

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
        this.buildLosBoard(width, height, 1);
        this.backCollor.lineStyle(5, 0x000000);
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
        this.buildResetButton();
        this.getYourScore();
        this.getHighScore();
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

        console.log(this);
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

    getYourScore() {
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 18,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#666666'],
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',
        });

        let text = new Text(`Your Score : ${0}`, style);
        let { phopap_width, phopap_height } = BoardConfig;

        text.pivot.x = text.width / 2;
        text.pivot.y = text.height / 2;
        text.position.set(phopap_width * 0.5, phopap_height * 0.2);

        this.losBoard.addChild(text);
    }

    getHighScore() {
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 18,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#666666'],
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
            lineJoin: 'round',
        });

        let text = new Text(`High Score : ${5}`, style);
        let { phopap_width, phopap_height } = BoardConfig;

        text.pivot.x = text.width / 2;
        text.pivot.y = text.height / 2;
        text.position.set(phopap_width * 0.5, phopap_height * 0.4);

        this.losBoard.addChild(text);
    }

    _onClick() {
        this.emit('_onClick', this.click);
    }
}
