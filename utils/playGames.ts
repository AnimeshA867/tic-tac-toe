  export const ai = "O";
  export const human = "X";
  export const defaultPosition={
    x1: "",
    x2: "",
    y1: "",
    y2: "",
  }
  export type board = {
    [key: number]: string;
  };
    export const checkWinner = (board: board): string | null => {
    let winner = null;
    winCondition.forEach((bd) => {
      const [a, b, c] = bd;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        winner = board[a];
        
      }
    });
    if (!winner) {
      let isTie = true;
      for (let i = 0; i < Object.keys(board).length; i++) {
        if (board[i] === "") {
          isTie = false;
          break;
        }
      }

      if (isTie) {
        winner = "tie";
      }
    }

    return winner;
  };
  export const defaultBoard: board = {
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  };

    export const winCondition = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [2, 4, 6],
    [6, 7, 8],
  ];

  export let scores: { [key: string]: number } = {
    X: -10,
    O: 10,
    tie: 0,
  };
  export const minimax = (
    board: board,
    isMaximizing: boolean,
    difficult:boolean,
    alpha:number,
    beta:number
  ): number => {
    const result: any = checkWinner(board);

    if (result !== null) {
        return scores[result];
    }
    let num =(!difficult)?Math.floor(Math.random()*10):0 ;
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < Object.keys(board).length; i++) {
        if (board[i] == "") {
          board[i] = ai;

  
          let score =minimax(board, false,difficult,alpha,beta)-num;
          board[i] = "";
          bestScore = Math.max(score, bestScore);
          alpha = Math.max(alpha, bestScore)
            if (beta <= alpha)
                break 
        }
      }
     
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < Object.keys(board).length; i++) {
        if (board[i] == "") {
          board[i] = human;
          
          let score =minimax(board, true,difficult,alpha,beta)-num;
          board[i] = "";
          bestScore = Math.min(score, bestScore);
            beta = Math.min(beta, bestScore)
            if (beta <= alpha)
                break 
        }
      }

      return bestScore;
    }
  };


