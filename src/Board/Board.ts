type MoveParams = {
  from: number;
  value: number;
};

const Board = {
  move: ({ from, value }: MoveParams) => (from + value) % 12,
};

export default Board;
