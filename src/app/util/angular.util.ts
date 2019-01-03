/**
 * Used to track items in an `*ngFor` for better rendering performance.
 */
export const trackByFn = (index: number, item: any): number | string => {
    return item && item.id ? item.id : index;
};
