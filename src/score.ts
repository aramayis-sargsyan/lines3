import { Text, TextStyle } from 'pixi.js';

export class Score extends Text {
    highScore: number;
    yourScore: number;
    style: TextStyle;
    constructor() {
        super('');

        this.style = new TextStyle({
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

        this.yourScore = 0;
        this.highScore = 0;
        if (Number(localStorage.getItem('highScore')) !== 0) {
            this.highScore = Number(localStorage.getItem('highScore'));
        }
    }

    getYourScore() {
        let text = new Text(`Your score ${this.yourScore}`, this.style);
        text.pivot.x = text.width / 2;
        text.pivot.y = text.height / 2;
        this.addChild(text);
    }

    getHighScore() {
        let textObj = new Text(`High score ${this.highScore}`, this.style);
        textObj.pivot.x = textObj.width / 2;
        textObj.pivot.y = textObj.height / 2;
        this.addChild(textObj);
    }

    changeScore(type, score) {
        let textObj = new Text(`${type} score ${score}`, this.style);
        textObj.pivot.x = textObj.width / 2;
        textObj.pivot.y = textObj.height / 2;
        this.addChild(textObj);
    }
}
