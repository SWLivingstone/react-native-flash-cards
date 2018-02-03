import React, { Component } from 'react';
import { View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { saveDeckTitle, getDecks, addCard, setLocalNotification } from './helpers/AsyncHelpers'
import ShowDecks from './components/ShowDecks'
import AddDeck from './components/AddDeck'
import DeckView from './components/DeckView'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'

class App extends Component {
  state = {
    deckNames: [],
    cards: {}
  }

  componentDidMount() {
    setLocalNotification()
    getDecks().then(decks => {
      this.setState({ deckNames: Object.keys(JSON.parse(decks)).map((key) => key),
                      cards: JSON.parse(decks) })
    })
  }

  handleAddDeck(title) {
    saveDeckTitle(title)
    this.setState((state) => {
      return { deckNames: [...state.decks, title] }
    })
  }

  handleAddCard(deck, newCard) {
    temp = this.state.cards
    temp[deck] = [...temp[deck], newCard]
    this.setState({
      cards: temp
    })
    addCard(deck, newCard)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Stack
          screenProps={{
            deckNames: this.state.deckNames,
            cards: this.state.cards,
            handleAddDeck: (title) => {this.handleAddDeck(title)},
            handleAddCard: (deck, newCard) => {this.handleAddCard(deck, newCard)}
          }}/>
      </View>
    );
  }
}

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
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz'
    }
  }
})

export default App
