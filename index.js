#!/usr/bin/env node
const { prefix, types, appId } = require('./gitConfig')
console.log(prefix, types)
const inquirer = require('inquirer')
inquirer.registerPrompt('selectLine', require('inquirer-select-line'));
let gitType, functionType, functionNumber, gitMessage
const child = require('child_process');

const gitLineList = {
  type: 'selectLine',
  message: 'git commit lint type',
  name: 'git',
  choices:  prefix.map(i => i.type + '--- ' + i.label) ,
  placeholder: index => index === 0 ? '' : `'${gitLineList.choices[index -1 ]}'`
};
const functionLineList = {
  type: 'selectLine',
  message: 'your commint function for your product',
  name: 'function',
  choices: types,
  placeholder: index => index === 0 ? '' : `'${functionLineList.choices[index - 1]}'`,
};
// 主函数
const run = async () => {
  try {
    const answers = await inquirer.prompt([
      gitLineList,
      functionLineList,
    ])
    gitType = prefix[answers.git].type
    functionType = types[answers.function]
  } catch(e) {
    throw Error('select error')
  }
  
  try {
    const answers = await inquirer.prompt([
      {
        message: '请输入你的任务号',
        name: 'number'
      },
      {
        message: '请输入你的commit message',
        name: 'message'
      }
  ])
    gitMessage = answers.message
    functionNumber = answers.number
  } catch(e) {
    console.log(e)
    throw Error('commit message error')
  }
  try {
    child.exec(`'git commit -m "${gitType} [${appId}] ${types}-${functionNumber} ${gitMessage}"'`)
  }catch(e) {
    throw Error('commit failed')
  }
}
run()





