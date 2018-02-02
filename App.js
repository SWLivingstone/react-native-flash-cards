import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { saveDeckTitle, getDecks } from './helpers/AsyncHelpers'
import ShowDecks from './components/ShowDecks'
import AddDeck from './components/AddDeck'
import DeckView from './components/DeckView'
import AddCard from './components/AddCard'
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

  handleAddDeck(title) {
    saveDeckTitle(title)
    this.setState((state) => {
      return { decks: [...state.decks, title] }
    })
    getDecks().then((result) => console.log(result))
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Stack
          screenProps={{
            decks: this.state.decks,
            handleAddDeck: (title) => {this.handleAddDeck(title)}
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

const Stack = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: 'FlashCards'
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: ({navigation}) => ({
      title: navigation.state.params.deck
    })
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add New Card'
    }
  }
})

export default App
