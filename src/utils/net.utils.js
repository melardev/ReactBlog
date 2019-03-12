export function stripResponseMeta(response) {
    delete response.success;
    delete response.full_messages;
    return response;
}
