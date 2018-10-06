import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default Tweet = ({ tweet }) => {

    const { authorName, authorPhotoURL, authorUserName, content, timestamp } = tweet;

    return (
        <View style={styles.container}>
            <View>
                <Image source={{ uri: authorPhotoURL }} style={styles.image} />
            </View>
            <View>
                <View style={styles.author}>
                    <Text style={styles.userName}>{authorName}</Text>
                    <Text>  @{authorUserName}</Text>
                </View>
                <View >
                    <Text>{content}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingBottom: 20
    },
    author: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        display: 'flex'
    },
    content: {

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
