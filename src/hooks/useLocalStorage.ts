export const useLocalStorage = (key: string) => {

    const get = () => {
        return localStorage.getItem(key);
    }

    const set = (value: any) => {
        return localStorage.setItem(key, value);
    }

    const clear = () => {
        localStorage.removeItem(key);
    }

    return {
        get,
        set,
        clear
    }
}