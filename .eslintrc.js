module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2016,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [ // 强制使用一致的换行风格
            "error",
            "unix"
        ],
        "quotes": [ // 强制使用一致的单引号
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        // 控制台
        "no-console": "on",
        // 禁用未使用过的变量
        "no-unused-vars": 2,
        "no-use-before-define": 2, // 不允许在变量定义之前使用它们
        "curly": [ // 一直风格的括号
            "error",
            "all"
        ]
        /* "semi": [ // 控制行尾部分号
            "error", 
            "always"
        ]  */
    }
};