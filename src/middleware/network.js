import 'whatwg-fetch';

export default function ({ dispatch }) {
    return (next) => (action) => {
        if (action.url) {
            next(action);
            return fetch(action.url)
                .then(res => res.json())
                .then(res => {
                    if (action.onSuccess) action.onSuccess(res, dispatch);
                }, err => {
                    if (action.onFailure) action.onFailure(err);
                });
        }
        return next(action);
    };
}