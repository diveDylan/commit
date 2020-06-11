#!/usr/bin/env node
const { prefix, types, appId } = require('./gitConfig')
const inquirer = require('inquirer')
inquirer.registerPrompt('selectLine', require('./promt'));
let gitType, functionType, functionNumber, gitMessage
const { exec } = require('child_process');

const gitLineList = {
  type: 'selectLine',
  message: 'git commit lint type',
  name: 'git',
  choices:  prefix.map(i => i.type + ' --- ' + i.label) ,
};
const functionLineList = {
  type: 'selectLine',
  message: 'your commit function for your product',
  name: 'function',
  choices: types,
  // placeholder: index => index === 0 ? '' : `'${functionLineList.choices[index -1]}'`,
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
    console.log(e)
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
  exec(`git commit -m "${gitType} [${appId}] ${functionType}-${functionNumber} ${gitMessage}"`, function(err, res) {
    console.log(err, res)
    if(err) throw Error('git commit failed')
  })
}

run()





