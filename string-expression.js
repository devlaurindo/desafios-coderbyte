function StringExpression(str) {
    let newString = str.slice(0);
    let dictionary = [
     ['zero', '0'],
     ['one', '1'],
     ['two', '2'],
    ['three', '3'],
    ['four', '4'],
    ['five', '5'],
    ['six', '6'],
    ['seven', '7'],
    ['eight', '8'],
    ['nine', '9'],
    ['minus', '-'],
    ['plus', '+']
    ];
    dictionary.forEach(val => {
    let regEx = new RegExp (val[0], 'g');
    newString = newString.replace(regEx, val[1]);
    });
    let resString = eval(newString).toString();
    dictionary.slice(0,10).forEach(val => {
    let regEx = new RegExp (val[1], 'g');
    resString = resString.replace(regEx, val[0]);
    });
    return resString.replace('-', 'negative');
    }
    // keep this function call here
    StringExpression(readline());