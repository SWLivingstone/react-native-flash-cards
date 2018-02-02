import React, { Component } from 'react'
import { getDecks } from '../helpers/AsyncHelpers'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

class ShowDecks extends Component {

  render() {
    return (
      <View style={styles.container}>
        {this.props.screenProps.decks.map((deck, index) => {
          return (
            <Button
              large
              key={`${deck}${index}`}
              icon={{name: 'folder'}}
              buttonStyle={styles.deckButton}
              title={deck}
              onPress={() => {this.props.navigation.navigate('DeckView', {deck: deck})}}/>
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
