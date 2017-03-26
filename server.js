const PBKDF2 = require('crypto-js/pbkdf2'),
    BASE64 = require('crypto-js/enc-base64');

let [start, end] = ['0000', '9999'];

let [key, salt] = [
    'JVLkwfuXFNo1O/D7fKOwOJ2k6LI=', // RestrictionsPasswordKey
    'yG5VFQ==' // RestrictionsPasswordSalt
];

key = BASE64.parse(key).toString();

let _start = parseInt(start),
    _end = parseInt(end);

function parseCode(code) {
    return ('0000' + code).slice(-4);
}


for (_start; _start <= _end; _start++) {
    const code = PBKDF2(parseCode(_start), BASE64.parse(salt), { keySize: 5, iterations: 1000 });

    if (code.toString() == key) {
        console.log('Got em!');
        console.log(parseCode(_start));
        process.exit();
    } else {
        console.log(`${ parseCode(_start) } wasn't the right code`);
    }
}
