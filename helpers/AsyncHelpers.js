import { AsyncStorage } from 'react-native'
import { Permissions, Notifications } from 'expo'

const NOTIFICATION_KEY = 'FLashCardsNotifications'

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}


function createNotification () {
  return {
    title: 'Quiz Time!',
    body: "👋 don't forget to practice today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()

              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )

              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

export function saveDeckTitle(title) {
  newDeck = {[title]: ''}
  return AsyncStorage.mergeItem('FlashCardDecks', JSON.stringify(newDeck))
}

export function getDecks() {
  return AsyncStorage.getItem('FlashCardDecks')
}

export function addCard(deck, newCard) {
  getDecks().then((decks) => {
    decks = JSON.parse(decks)
    data = {
      [deck]: [...decks[deck], newCard]
    }
    return AsyncStorage.mergeItem('FlashCardDecks', JSON.stringify(data))
  })
}
