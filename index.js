 // 1. Input dir.A & dir.B
 // 2. Read A and B into 2 arrays
 // 3. Indexes count should match
 // 4. Rename each file in B with the name from A

const folderA = process.argv[2]
const folderB = process.argv[3]
const extA = process.argv[4]

const fs = require('fs')
const rn = require('rename')
const path = require('path')
const junk = require('junk')

const filesA = fs.readdirSync(folderA).filter(junk.not)
const filesB = fs.readdirSync(folderB).filter(junk.not)

function run (A, B) {
  if (validate(A, B)) {
    return rename(A, B)
  }
  const err = new Error('Files count in folders A&B doesn\'t match.')
  return console.error('\x1b[31m', err.message, '\x1b[0m')
}

function validate (A, B) {
  return A.length === B.length
}

function rename (source, target) {
  target.forEach((file, i) => {

    const targetFile = path.join(folderB, file)
    const sourceFile = rn(targetFile, {basename: path.basename(source[i], extA)})

    fs.rename(targetFile, sourceFile, (err) => {
      if (err) console.error('\x1b[31m', err, '\x1b[0m')
    })
    console.log(sourceFile)
    // console.log(rn(path.join(folderB, file), {extname: '.lol'}))
  })
}

run(filesA, filesB)
