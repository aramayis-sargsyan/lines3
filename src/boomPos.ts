import { BoardConfig } from './config';

export const getBoomBall = (cells, pos) => {
    const { cell_count } = BoardConfig;
    console.log(pos);
    let ballI = [];
    let ballJ = [];
    let ballIJ = [];
    let ballJI = [];

    for (let i = 0; i < cell_count; i++) {
        if (cells[i * cell_count + pos[0]].ball) {
            ballI.push(cells[i * cell_count + pos[0]].ball);
        } else {
            if (ballI.length < 5) {
                ballI = [];
            }
        }

        if (cells[i + cell_count * pos[1]].ball) {
            ballJ.push(cells[i + cell_count * pos[1]].ball);
        } else {
            if (ballJ.length < 5) {
                ballJ = [];
            }
        }

        if (
            i * cell_count + i + cell_count * (pos[1] - pos[0]) > 0 &&
            i * cell_count + i + cell_count * (pos[1] - pos[0]) < 81 &&
            cells[i * cell_count + i + cell_count * (pos[1] - pos[0])].ball
        ) {
            ballIJ.push(cells[i * cell_count + i + cell_count * (pos[1] - pos[0])].ball);
        } else if (i * cell_count + i + cell_count * (pos[1] - pos[0]) < 81) {
            if (ballIJ.length < 5) {
                ballIJ = [];
            }
        }

        if (
            i * (cell_count - 1) + (cell_count * (pos[1] + pos[0] - (cell_count - 2)) - 1) > 0 &&
            i * (cell_count - 1) + (cell_count * (pos[1] + pos[0] - (cell_count - 2)) - 1) < 81 &&
            cells[i * (cell_count - 1) + (cell_count * (pos[1] + pos[0] - (cell_count - 2)) - 1)].ball
        ) {
            ballJI.push(cells[i * (cell_count - 1) + (cell_count * (pos[1] + pos[0] - (cell_count - 2)) - 1)].ball);
        } else if (i * (cell_count - 1) + (cell_count * (pos[1] + pos[0] - (cell_count - 2)) - 1) < 81) {
            if (ballJI.length < 5) {
                ballJI = [];
            }
        }
    }
    return [ballI, ballJ, ballJI, ballIJ];
};
