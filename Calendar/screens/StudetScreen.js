import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

const StudentScreen = () => {
    const [groupLink, setGroupLink] = useState('');
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const botToken = Config.TELEGRAM_BOT_TOKEN;

    const getGroupParticipants = async () => {
        setLoading(true);
        try {
            const chatId = groupLink.startsWith('@') ? groupLink : `-100${groupLink}`;
            const response = await axios.get(`https://api.telegram.org/bot${botToken}/getChat?chat_id=${chatId}`);
            if (response.data.ok) {
                const participantsResponse = await axios.get(`https://api.telegram.org/bot${botToken}/getChatAdministrators?chat_id=${chatId}`);
                setStudents(participantsResponse.data.result);
            } else {
                console.error('Failed to access chat.');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter Telegram Group Link:</Text>
            <TextInput
                style={styles.input}
                value={groupLink}
                onChangeText={setGroupLink}
                placeholder="Enter group link"
            />
            <Button title="Load Participants" onPress={getGroupParticipants} />
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={students}
                    keyExtractor={(item) => item.user.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text>{item.user.first_name} {item.user.last_name}</Text>
                            <Text>{item.user.username}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    item: {
        padding: 16,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
});

export default StudentScreen;
