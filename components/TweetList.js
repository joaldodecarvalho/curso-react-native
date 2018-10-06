import React from 'react';
import { StyleSheet, FlatList, RefreshControl } from 'react-native';

import Tweet from '../components/Tweet'
import Colors from '../constants/Colors';

export default TweetList = props => {

    const { tweets, getNextPage, onRefresh, loading } = props;

    const renderItem = ({ item }) => {
        return <Tweet key={item.uid} tweet={item}></Tweet>
    }

    const getItemKey = item => item.uid

    return (

        <FlatList style={styles.tweetsList}
            data={tweets}
            renderItem={renderItem}
            keyExtractor={getItemKey}
            onEndReached={getNextPage}
            onEndReachedThreshold={0.6}
            refreshControl={
                <RefreshControl colors={[Colors].tintColor}
                    onRefresh={onRefresh}
                    refreshing={loading} />
            }>
        </FlatList>
    )
}

const styles = StyleSheet.create({
    tweetsList: {
        flex: 1
    }

})