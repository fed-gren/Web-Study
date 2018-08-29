let a = () => {
    console.log('A');
}

let slow = (callback) => {
    callback();
}

slow(a);