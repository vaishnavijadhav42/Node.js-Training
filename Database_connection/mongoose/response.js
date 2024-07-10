// response.js

export default class ApiResponse {
    constructor(success, result, error) {
        this.success = success;
        if (success) {
            this.result = result;
        } else {
            this.error = error;
        }
    }
}
