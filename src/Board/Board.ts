type MoveParams = {
  from: number;
  value: number;
};

class Board {
  static move = ({ from, value }: MoveParams) => (from + value) % 12;
};

export default Board;
