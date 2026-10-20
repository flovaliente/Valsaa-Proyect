// Wrapper de fetch para hablar con la API del server.
// Envía y recibe JSON, incluye la cookie de sesión y lanza un error si la respuesta no es OK.
export class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}

export const http = async (path, { method = 'GET', body } = {}) => {
    const response = await fetch(path, {
        method,
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            ...(body !== undefined && { 'Content-Type': 'application/json' }),
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
        throw new ApiError(data?.message ?? `Error ${response.status}`, response.status);
    }
    return data;
};
