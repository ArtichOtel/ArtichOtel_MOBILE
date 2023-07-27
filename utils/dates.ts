/**
 * Return n of day between 2 dates. Start date must be before (lower than) the end date, otherwise the return will be negative.
 * @param start
 * @param end
 * @return number
 */
export function getDiffDate(start, end): number
{
    let calculDiff = end.getTime() - start.getTime();
    return Math.floor(calculDiff / (1000 * 3600 * 24));
}