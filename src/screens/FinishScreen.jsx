import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from "react-native"
import { resetStatus } from '../../store/action'
import { useDispatch } from 'react-redux'

const FinishScreen = ({ route, navigation }) => {

  const [playerName, setPlayerName] = useState(route.params.playerName)
  const dispatch = useDispatch()

  const newGame = _ => {
    const RESET = {
      board : [],
      solvedBoard: [],
      staticBoard: [],
      status: ''
    }
    dispatch(resetStatus(RESET))
    setPlayerName('')
    navigation.replace('Login')
  }

  return(
    <View
      style={{ 
        flex: 1,
        backgroundColor: '#111111',
        justifyContent: 'center'
      }}>
        <View style={{ justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 25,
              color: '#F77500',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              CONGRATULATIONS !
          </Text>
          <Text
            style={{
              fontSize: 50,
              color: '#F77500',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              {playerName.toUpperCase()}
          </Text>
          <Text
            style={{
              fontSize: 30,
              color: '#F77500',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
              You Beat the NUMBERS
          </Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity 
            style={{
              backgroundColor: '#F77500',
              width: 125,
              height: 125,
              borderRadius: 100,
              marginTop: 100,
              paddingVertical: 20,
              paddingHorizontal: 20
              }}
            onPress={ _ => newGame() } >
            <Text style={{
                textAlign: 'center',
                paddingTop: 20,
                fontWeight: 'bold',
                fontSize: 27,
                color: '#F0F2F5',
              }}
            >
              Again?
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default FinishScreen