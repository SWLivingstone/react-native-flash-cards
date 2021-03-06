import React, { Component } from 'react'
import { StyleSheet, KeyboardAvoidingView } from 'react-native'
import { FormLabel, FormInput, Button } from 'react-native-elements'

class AddDeck extends Component {
  state = {
    title: ''
  }

  handleInput(event) {
    this.setState({title: event})
  }

  handleSubmit() {
    this.setState({title: ''})
    this.props.screenProps.handleAddDeck(this.state.title)
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container}>
        <FormLabel>New Deck Name</FormLabel>
        <FormInput
          onChangeText={(event) => {this.handleInput(event)}}
          value={this.state.title}/>
        <Button
          title='Create Deck'
          onPress={() => {this.handleSubmit()}}/>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default AddDeck
