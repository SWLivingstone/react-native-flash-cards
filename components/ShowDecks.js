import React, { Component } from 'react';
import { getDecks } from '../helpers/AsyncHelpers'
import { StyleSheet, Text, View } from 'react-native';

class ShowDecks extends Component {

  render() {
    return (
      <View style={styles.container}>
        {this.props.screenProps.decks.map((deck, index) => {
          return (
            <Text key={`${deck}${index}`}>{deck}</Text>
          )
        })}
        <Text>Show Decks</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ShowDecks
