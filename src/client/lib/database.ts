type JsonValue = string | number | null;
interface JsonObject {
    [key: string]: Json;
}
type JsonArray = JSON[];
type Json = JsonObject | JsonArray | JsonValue;

async function api(payload?: {
    key?: string;
    method?: string;
    headers?: HeadersInit;
    body?: Json;
}) {
    return await (
        await fetch(`${import.meta.env.VITE_SERVER_URL}${payload?.key || ''}`, {
            method: payload?.method,
            body: JSON.stringify(payload?.body) || undefined,
            headers: payload?.headers,
        })
    ).json();
}

interface ListResponse {
    results: { collection: string; key: string }[];
}
interface GetResponse {
    collection: string;
    key: string;
    props: {
        value: string;
        update: string;
        created: string;
    };
}

function get(key: string): Promise<GetResponse | null>;
function get(): Promise<ListResponse>;
function get(key?: string): Promise<ListResponse | GetResponse | null> {
    return api({
        key,
        method: 'get',
    });
}
function patch(key: string, value: number) {
    return api({
        key,
        body: { value },
        method: 'patch',
    });
}
function set(key: string, value: number) {
    return api({
        key,
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: { value },
    });
}
function remove(key: string) {
    return api({
        key,
        method: 'delete',
    });
}

export default {
    get,
    set,
    patch,
    delete: remove,
};
