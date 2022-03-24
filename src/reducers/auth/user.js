export const user = (state={}, action) => {
    switch (action.type) {
        case 'SET-USER':
            return action.payload;
        default:
            return state;
    }
}