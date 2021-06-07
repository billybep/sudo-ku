import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Alert, Pressable } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBoardAsync, getSolveBoardAsync, validateBoardAsync, setBoard, resetStatus } from './../../store/action'

const PlayGame = ({ route, navigation }) => {

  const playerName = route.params.playerName
  const difficultyLevel = route.params.difficultyLevel

  const [pickedNumber] = useState([1,2,3,4,5,6,7,8,9])
  const [choise, setChoise] = useState([])

  const dispatch = useDispatch()
  const sugokuBoard = useSelector(state => state.board)
  const status = useSelector(state => state.status)
  const initialBoard = useSelector(state => state.staticBoard)
  const boardForSolution = JSON.parse(JSON.stringify(sugokuBoard))

  useEffect( _ => {
    dispatch(fetchBoardAsync(difficultyLevel))
  }, [])
  
  useEffect( _ => {
    if (status == 'solved') navigation.replace('Finish', { playerName })
    else if (status == 'broken') Alert.alert ('Upps! try more!')
  }, [status])

  const pressPickedNumber = (picked) => {
    const updatedBoard = JSON.parse(JSON.stringify(sugokuBoard))
    updatedBoard[choise[0]][choise[1]] = +picked
    dispatch(setBoard(updatedBoard))
  }

  const isValid = () => {
    //Check if player answer SOLVED or UNSOLVED
    const reset = ''
    dispatch(validateBoardAsync(sugokuBoard))
    dispatch(resetStatus(reset))
  }

  const solveSugoku = () => {
    //ASK FOR SOLUTION
    JSON.stringify(boardForSolution)
    dispatch(getSolveBoardAsync({board: boardForSolution}))
  }

  const newGame = () => {
    navigation.replace('Login')
  } 

  if (status == 'solved') navigation.replace('Finish') 

  return(
    <View style={styles.container}>
      <Text style={styles.titleText}>Sugoku Board</Text>
      {
        sugokuBoard && (
          <View>
            {
              sugokuBoard.map((row, rIdx) => {
                return (
                  <View style={{ flexDirection: 'row' }} key={`r-${rIdx}`}>
                    {
                      row.map((col, cIdx) => {
                        return (
                          <View key={`c-${cIdx}`}>
                              <Pressable  
                                disabled={initialBoard[rIdx][cIdx] != 0 && initialBoard[rIdx][cIdx] == col ? true : false}
                                style={{
                                  width: 35, 
                                  height: 35,
                                  alignItems: 'center', 
                                  justifyContent: 'center',
                                  backgroundColor: '#231F20',
                                  borderWidth: 2,
                                  borderColor: 'white',
                                  }}
                                  onPress={ _ => setChoise([rIdx, cIdx]) }>
                                    <Text 
                                      style={ initialBoard[rIdx][cIdx] != 0 && initialBoard[rIdx][cIdx] == col ? styles.redColor : styles.defaultColor }
                                    >
                                      {col == 0 ? '' : col}
                                    </Text>
                              </Pressable>
                          </View>
                        )
                      })
                    }
                  </View>
                )
              })
            }

          </View>
        )
      }

      <View style={{ flexDirection: 'row', marginTop: 45}}>
        {
          pickedNumber.map(picked => {
            return(
              <View key={picked}>
                <TouchableOpacity
                  style={{
                    width: 38, 
                    height: 38,
                    alignItems: 'center', 
                    justifyContent: 'center',
                    backgroundColor: '#F77500',
                    borderWidth: 2,
                    borderColor: 'white',
                    marginRight: 3
                    }}
                    onPress={ _ => pressPickedNumber(picked) }>
                  <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#231F20' }}>
                    {picked}
                  </Text>
                </TouchableOpacity>
              </View>

            )
          })
          
        }
      </View>

      <View>
        <TouchableOpacity
          style={{
            backgroundColor: '#231F20',
            width: 312,
            height: 50,
            borderRadius: 5,
            marginTop: 50,
            paddingVertical: 10,
            paddingHorizontal: 20
          }}
          onPress={ _ => isValid() }
          title="Validate"
          color="#2196f3"
        >
          <Text style={{ 
            fontSize: 20,
            fontWeight: 'bold', 
            color: '#F77500', 
            textAlign: 'center',
            }}>
              CHECK BOARD
            </Text>
        </TouchableOpacity>
      </View>

      <View>
        <View style={{ flexDirection: 'row', marginTop: 10}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#231F20',
              width: 150, 
              height: 50,
              borderRadius: 5,
              margin: 6,
              paddingVertical: 10,
              paddingHorizontal: 20
            }}
            onPress={ _ => solveSugoku() }
            title="Solve"
            color="#78c52f"
          >
            <Text style={{ 
              fontSize: 20,
              fontWeight: 'bold', 
              color: '#F77500', 
              textAlign: 'center',
              }}>
              CHEAT
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: '#231F20',
              width: 150, 
              height: 50,
              borderRadius: 5,
              margin: 6,
              paddingVertical: 10,
              paddingHorizontal: 20
            }}
            onPress={ _ => newGame() }
            title="New Game"
            color="#4630EB"
          >
            <Text style={{ 
              fontSize: 20,
              fontWeight: 'bold', 
              color: '#F77500', 
              textAlign: 'center',
              }}>
              NEW GAME
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    marginTop: 50,
    marginBottom: 30
  },
  input: {
    borderWidth: 1,
    height: 30,
    width: 30,
    margin: 1
  },
  redColor: {  
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#CE2A1F',
  },
  defaultColor: {
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#F77500',
  }

})

export default PlayGame