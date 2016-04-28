var execFileSync = require('child_process').execFileSync
var path = require('path')

var SCRIPT_PATH = path.join(__dirname, 'exec-glslify')

module.exports = function (baseDir, stringInput, optionInput) {
  var transforms = optionInput.transform || optionInput.transforms || []
  if (!Array.isArray(transforms)) {
    transforms = [transforms]
  }

  var glslifyInput = {
    transforms: transforms
  }

  if (optionInput.inline) {
    glslifyInput.data = stringInput
  } else {
    glslifyInput.filename = stringInput
  }

  var options = {
    cwd: baseDir,
    input: JSON.stringify(glslifyInput)
  }

  return execFileSync(process.argv[0], [SCRIPT_PATH], options).toString(0)
}