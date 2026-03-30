export const formatDate = (dateStr: string | undefined) => {
    if(!dateStr) return '';
    const [year, month, day] = dateStr.split('-')
    return `${day}.${month}.${year}`
}

export const hoursLeft = (dateTimeStr?: string) => {
    if (!dateTimeStr) return '';

    const target = new Date(dateTimeStr);
    const now = new Date();

    const diffMs = target.getTime() - now.getTime();

    if (diffMs <= 0) {
        return '0 ч';
    }

    const hoursLeft = Math.ceil(diffMs / (1000 * 60 * 60));

    return `${hoursLeft} ч`;
};
