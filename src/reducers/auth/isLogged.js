export const isLogged = (state = false, action) => {
    switch (action.type) {
        case 'SIGN-IN':            
        case 'SIGN-OUT':
            return !state;
        default:
            return state;
    }
}