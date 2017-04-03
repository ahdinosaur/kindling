const { assign } = Object
const Prompter = require('enquirer')
const Prompts = require('enquirer-prompts')
const range = require('array-range')
const randomWord = require('random-word')
const licenses = require('spdx-license-list/simple');
const getUserName = require('username').sync
const pull = require('pull-stream/pull')
const pullMap = require('pull-stream/throughs/map')
const pullFs = require('pull-vinyl')
const Template = require('pixie')

module.exports = createProject

const questions = [{
  type: 'input',
  name: 'name',
  message: "Give your app a name",
  default: range(2).map(randomWord).join('-')
}, {
  type: 'input',
  name: 'description',
  message: "How would you describe the app?",
  default: "there are many like it, but this one is mine.",
}, {
  type: 'input',
  name: 'author',
  message: "What is your name on GitHub?",
  default: getUserName(),
}, {
  type: 'autocomplete',
  name: 'license',
  message: "Choose a license:",
  source: searchLicenses,
  default: 'ISC',
}, {
  type: 'confirm',
  name: 'moveon',
  message: 'Continue?',
}]

const defaults = {
  version: '0.0.0'
}

// - description
// - main
// - scripts
//   - start
//   - test
//   - lint
//   - deploy
// - keywords
// - author
// - license

function createProject () {
  var prompter = new Prompter()

  prompter.use(Prompts)

  prompter.ask(questions)
    .then(answers => {
      const values = assign({}, defaults, answers)

      return new Promise((resolve, reject) => {
        pull(
          pullFs.src('./template/**/*', {
            base: './template'
          }),
          writeValues(values),
          pullFs.dest('./out', err => {
            if (err) reject(err)
            else resolve()
          })
        )
      })
    })
    .catch(console.error)
}

function writeValues (values) {
  const open = '__'
  const close = '__'
  return pullMap(templateFile => {
    const contents = templateFile.contents
    const string = contents.toString()
    const template = Template(string, open, close)
    const nextString = Template.compile(template, values)
    const nextContents = Buffer.from(nextString)
    return assign(templateFile, {
      contents: nextContents
    })
  })
}

function searchLicenses (answers, input) {
  return new Promise(function(resolve) {
    resolve(Array.from(licenses).filter(filter(input)))
  })
}
 
function filter (input) {
  return function (text) {
    return new RegExp(input, 'i').exec(text) !== null
  }
}
