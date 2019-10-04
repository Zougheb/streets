import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { GET_USER } from "../actionTypes";

export const getUser = user => ({
    type: GET_USER,
    user
});


export const userProfile = () => (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.id;
        return apiCall("GET", `/api/users/${id}`)
            .then(res => dispatch(getUser(res)))
            .catch(err => {
                addError(err);
            });

};