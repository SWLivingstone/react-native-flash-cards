import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation'
import { saveDeckTitle, getDecks } from './helpers/AsyncHelpers'
import ShowDecks from './components/ShowDecks'
import AddDeck from './components/AddDeck'
import Constants from 'expo'

class App extends Component {
  state = {
    decks: []
  }

  componentDidMount() {
    getDecks().then(decks => {
      this.setState({ decks: Object.keys(JSON.parse(decks)).map((key) => key) })
    })
  }

  handleSubmit(title) {
    saveDeckTitle(title)
    this.setState((state) => {
      return { decks: [...state.decks, title] }
    })
    getDecks().then((result) => console.log(result))
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{height: statusBar}}></View>
        <Tabs
          screenProps={{
            decks: this.state.decks,
            handleSubmit: (title) => {this.handleSubmit(title)}
          }}/>
      </View>
    );
  }
}

const statusBar = Constants.statusBarHeight ?
                  Constants.statusBarHeight :
                  24

const Tabs = TabNavigator({
  'My Decks': {
    screen: ShowDecks,
  },
  'Add Deck': {
    screen: AddDeck
  }
})

export default App
