export const capitalizeText = (str: string) => {

    const min = str.toLowerCase();
    return str.charAt(0).toUpperCase() + min.slice(1);
}
