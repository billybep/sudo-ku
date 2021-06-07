const fetchBoard = (payload) => {
  return { type: 'board/setBoard', payload}
}

const getSolveBoard = (payload) => {
  return { type: 'solvedBoard/setSolvedBoard', payload}
}

const validateBoard = (payload) => {
  return { type: 'status/setStatus', payload}
}

export const setBoard = (payload) => {
  return { type: 'board/updateBoard', payload }
}

export const resetStatus = (payload) => {
  return { type: 'status/resetStatus', payload }
}

const staticBoard = (payload) => {
  console.log('a');
  return { type: 'static/setStaticBoard', payload}
}

export const fetchBoardAsync = (difficulty) => {
  return(dispatch) => {
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
      .then(response => response.json())
      .then(data => {
        console.log('masuk');
        dispatch(staticBoard(data.board))
        dispatch(fetchBoard(data.board))
      })
      .catch(console.log)
  }
}

export const getSolveBoardAsync = (boardToSolve) => {
  return(dispatch) => {
    const encodeBoard = (boardToSolve) => boardToSolve.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === boardToSolve.length -1 ? '' : '%2C'}`, '')
    const encodeParams = (params) => 
      Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');
      
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(boardToSolve),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then((response)=> {
        dispatch(getSolveBoard(response.solution))
      })
      .catch(console.warn)
  }
}

export const validateBoardAsync = (isValidBoard) => {
  return(dispatch => {
    const encodeBoard = (isValidBoard) => isValidBoard.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === isValidBoard.length -1 ? '' : '%2C'}`, '')
    const encodeParams = (params) => 
      Object.keys(params)
      .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
      .join('&');

    fetch('https://sugoku.herokuapp.com/validate', {
      method: 'POST',
      body: encodeParams({board: isValidBoard}),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => {
        dispatch(validateBoard(response.status))
      })
      .catch(console.warn)
    })
}

export const resetState = (payload) => {
  return { type: 'reset/resetState', payload }
}