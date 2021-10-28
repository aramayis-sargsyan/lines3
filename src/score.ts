import { Text, TextStyle } from 'pixi.js';

export class Score extends Text {
    constructor() {
        super('');
    }

    getYourScore() {
        console.log();
        let score = 0;
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 18,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#666666'], // gradient
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
        let text = new Text(`Your Score : ${score}`, style);
        text.pivot.x = text.width / 2;
        text.pivot.y = text.height / 2;
        this.addChild(text);
    }
    getHighScore() {
        console.log();
        let score = 0;
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: 18,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#666666'], // gradient
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
        let text = new Text(`High Score : ${score}`, style);
        text.pivot.x = text.width / 2;
        text.pivot.y = text.height / 2;
        this.addChild(text);
    }
}
