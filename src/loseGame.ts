import { Container, Graphics } from 'pixi.js';
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
        const losBoard = new Graphics();
        losBoard.interactive = true;

        losBoard.on('pointerdown', this._onClick, this);

        losBoard.lineStyle(5, 0x000000);
        losBoard.beginFill(0xaaaaaa, overflow);
        losBoard.drawRoundedRect(5, 5, phopap_width, phopap_height, 8);
        losBoard.endFill();
        losBoard.pivot.x = phopap_width / 2;
        losBoard.pivot.y = phopap_height / 2;
        losBoard.position.set(width * 0.5, height * 0.5);

        this.backCollor.addChild(losBoard);
    }

    _onClick() {
        this.emit('_onClick', this.click);
    }
}
