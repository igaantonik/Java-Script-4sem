function sum(x,y) {
    return x+y;
}

function sum_strings(a){
    let sum = 0;
    for (let i = 0; i < a.length; i++) {
        const str = parseInt(a[i]);
        if (!isNaN(str)) {
            sum += str;
        }
    }
    return sum;
}

function digits(s){
    let oddSum = 0;
    let evenSum = 0;
    for (let i = 0; i < s.length; i++) {
        const digit = parseInt(s[i]);
        if (!isNaN(digit)) {
            if (digit % 2 === 0) {
                evenSum += digit;
            } else {
                oddSum += digit;
            }
        }
    }
    return [oddSum, evenSum];
}

function letters(s){
    let lowercaseCount = 0;
    let uppercaseCount = 0;
    for (let i = 0; i < s.length; i++) {
        if(isNaN(s[i])){
            if (s[i] === String(s[i]).toLowerCase()) {
                lowercaseCount++;
            } else if (s[i] === String(s[i]).toUpperCase()) {
                uppercaseCount++;
            }
        }

    }
    return [lowercaseCount, uppercaseCount];
}