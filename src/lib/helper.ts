export function ResponseData (success: boolean, code: number,  data: any) {
    return {
        success,
        code,
        data
    };
}