const { clear } = require("console");
const fs = require("fs")
const path = require("path")
// const { fileSystemHelper } = require('../allhelpers/fileSystemHelper.js')

const dirLimit = 200
const input = "input/resize"
const output = './output'

clear()

// Fn to get all file paths of the input folder
const getAllFiles = function(dirPath, arrayOfFiles) {
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
    }
  })

  
  return arrayOfFiles
}

// images from copyPasteFiles/input
// Verknüpfung/Folder link can be placed
const images = getAllFiles(input)

// console.log(images.length);

const dirAmount = Math.round(images.length/dirLimit)

for (let i = 0; i < dirAmount; i++) {
  const input = "input/resize"
  fs.mkdir(`${output}/dir_${i + 1}`, function(err) {
    // if (err) {
    //   console.log(err)
    // } else {
    //   console.log("New directory successfully created.")
    // }
  })
}

// Check, if directories were created/List all directories
// (since the code does not run asnyc, it is here just kept as reference for the future)
// function getDirectories(path) {
//   return fs.readdirSync(path).filter(function (file) {
//     return fs.statSync(path + '/' + file).isDirectory();
//   });
// }
// const input = "input/resize"
// const allNewDirectories = getDirectories(output)

// To Start at folder dir_1
currentDir = 1

// console.log(dirAmount);
let dirStart = 0
let dirEnd = dirLimit

for (let i = 0; i < dirAmount; i++) {
  // const element = array[i];
  console.log('-------------------------------');
  console.log(i + 1);
  console.log('-------------------------------');

  console.log(images.length);

  let dirSelection = images.slice(dirStart, dirEnd)
  
  // console.log(dirSelection);

  for (const selectedImage of dirSelection) {
    const theFilePath = selectedImage.split('/')
    const newPath = theFilePath[(theFilePath.length)-1]
    
    // console.log(newPath);

    fs.rename(selectedImage, `./output/dir_${currentDir}/${newPath}`, function (err) {
      if (err) throw err
      console.log('Successfully renamed/moved!')
    })

  }

  dirStart += dirLimit
  dirEnd += dirLimit
  currentDir += 1

  console.log('dirStart');
  console.log(dirStart);
  console.log("dirEnd");
  console.log(dirEnd);
  // await delay(1000)
}