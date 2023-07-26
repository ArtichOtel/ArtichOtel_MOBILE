export function getDiffDate(start, end)
{
    let calculDiff = end.getTime() - start.getTime();
    return Math.floor(calculDiff / (1000 * 3600 * 24));
}