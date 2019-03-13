//获取配置
const Handlebars=require('handlebars')
const path=require('path')
// 获取json和yaml metadata返回obj
const metadata = require('read-metadata')
const exists = require('fs').existsSync

//检查你输入的 app-name 是否符合 npm 包名命名规范
const validateName = require('validate-npm-package-name')


// 注册handlebars的helper辅助函数
Handlebars.registerHelper('if_eq', function (a, b, opts) {
return a === b
    ? opts.fn(this)
    : opts.inverse(this)
})
  
Handlebars.registerHelper('unless_eq', function (a, b, opts) {
return a === b
    ? opts.inverse(this)
    : opts.fn(this)
})

export default function options(){

}

/**
 * 
 * 获取meta files
 *
 * @param  {String} dir
 * @return {Object}
 */

function getMetadata (dir) {
    //获取模板目录下的meta，定制化需求
    const json = path.join(dir, 'meta.json')
    const js = path.join(dir, 'meta.js')
    let opts = {}

    if (exists(json)) {
        //存在json的话，同步转换成obj
        opts = metadata.sync(json)
    } else if (exists(js)) {
        const req = require(path.resolve(js))
        if (req !== Object(req)) {
            throw new Error('meta.js 需要导出一个对象')
        }
        opts = req
    }

    return opts
}