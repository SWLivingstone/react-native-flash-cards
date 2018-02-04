import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'

class ShowDecks extends Component {
  numberOfCards(deck) {
    if (Array.isArray(this.props.screenProps.cards[deck]))
      return this.props.screenProps.cards[deck].length
    else
      return 0
  }

  handleAddCard(deck, newCard) {
    this.props.screenProps.handleAddCard(deck, newCard)
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.screenProps.deckNames.length > 0 && this.props.screenProps.deckNames.map((deck, index) => {
          return (
            <Button
              large
              key={`${deck}${index}`}
              icon={{name: 'folder'}}
              buttonStyle={styles.deckButton}
              title={`${deck} ${this.numberOfCards(deck)}-cards`}
              onPress={() => {this.props.navigation.navigate('DeckView',
                { deck: deck,
                  cards: this.props.screenProps.cards[deck],
                  numCards: this.numberOfCards(deck),
                  handleAddCard: (deck, newCard) => {this.handleAddCard(deck, newCard)} })}}/>
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
    alignItems: 'center',
  },
  deckButton: {
    width: 250,
    margin: 5
  }
});

export default ShowDecks
