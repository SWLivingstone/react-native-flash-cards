import { AsyncStorage } from 'react-native'

export function saveDeckTitle(title) {
  newDeck = {[title]: title}
  return AsyncStorage.mergeItem('FlashCardDecks', JSON.stringify(newDeck))
}

export function getDecks() {
  return AsyncStorage.getItem('FlashCardDecks')
}
