import React, { Component } from 'react'
import { clearLocalNotification, setLocalNotification } from '../helpers/AsyncHelpers'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

class Quiz extends Component {
  state = {
    toggle: 'question',
    currentCard: 0,
    numCorrect: 0,
  }

  deck = this.props.navigation.state.params.deck
  cards = this.props.navigation.state.params.cards

  handleToggle() {
    this.setState({
      toggle: this.state.toggle === 'question' ? 'answer' : 'question'
    })
  }

  handleAnswer(answer) {
    const numCorrect = answer === 'correct' ?
      this.state.numCorrect + 1 :
      this.state.numCorrect
    const currentCard = this.state.currentCard + 1

    this.setState({currentCard: currentCard,
                   numCorrect: numCorrect})

    if (currentCard >= this.cards.length) {
      clearLocalNotification()
        .then(setLocalNotification)
    }
  }

  quizInProgress() {
    if (this.state.currentCard >= this.cards.length)
      return false
    else
      return true
  }

  score() {
    score = this.state.numCorrect / this.cards.length
    return score * 100
  }

  render() {
    return (
      Array.isArray(this.cards) && this.quizInProgress() &&
        <View style={styles.container}>
          <Text>{this.state.currentCard}/{this.cards.length}</Text>
          <Text style={styles.activeText}>
            {this.cards[this.state.currentCard][this.state.toggle]}
          </Text>
          <Button
            buttonStyle={styles.toggle}
            onPress={() => {this.handleToggle()}}
            title={this.state.toggle === 'question' ? 'show answer' : 'show question'}/>
          <Button
            buttonStyle={styles.correct}
            onPress={() => {this.handleAnswer('correct')}}
            title='Correct'/>
          <Button
            buttonStyle={styles.wrong}
            onPress={() => {this.handleAnswer('wrong')}}
            title='Wrong'/>
        </View>

      || this.quizInProgress() === false &&
        <View style={styles.container}>
          <Text>Quiz complete</Text>
          <Text>Your score is {this.score()}%</Text>
        </View>

      ||
        <View style={styles.container}>
          <Text>This Quiz has no cards</Text>
        </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  activeText: {
    fontSize: 30,
    marginTop: 30
  },
  toggle: {
    margin: 10,
  },
  correct: {
    margin: 10,
    backgroundColor: '#0CC200'
  },
  wrong: {
    margin: 10,
    backgroundColor: '#C2000C'
  }
});

export default Quiz
