import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, RefreshControl } from 'react-native';
import { getCurrentUser } from '../services/UserService';
import { getUserTweets } from '../services/TweetService';
import { Colors } from '../constants/Colors'

export default class PerfilScreen extends React.Component {
  static navigationOptions = {
    title: 'Perfil',
  };

  state = {
    currentUser: {},
    loading: false,
    currentPage: 0,
    tweets: []
  }

  componentDidMount() {
    getCurrentUser()
      .then(currentUser => {
        this.setState({ currentUser })
        return currentUser
      })
      .then(currentUser => this.onGetUserTweets(this.state.currentPage, currentUser)
        .then(tweets => {
          this.setState(state = { tweets: [tweets, ...state.tweets] })
        })
      )
  }

  onGetUserTweets = (page = 0, user) => {
    getUserTweets(user, page).then(tweets => {
      this.setState(state => ({
        tweets: page === 0 ? tweets : [...state.tweets, ...tweets],
        loading: false,
        currentPage: page
      }))
    })
  }

  onRefresh = () => {
    const { currentPage, currentUser } = this.state

    this.setState({ loading: true }, this.onGetUserTweets(currentPage, currentUser))
  }

  onGetNextPage = () => {
    const { loading, currentPage, currentUser } = this.state
    if (!loading) {
      this.onGetUserTweets(currentPage + 1, currentUser)
    }
  }

  getItemKey = item => item.uid

  renderItem = ({ item }) => {
    console.log(item)
    return <View><Text>{item.authorName}</Text></View>
  }

  render() {

    const { currentUser, tweets, loading } = this.state

    const { photoURL, displayName, userName, email } = currentUser

    return (
      <View>
        <View>
          {currentUser ?
            <View style={styles.container}>
              <View>
                <Image source={{ uri: photoURL }} style={styles.image} />
              </View>
              <View>
                <View style={styles.author}>
                  <Text style={styles.userName}>{displayName}</Text>
                </View>
                <Text>{userName}</Text>
                <Text>{email}</Text>
              </View>
            </View> : null
          }
        </View>

        <View>
          {tweets ?
            <FlatList style={styles.tweetsList}
              data={tweets}
              renderItem={this.renderItem}
              keyExtractor={this.getItemKey}
              onEndReached={this.onGetNextPage}
              onEndReachedThreshold={0.6}
              refreshControl={
                <RefreshControl colors={[Colors].tintColor}
                  onRefresh={this.onRefresh}
                  refreshing={loading} />
              }>
            </FlatList> : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  author: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex'
  },
  tweetsList: {
    flex: 1
  },
  userName: {
    fontWeight: 'bold'
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 50,
    marginRight: 10
  }
})