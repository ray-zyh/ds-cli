/** 
 * 检查一下node版本
 * 获取一下ds-cli版本
*/
// 版本号处理
const semver=require('semver')
const packageConfig = require('../../package.json')

const chalk = require('chalk')
import tool from "./tool"

export default ()=>{
    if (!semver.satisfies(process.version, packageConfig.engines.node)) {
        return console.log(chalk.red(
            ' 你的node版本必须 >=' + packageConfig.engines.node + '.x 才能使用ds-cli'
        ))
    }
}