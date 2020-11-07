import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, data) => {
    try {
        AsyncStorage.setItem(key, JSON.stringify(data), (dataaaa) => {
            console.log("success:::", dataaaa);
        });

    } catch (error) {
        console.log("error:::", error);

    }
};

export const retrieveData = async (key, call) => {
    try {
        AsyncStorage.getItem(key, (err, result) => {
            console.log("result:::::", result,err);
            call(JSON.parse(result))
            //call(result)
        });
    } catch (error) {
        call(false)
    }
};

export const clearData = async (key) => {
    try {
        AsyncStorage.removeItem(key, (err, result) => {
            console.log("removeItem:::::");
        });
    } catch (error) {
        console.log("error removeItem:::::", error);
    }
};
