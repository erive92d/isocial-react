export function capitalizeFirst(word) {
    if (!word) {
        return
    }
    return word.charAt(0).toUpperCase()
        + word.slice(1)

}