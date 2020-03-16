export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('id_token');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return console.log(err);
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('id_token', serializedState);
    } catch (err) {
        // ignore write errors
    }
}