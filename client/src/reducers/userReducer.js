
/*
export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post);
        dispatch({type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}
*/
//Major bug here
export const reducer = (state, action) => {
    if (action.type = "UPDATE") {
        return {
            ...state,
            followers:action.payload.followers,
            following:action.payload.following,
        }
    }
}
