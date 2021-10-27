import { BoardConfig } from './config';

export const getBoomBall = (cells, pos) => {
    const { match_balls_count } = BoardConfig;
    const { cell_count } = BoardConfig;
    let arr = [[], [], [], []];
    let verticals = [];
    let horizontals = [];
    let diagonalLeft = [];
    let diagonalRight = [];

    for (let i = 0; i < cell_count; i++) {
        console.log(cells[i * cell_count + pos[0]].ball);
        console.log(i * cell_count + pos[0]);

        if (
            cells[i * cell_count + pos[0]].ball &&
            cells[i * cell_count + pos[0]].ball.color === cells[pos[1] * cell_count + pos[0]].ball.color
        ) {
            verticals.push(cells[i * cell_count + pos[0]].ball);
        } else {
            verticals = [];
        }
        if (verticals.length >= match_balls_count) {
            arr[0] = [];
            arr[0].push(...verticals);
            console.log(arr);
        }

        if (
            cells[i + cell_count * pos[1]].ball &&
            cells[i + cell_count * pos[1]].ball.color === cells[pos[1] * cell_count + pos[0]].ball.color
        ) {
            horizontals.push(cells[i + cell_count * pos[1]].ball);
        } else horizontals = [];
        if (horizontals.length >= match_balls_count) {
            arr[1] = [];
            arr[1].push(...horizontals);
        }

        if (
            i * cell_count + i + cell_count * (pos[1] - pos[0]) > 0 &&
            i * cell_count + i + cell_count * (pos[1] - pos[0]) < 81 &&
            cells[i * cell_count + i + cell_count * (pos[1] - pos[0])].ball &&
            cells[i * cell_count + i + cell_count * (pos[1] - pos[0])].ball.color ===
                cells[pos[1] * cell_count + pos[0]].ball.color
        ) {
            diagonalLeft.push(cells[i * cell_count + i + cell_count * (pos[1] - pos[0])].ball);
        } else diagonalLeft = [];
        if (i * cell_count + i + cell_count * (pos[1] - pos[0]) < 81) {
            if (diagonalLeft.length >= match_balls_count) {
                arr[2] = [];
                arr[2].push(...diagonalLeft);
            }
        }

        if (
            i * (cell_count - 1) + (cell_count * (pos[1] + pos[0] - (cell_count - 2)) - 1) > 0 &&
            i * (cell_count - 1) + (cell_count * (pos[1] + pos[0] - (cell_count - 2)) - 1) < 81 &&
            cells[i * (cell_count - 1) + (cell_count * (pos[1] + pos[0] - (cell_count - 2)) - 1)].ball &&
            cells[i * (cell_count - 1) + (cell_count * (pos[1] + pos[0] - (cell_count - 2)) - 1)].ball.color ===
                cells[pos[1] * cell_count + pos[0]].ball.color
        ) {
            diagonalRight.push(
                cells[i * (cell_count - 1) + (cell_count * (pos[1] + pos[0] - (cell_count - 2)) - 1)].ball,
            );
        } else diagonalRight = [];

        if (i * (cell_count - 1) + (cell_count * (pos[1] + pos[0] - (cell_count - 2)) - 1) < 81) {
            if (diagonalRight.length >= match_balls_count) {
                arr[3] = [];
                arr[3].push(...diagonalRight);
            }
        }
    }
    return arr;
};
