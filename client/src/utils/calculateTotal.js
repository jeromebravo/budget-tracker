export default function(list) {
    let total = 0;

    for(let item of list) {
        total += item.amount;
    }

    return total;
}