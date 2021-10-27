import { BoardConfig } from './config';

export const getBoomBall = (cells, pos) => {
    const { cell_count } = BoardConfig;
    console.log(pos);
    let arr = [[], [], [], []];
    let verticals = [];
    let horizontals = [];
    let diagonalLeft = [];
    let diagonalRight = [];

    for (let i = 0; i < cell_count; i++) {
        if (cells[i * cell_count + pos[0]].ball) {
            verticals.push(cells[i * cell_count + pos[0]].ball);
        } else {
            verticals = [];
        }
        if (verticals.length >= 5) {
            arr[0] = [];
            arr[0].push(...verticals);
        }

        if (cells[i + cell_count * pos[1]].ball) {
            horizontals.push(cells[i + cell_count * pos[1]].ball);
        } else horizontals = [];
        if (horizontals.length >= 5) {
            arr[1] = [];
            arr[1].push(...horizontals);
        }

        if (
            i * cell_count + i + cell_count * (pos[1] - pos[0]) > 0 &&
            i * cell_count + i + cell_count * (pos[1] - pos[0]) < 81 &&
            cells[i * cell_count + i + cell_count * (pos[1] - pos[0])].ball
        ) {
            diagonalLeft.push(cells[i * cell_count + i + cell_count * (pos[1] - pos[0])].ball);
        } else diagonalLeft = [];
        if (i * cell_count + i + cell_count * (pos[1] - pos[0]) < 81) {
            if (diagonalLeft.length >= 5) {
                arr[2] = [];
                arr[2].push(...diagonalLeft);
            }
        }

        if (
            i * (cell_count - 1) + (cell_count * (pos[1] + pos[0] - (cell_count - 2)) - 1) > 0 &&
            i * (cell_count - 1) + (cell_count * (pos[1] + pos[0] - (cell_count - 2)) - 1) < 81 &&
            cells[i * (cell_count - 1) + (cell_count * (pos[1] + pos[0] - (cell_count - 2)) - 1)].ball
        ) {
            diagonalRight.push(
                cells[i * (cell_count - 1) + (cell_count * (pos[1] + pos[0] - (cell_count - 2)) - 1)].ball,
            );
        } else diagonalRight = [];

        if (i * (cell_count - 1) + (cell_count * (pos[1] + pos[0] - (cell_count - 2)) - 1) < 81) {
            if (diagonalRight.length >= 5) {
                arr[3] = [];
                arr[3].push(...diagonalRight);
            }
        }
    }
    return arr;
};
