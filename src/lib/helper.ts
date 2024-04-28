export function Response (success: boolean, code: number, data: any) {
    return {
        success,
        code,
        data
    };
}