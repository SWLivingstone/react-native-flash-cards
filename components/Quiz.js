import React, { Component } from 'react'
import { getDecks } from '../helpers/AsyncHelpers'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { addCard } from '../helpers/AsyncHelpers'
import AddCard from './AddCard'

class Quiz extends Component {
  state = {
    cards: [],
    toggle: 'question',
    currentCard: 0,
    numCorret: 0,
    numWrong: 0
  }

  deck = this.props.navigation.state.params.deck

  componentDidMount() {
    getDecks().then((decks) => {
      decks = JSON.parse(decks)
      this.setState({ cards: decks[this.deck] })
    })
  }

  handleToggle() {
    this.setState({
      toggle: this.state.toggle === 'question' ? 'answer' : 'question'
    })
  }

  render() {
    return (
      this.state.cards.length > 0 &&
        <View style={styles.container}>
          <Text style={styles.activeText}>
            {this.state.toggle === 'question' ?
              this.state.cards[this.state.currentCard].question :
              this.state.cards[this.state.currentCard].answer}
          </Text>
          <Button
            onPress={() => {this.handleToggle()}}
            title={this.state.toggle === 'question' ? 'show answer' : 'show question'}/>
          <Button
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  activeText: {
    fontSize: 30,
    marginTop: 30
  },
  startButton: {

  },
  addCardButton: {

  }
});

export default Quiz
