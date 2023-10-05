
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

export function handleSliderRank(array) {
    if (array[0] !== 6) {
        for (var i = 0; i <= 2; i++) {
            array[i] += 3;
        }
    } else {
        for(var i = 0; i <= 2; i++) {
            array[i] = i;
        }
    }

    return array
}





