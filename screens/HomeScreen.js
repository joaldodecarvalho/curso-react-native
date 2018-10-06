import React from 'react';
import { View, TextInput, Text, StyleSheet, Button, ToastAndroid, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import { getUserFeed, newTweet } from '../services/TweetService'
import TweetList from '../components/TweetList'

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Twitter",
  };

  state = {
    currentTweet: '',
    loading: false,
    currentPage: 0,
    tweets: [],
  }

  componentDidMount() {
    this.setState({ loading: true }, this.onGetUserFeed);
  }

  onGetUserFeed = (pageNumber = 0) => {
    getUserFeed(pageNumber).then(tweets => {
      this.setState(state => ({
        tweets: pageNumber === 0 ? tweets : [...state.tweets, ...tweets],
        loading: false,
        currentPage: pageNumber
      }))
    })
  }

  onRefresh = () => {
    this.setState({ loading: true }, this.onGetUserFeed)
  }

  onGetNextPage = () => {
    const { loading, currentPage } = this.state
    if (!loading) {
      this.onGetUserFeed(currentPage + 1)
    }
  }

  onChangeText = text => {
    this.setState({
      currentTweet: text
    })
  }

  countTweet = () => this.state.currentTweet.length

  onPost = () => {

    if (this.state.currentTweet.length < 1) {
      ToastAndroid.show('Insira uma mensagem!', ToastAndroid.SHORT);
    } else {

      this.setState({
        loading: true
      })
      newTweet(this.state.currentTweet)
        .then(createdTweet => {
          this.setState(state => {
            return {
              currentTweet: '',
              tweets: [createdTweet, ...state.tweets]
            }
          })
        }).catch(error => {
          ToastAndroid.show('Usuário não logado!', ToastAndroid.SHORT);
        }).finally(() => this.setState({ loading: false, currentTweet: '' }))
    }
  }

  render() {

    const { tweets, loading, currentTweet } = this.state

    return (

      <View style={styles.container}>
        <Text style={{ marginLeft: 'auto' }}> {this.countTweet()} / 140</Text>
        <TextInput style={styles.tweetInput} editable={true} maxLength={140} multiline={true}
          value={currentTweet} onChangeText={this.onChangeText} underlineColorAndroid="transparent" />

        <View style={styles.button}>
          <Button onPress={this.onPost} title="Postar" color={Colors.tintColor} disabled={loading}></Button>
        </View>

        {loading ? <ActivityIndicator size="large" color="#0000ff" /> :
          <TweetList loading={loading} tweets={tweets} getNextPage={this.onGetNextPage} onRefresh={this.onRefresh} />}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingTop: 20
  },
  tweetInput: {
    minHeight: 100,
    maxHeight: 120,
    borderColor: '#777',
    borderWidth: 1,
    borderRadius: 5,
    textAlignVertical: 'top',
    padding: 3
  },
  button: {
    marginVertical: 5
  }

})

