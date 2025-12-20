export class InvalidCredentialsError extends Error {
    constructor() {
        super('Credentials are not valid');
    }
}