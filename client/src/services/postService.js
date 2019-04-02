import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/posts";

function postUrl(slug) {
    return `${apiEndpoint}/${slug}`;
}

export function getPosts() {
    return http.get(apiEndpoint);
}

export function getPost(slug) {
    return http.get(postUrl(slug));
}

export function savePost(post) {
    if (post._id) {
        const body = { ...post };
        delete body._id;
        return http.put(postUrl(post._id), body);
    }

    return http.post(apiEndpoint, post);
}

export function deletePost(postId) {
    return http.delete(postUrl(postId));
}
