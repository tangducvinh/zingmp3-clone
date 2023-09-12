
export function handleSlider(array, size) {
    
    if (array[2] + 1 !== size + 1) {
        array.shift()
        let number = array[1] + 1;
        array.push(number)
    } else {
        array.shift()
        array.push(0)
    }

    return array
}





