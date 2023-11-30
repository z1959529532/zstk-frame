/*
 * "off"或者0，不启用这个规则
 * "warn"或者1，出现问题会有警告
 * "error"或者2，出现问题会报错
 */
module.exports = {
    //告诉eslint找当前配置文件不能往父级查找
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        'eslint:recommended',
        '@vue/typescript/recommended'
    ],
    parserOptions: {
        ecmaVersion: 2020
    },
    rules: {
        'no-empty': 'warn',                             //块语句中的内容不能为空
        'no-empty-pattern': 'warn',                             //块语句中的内容不能为空
        'no-extra-boolean-cast': 'warn',                //禁止不必要的bool转换
        'no-fallthrough': 'warn',                       //禁止switch穿透
        'no-inner-declarations': ['warn', 'functions'], //禁止在块语句中使用声明（变量或函数）
        'one-var': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',                      //禁止使用ts-ignore
        '@typescript-eslint/ban-types': 'warn',                         //禁止内置原始类型
        '@typescript-eslint/camelcase': 'warn',                         //使用驼峰命名
        '@typescript-eslint/class-name-casing': 'warn',                 //类和接口必须遵守大驼峰命名
        '@typescript-eslint/consistent-type-assertions': 'warn',        //优先使用类型断言
        '@typescript-eslint/explicit-function-return-type': 'off',     //明确的方法返回值
        '@typescript-eslint/interface-name-prefix': 'warn',
        '@typescript-eslint/member-delimiter-style': 'warn',
        '@typescript-eslint/no-array-constructor': 'error',
        '@typescript-eslint/no-empty-function': 'warn',
        '@typescript-eslint/no-inferrable-types': 'warn',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-namespace': 'warn',
        '@typescript-eslint/no-non-null-assertion': 'warn',
        '@typescript-eslint/no-this-alias': 'warn',
        '@typescript-eslint/no-use-before-define': 'off',               //未定义前禁止使用
        '@typescript-eslint/no-var-requires': 'warn',                   //禁止使用var声明变量
        '@typescript-eslint/prefer-namespace-keyword': 'error',
        '@typescript-eslint/triple-slash-reference': 'error',           //三斜线引用
        '@typescript-eslint/type-annotation-spacing': 'off',            //类注释间隔
        'prefer-rest-params': 'error',                                 // 使用可变参数代替内置的arguments变量
        'prefer-spread': 'warn',                                       // 使用可变参数，不使用apply进行可变参数调用
        'no-case-declarations': 'warn',
        'prefer-const': 'warn',
        'no-prototype-builtins': 'warn',
        'no-useless-escape': 'off',
        'no-var': 'warn',
        'no-debugger': 'warn',
        'no-unreachable': 'warn'
    }
};
