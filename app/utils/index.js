import {
    Platform,
    Image,
} from 'react-native'

export default {
    /** @returns <boolean> */
    isIOS: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',

    getImageSizeAsync: (imageUri) => {
        return new Promise((resolve, reject) => {
            Image.getSize(
                imageUri,
                (width, height) => {
                    resolve({
                        width,
                        height,
                    })
                },
                (err) => {
                    reject(err)
                }
            )
        })
    },

    stringEndsWith(str, suffix) {
        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
}

export * from './input'