import { AsyncStorage } from 'react-native'

export function saveDeckTitle(title) {
  newDeck = {[title]: ''}
  return AsyncStorage.mergeItem('FlashCardDecks', JSON.stringify(newDeck))
}

export function getDecks() {
  return AsyncStorage.getItem('FlashCardDecks')
}

export function addCard(deck, newCard) {
  data = {
    [deck]: [newCard]
  }
  return AsyncStorage.mergeItem('FlashCardDecks', JSON.stringify(data))
}
