import { Text, TextStyle } from 'pixi.js';

export class Score extends Text {
    constructor() {
        super('Score');
    }

    getScore() {
        console.warn(7);
        let score = 0;
        const style = new TextStyle({
            fontSize: 20,
            fill: ['#ffffff', '#666666'],
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 3,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 5,
        });
        console.log(Score);
        console.log(this);
        let x = this.parent;
        this.text = `High score: ${score}00`;
        this.style = style;
        this.pivot.x = this.width / 2;
        this.pivot.y = this.height / 2;
        this.addChild(x);
    }
}
