import React, { Component } from 'react'
import { getDecks } from '../helpers/AsyncHelpers'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
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
      this.setState({ cards: this.props.navigation.state.params.cards,
                      numCards: this.props.navigation.state.params.numCards })
    })
  }

  handleAddCard(newCard) {
    this.setState({
      cards: [...this.state.cards, newCard],
      numCards: this.state.numCards + 1
    })
    this.props.navigation.state.params.handleAddCard(this.deck, newCard)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.numCards} cards</Text>
        <Button
          title='Start Quiz'
          buttonStyle={styles.button}
          onPress={() => {this.props.navigation.navigate('Quiz',
            { deck: this.deck,
              cards: this.state.cards })}}/>
        <Button
          large
          icon={{name: 'add-box'}}
          buttonStyle={styles.button}
          title='Add Card'
          onPress={() => {this.props.navigation.navigate('AddCard',
            { deck: this.deck,
              handleAddCard: (newCard) => this.handleAddCard(newCard) })}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  button: {
    margin: 10
  }
});

export default DeckView
