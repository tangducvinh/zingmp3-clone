
var a = [0, 1, 2];
var end = 3;
function handle(a, end) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] === 0) a[i] = end;
        else a[i] -= 1;
    }

    return a;
}

console.log(handle(a, end));
