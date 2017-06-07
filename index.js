const emoji = [];
const ascii = [];

let btoa = (text) => new Buffer(text).toString('base64');
let atob = (b64Encoded) => new Buffer(b64Encoded, 'base64').toString();
for (let i = 0; i < 10; i++) {
    ascii.push(String.fromCharCode(48 + i));
}
for (let i = 0; i < 26; i++) {
    ascii.push(String.fromCharCode(65 + i));
}
for (let j = 0; j < 26; j++) {
    ascii.push(String.fromCharCode(97 + j));
}
ascii.push('+');
ascii.push('/');
ascii.push('=');

const targetChars = {
    emoji: '😀😁🤣😂😄😅😆😇😉😊🙂🙃😋😌😍😘😙😜😝🤑🐶🐱🐭🐹🐰🐻🐼🐨🐵🐙🐸🐽🐷🐮🦁🐯🙈🙉🙊🐒🐔🍏🍎🍐🍊🍋🍌🍉🍇🍅🥑🥝🍍🍑🍒🍈🍓🍆🥒🥕🌶🥔⚽️🏀🏈⚾️',
    chemistry: '氢氦锂铍硼碳氮氧氟氖钠镁铝硅磷硫氯氩钾钙钪钛钒铬锰铁钴镍铜锌镓锗砷硒溴铷锶钇锆钼锝钌铑钯银镉铟锡锑碲碘氙铯钡镧铪钽钨铼锇铱铂金汞',
    marsFont: '伱媞涐冇尐芼輕倯獲嘚趠躰牸侞甪吙煋喥輸兦簧孒應尨瘡祂の佲佽ゐ笕恠呿哖嗄蔭ㄝ學苌幵ф嗰甡洎哙埘堠萁僦卟認識菿乜許俓瀏侽倵拖詘徔',
    symboledEmotion: '(*￣(エ)￣) (>^ω^<)喵  (｡♥‿♥｡) （¯﹃¯）口水 (～﹃～)~zZ 囧rz _(:з」∠)_ (╥╯^╰╥) ┭┮﹏┭┮ ╭(╯^╰)╮ (￣.￣) (￣▽￣)~ *╮(￣▽￣) ╭(￣▽￣)" （￣︶￣）↗ <(￣︶￣)> ︿(￣︶￣)︿ \（￣︶￣）/ :） :-) :-D XD \(^o^)/ Y(^o^)Y (^.^)Y Ya!!(＾－＾)V m9(`Д´)  (`Д´*)9 ヽ(｀⌒´)ﾉ  (*´ﾉ皿`) (`皿´) ヽ(｀Д´)ﾉ ヽ(`З’)ﾉ d(･｀ω´･d*) :-( o(TωT)o (*T_T*) (/□＼*) (╥╯^╰╥) /(ㄒoㄒ)/ ~~T^T ╥﹏╥ ... :-O (*ﾟДﾟ*) ﾉ)ﾟДﾟ( ヽ(；´Д｀)ﾉ щ(ﾟДﾟщ) 乂(ﾟДﾟ三ﾟДﾟ)乂 Σ(oﾟдﾟoﾉ)! ?(･_･;? (⊙o⊙) o((⊙﹏⊙))o .(*⊙~⊙) (O_O)? …（⊙＿⊙；） …(⊙x⊙;) wow~⊙o⊙ (O_o)?? o_O|| (;￢＿￢) ﾍ(*–-)ﾉ  (￣o￣).zZ  ┐(ﾟ～ﾟ) ┌彡(-_-;)彡 ─=≡Σ(((つ•̀ω•́)つ ╭(′▽`)╭ (′▽`)╯ (๑´ㅂ`๑) （◐ˍ◑） (･ิω･ิ) ჰჰჰ❛‿❛ჴჴჴ (´థ౪థ） σ(ᇂдᇂ U•ェ•*U \\‵（●●）‵\\'
};
const emojiChars = '😀😁🤣😂😄😅😆😇😉😊🙂🙃😋😌😍😘😙😜😝🤑🐶🐱🐭🐹🐰🐻🐼🐨🐵🐙🐸🐽🐷🐮🦁🐯🙈🙉🙊🐒🐔🍏🍎🍐🍊🍋🍌🍉🍇🍅🥑🥝🍍🍑🍒🍈🍓🍆🥒🥕🌶🥔⚽️🏀🏈⚾️';

for (let char of targetChars.emoji) {
    emoji.push(char);
}

function getConfig(type = 0) {
    let encMap = {};
    let decMap = {};
    let symbols;
    switch (type) {
        case 0:
            symbols = emoji;
            break;
        case 1:
            symbols = targetChars.chemistry.split('');
            break;
        case 2:
            symbols = targetChars.marsFont.split('');
            break;
        case 3:
            symbols = targetChars.symboledEmotion.split(' ');
            break;
        default:
            symbols = emoji;
    }
    ascii.forEach((char, index) => {
        encMap[char] = symbols[index];
        decMap[symbols[index]] = char;
    });

    return {
        symbols,
        encMap,
        decMap
    };
}

function devide(text) {
    if (isEmoji(text)) {
        let ret = [];
        for (let char of text) {
            ret.push(char);
        }
        return ret;
    } else {
        let devider = getDevider(text);
        return text.split(devider);
    }
}

function getDevider(text) {
    if (text.includes(' ')) return ' ';
    return '';
}

function isEmoji(text) {
    let codePoint = text.codePointAt(0);
    return targetChars.emoji.includes(String.fromCodePoint(codePoint));
}

function convert2Ascii(str = 'xxx') {
    return btoa(encodeURIComponent(str));
}

function encrypt(text = '', key = '', iconType = 0) {
    let devider = iconType === 3 ? ' ' : '';
    let encMap = getConfig(iconType).encMap;
    if (!String.fromCodePoint) {
        alert('This envirmonent doesnt support String.fromCodePoint. Please change another one or upgrade it.');
        return '';
    }
    text = convert2Ascii(text);
    key = convert2Ascii(key);

    while (key.length < text.length) {
        key += key;
    }
    key = key.split('');
    let codePoints = [];
    text = text.split('').map((char, index) => {
        let sum = char.charCodeAt(0) + key[index].charCodeAt(0);
        codePoints.push(sum);
        return String.fromCharCode('0x' + sum);
    }).join('');

    text = btoa(encodeURIComponent(text));
    text = text.split('').map(char => {
        let ret = encMap[char];
        return ret;
    }).join(devider);
    return text;
}

function decrypt(text = '', key = '', iconType = 0) {
    let decMap = getConfig(iconType).decMap;
    try {
        let temp = [];
        temp = devide(text).map(char => decMap[char]).join('');
        text = decodeURIComponent(atob(temp));

        let codePoints = [];
        key = convert2Ascii(key);

        for (let char of text) {
            let num = parseInt(char.codePointAt(0));
            codePoints.push(num.toString(16));
        }
        while (key.length < codePoints.length) {
            key += key;
        }
        text = codePoints.map((n, index) => {
            let codePoint = n - key[index].charCodeAt(0);
            return String.fromCharCode(codePoint);
        }).join('');
        return decodeURIComponent(atob(text));
    } catch (e) {
        throw new Error('Wrong key, decode fail.');
    }
}

module.exports = {
    encrypt,
    decrypt
};
