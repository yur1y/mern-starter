import http from "./httpService";
import {apiUrl} from "../config.json";

const apiEndpoint = apiUrl + "/comments";

function commentsUrl(id) {
    return `${apiEndpoint}/${id}`;
}

export function getComments(postId) {
    if (!postId) return http.get(apiEndpoint)
    return http.get(commentsUrl(postId));
}

export function getComment(slug) {
    return http.get(commentsUrl(slug));
}

export function saveComment(comment) {
    if (comment._id) {
        const body = {...comment};
        return http.put(commentsUrl(comment._id), {text: body.text});
    }

    return http.post(apiEndpoint, comment);
}

export function deleteComment(commentId) {
    return http.delete(commentsUrl(commentId));
}
