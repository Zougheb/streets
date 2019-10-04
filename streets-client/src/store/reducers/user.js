import { GET_USER } from "../actionTypes";

const user = (state = [], action) => {
    // console.log(action.payload)
    switch (action.type) {
        case GET_USER:
            return [...action.payload];
        default:
            return state;
    }
};

export default user;
