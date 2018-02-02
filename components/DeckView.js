import React, { Component } from 'react'
import { getDecks } from '../helpers/AsyncHelpers'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { addCard } from '../helpers/AsyncHelpers'
import AddCard from './AddCard'

class DeckView extends Component {
  state = {
    cards: [],
    numCards: null
  }

  deck = this.props.navigation.state.params.deck

  componentDidMount() {
    getDecks().then((decks) => {
      decks = JSON.parse(decks)
      console.log(decks[this.deck])
      this.setState({ cards: decks[this.deck],
                      numCards: decks[this.deck].length})
    })
  }

  handleAddCard(newCard) {
    this.setState({
      cards: [...this.state.cards, newCard],
      numCards: this.state.cards.length
    })
    addCard(this.deck, newCard)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.deck} {this.state.numCards}</Text>
        <Button
          title='Start Quiz'
          buttonStyle={styles.startButton}/>
          <Button
            large
            icon={{name: 'add-box'}}
            buttonStyle={styles.addCardButton}
            title='Add Card'
            onPress={() => {this.props.navigation.navigate('AddCard',
              { deck: this.deck,
                handleAddCard: (newCard) => this.handleAddCard(newCard) })}}/>
        {Array.isArray(this.state.cards) && this.state.cards.map((card) => {
          return(
            <View>
              <Text>{card.question}</Text>
              <Text>------------</Text>
              <Text>{card.answer}</Text>
            </View>
          )
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch'
  },
  startButton: {

  },
  addCardButton: {

  }
});

export default DeckView
