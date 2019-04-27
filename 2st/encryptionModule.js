const crypto = require('crypto');
module.exports.encryptionWithSalt = function(pw,salt,callback) {
    crypto.pbkdf2(pw, salt, 10, 32, 'SHA512', (err, hashed) => {
        if (err) {
            //data.msg = "pbkdf2 err"
            console.log(err);
        } else {
            let result = {
                "hashedPassword": "",
            }
            result.hashedPassword = hashed.toString('base64')
            console.log(result)
            return callback(result)
        }
    })
}
module.exports.encryption = function(pw,callback) {
    crypto.randomBytes(32, (err, buf) => {
        if (err) {
            //생성 실패하면
            console.log(err);
        } else {
            //salt값으로 암호화
            const salt = buf.toString('base64');
            crypto.pbkdf2(pw, salt, 10, 32, 'SHA512', (err, hashed) => {
                if (err) {
                    //data.msg = "pbkdf2 err"
                    console.log(err);
                } else {
                    let result = {
                        "hashedPassword": "",
                        "salt": ""
                    }
                    result.hashedPassword = hashed.toString('base64')
                    result.salt = salt
                    return callback(result)
                }
            })
        }
    })
}
