import React, { useState } from 'react'
import { 
  View, Text, Alert,
  SafeAreaView,
  TextInput, 
  StyleSheet, 
  StatusBar, 
  TouchableOpacity } from "react-native"
import { RadioButton } from 'react-native-paper'

const LoginScreen = ({ navigation }) => {

  const [playerName, setPlayerName] = useState('')
  const [difficultyLevel, setDifficultyLevel] = useState('')

  const startTheGame = () => {
    if (!playerName) Alert.alert("Player Name", "Please Input your name!")
    else if (!difficultyLevel) Alert.alert("Difficulty Level", "choose difficulty to play sogoku!")
    else navigation.replace('Play', { playerName, difficultyLevel })
  }

  return(
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={{ 
          fontSize: 45, 
          fontWeight: 'bold',
          color: '#F77500', 
          textAlign: 'center', 
          paddingVertical: 45
          }}>
            SUGOKU !!!
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={ _ => startTheGame() } >
        <Text style={styles.buttonText}>START</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      <View style={{ flex: 2}} />
      <View style={styles.footer}>
        <SafeAreaView style={{ alignItems: 'center' }}>
          <TextInput
            style={{ 
              marginTop: 20,
              width: 250,
              height: 60,
              borderWidth: 1,
              borderRadius: 5,
              color: '#F77500',
              fontWeight: 'bold',
              fontSize: 25,
              backgroundColor: '#F1F3F4',
              textAlign: 'center'
            }}
            onChangeText={ Text => setPlayerName(Text) }
            value={playerName}
            placeholder="YOUR NAME HERE"
            keyboardType="default"
          />

          <Text
            style={{
              marginTop: 50,
              fontSize: 15,
              fontWeight: 'bold',
              color: '#F77500'
            }}>
            SELECT DIFFICULTY:
          </Text>

          <RadioButton.Group 
            onValueChange={newValue => setDifficultyLevel(newValue)} 
            value={difficultyLevel}>  
            <View style={{ flexDirection: 'row', margin: 10 }}>
              <View style={{ 
                paddingHorizontal: 15, 
                justifyContent: 'center', 
                alignItems: 'center'}}>
                <RadioButton  color='#F5F6F7' uncheckedColor='#f77500' value="easy" />
                <Text style={{ color: '#f77500', paddingTop: 10}}>EASY</Text>
              </View>
              <View style={{ 
                paddingHorizontal: 15, 
                justifyContent: 'center', 
                alignItems: 'center'}}>
                <RadioButton color='#FC8316' uncheckedColor='#f77500' value="medium" />
                <Text style={{ color: '#f77500', paddingTop: 10}}>MEDIUM</Text>
              </View>
              <View style={{ 
                paddingHorizontal: 15, 
                justifyContent: 'center', 
                alignItems: 'center'}}>
                <RadioButton color='#CB2822' uncheckedColor='#f77500' value="hard" />
                <Text style={{ color: '#f77500', paddingTop: 10}}>HARD</Text>
              </View>
              <View style={{ 
                paddingHorizontal: 15, 
                justifyContent: 'center', 
                alignItems: 'center'}}>
                <RadioButton uncheckedColor='#f77500' value="random" />
                <Text style={{ color: '#f77500', paddingTop: 10}}>RANDOM</Text>
              </View>
            </View>
          </RadioButton.Group>

        </SafeAreaView>
      </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#231F20'
  },
  button: {
    backgroundColor: '#F77500',
    width: 125,
    height: 125,
    borderRadius: 100,
    marginTop: 100,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  buttonText: {
    textAlign: 'center',
    paddingTop: 20,
    fontWeight: 'bold',
    fontSize: 27,
    color: '#F0F2F5',
  },
  header: {
    backgroundColor: '#231F20',
    width: '100%',
    height: 150
  },
  footer: {
    backgroundColor: '#231F20',
    width: '100%',
    height: 350 
  }
})

export default LoginScreen