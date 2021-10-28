import { Text, TextStyle } from 'pixi.js';

export class Score extends Text {
    highScore: number;
    yourScore: number;
    constructor() {
        super('');
        this.yourScore = 0;
        this.highScore = 0;
    }

    getYourScore() {
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

        let text = new Text(`Your Score : ${this.yourScore}`, style);
        text.pivot.x = text.width / 2;
        text.pivot.y = text.height / 2;
        this.addChild(text);
    }
    getHighScore() {
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
        let text = new Text(`High highScore : ${this.highScore}`, style);
        text.pivot.x = text.width / 2;
        text.pivot.y = text.height / 2;
        this.highScore += 5;
        this.addChild(text);
    }
}
