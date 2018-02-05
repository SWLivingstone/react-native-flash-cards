import React, { Component } from 'react'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  handleInputQuestion(event) {
    this.setState({question: event})
  }

  handleInputAnswer(event) {
    this.setState({answer: event})
  }

  handleSubmit() {
    newCard = {}
    newCard.question = this.state.question
    newCard.answer = this.state.answer
    this.setState({question: '', answer: ''})
    this.props.navigation.state.params.handleAddCard(newCard)
    this.props.navigation.goBack()
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <FormLabel>Question</FormLabel>
        <FormInput
          onChangeText={(event) => {this.handleInputQuestion(event)}}
          value={this.state.question}/>
        <FormLabel>Answer</FormLabel>
        <FormInput
          onChangeText={(event) => {this.handleInputAnswer(event)}}
          value={this.state.answer}/>
        <Button
          title='Add Card'
          onPress={() => {this.handleSubmit()}}/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 5
  },
});

export default AddCard
