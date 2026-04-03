import AsyncStorage from '@react-native-async-storage/async-storage';

// Тип користувача (підлаштуй під себе)
export interface User {
    email: string;
    name: string;
}

// Зберегти користувача
export const saveUser = async (user: User): Promise<void> => {
    try {
        await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (e) {
        console.log('Error saving user', e);
    }
};

// Отримати користувача
export const getUser = async (): Promise<User | null> => {
    try {
        const jsonValue = await AsyncStorage.getItem('user');
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log('Error getting user', e);
        return null;
    }
};

// Видалити користувача
export const removeUser = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem('user');
    } catch (e) {
        console.log('Error removing user', e);
    }
};