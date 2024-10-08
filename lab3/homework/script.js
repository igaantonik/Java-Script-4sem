var animation;
var counter = 0;

// Source: https://udn.realityripple.com/docs/Tools/Performance/Scenarios/Intensive_JavaScript
function calculatePrimes(iterations) {
    var primes = [];
    for (var i = 0; i < iterations; i++) {
        var candidate = i * (1000000000 * Math.random());
        var isPrime = true;
        for (var c = 2; c <= Math.sqrt(candidate); ++c) {
            if (candidate % c === 0) {
                // not prime
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(candidate);
        }
    }
    return primes;
}

function calculatePrimesInBackground(iterations) {
    if (window.Worker) {
        const worker = new Worker('worker.js');
        worker.postMessage(iterations);
        worker.onmessage = function(message) {
            document.getElementById('result_worker').textContent = message.data
        };
        worker.onerror = function(error) {
            console.error('Worker error:', error);
        };
    } else {
        window.alert('Your browser does not support web workers.');
    }
}

function startAnimation() {
    document.forms[0].start.disabled = true;
    document.forms[0].stop.disabled = false;
    animation = window.requestAnimationFrame(step);
}

function step() {
    document.forms[0].counter.value = counter++;
    animation = window.requestAnimationFrame(step);
}

function stopAnimation() {
    document.forms[0].start.disabled = false;
    document.forms[0].stop.disabled = true;
    window.cancelAnimationFrame(animation)
}