import _ from "lodash";

export function paginate(pageNum, items, pageSize) {
    const startIndex = (pageNum - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
    // _.slice(items, startIndex) //create new array from items and start with startIndex
    // _.take()
}