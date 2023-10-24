
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

export function handleNumber(number) {
    if (number < 1000) return `${number} quan tâm`
    else if (number < 1000000) return `${Math.round(number * 10 / 1000) / 10}K quan tâm`
    else return `${Math.round(number * 10 / 1000000) / 10}M quan tâm`
}





