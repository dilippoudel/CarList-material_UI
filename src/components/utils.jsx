import lodash  from 'lodash';
export default function Utils(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;
    return lodash(items).slice(startIndex).take(pageSize).value();
}