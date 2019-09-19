const files = require('./files');
// use npm to find a module for creating ids
const shortid = require('shortid');

// const objectExample = { name: 'Alex' };

class DocumentCollection {
  constructor(folder) {
    this.folder = folder;
  }

  save(object) {
    object.id = shortid.generate();
    const serialObject = JSON.stringify(object);
    const fileName = `./${object.id}.json`;
    return files.writeFile(fileName, serialObject)
      .then(() => {
        return object;
      })
      .catch(err => {
        console.log('***ERROR:', err);
      });
  }

  get(id) {
    const filePath = `./${id}.json`;
    return files.readFile(filePath)
      .then((contents) => {
        return JSON.parse(contents);
      })
      .catch(err => {
        console.log('***ERROR:', err);
      });
  }

  getAll() {
    // TODO:
    // 1. read folder file names
    // 2. use Promise.all and map each file name to a this.get call (remove .json file extension!)
    // 3. "return" array of objects
    // 4. if expected, turn promisified fs errors into meaningful database errors
  }
}

// function save(object) {
//   object.id = shortid.generate();
//   const serialObject = JSON.stringify(object);
//   const fileName = `./${object.id}.json`;
//   return files.writeFile(fileName, serialObject)
//     .then(() => {
//       return object;
//     })
//     .catch(err => {
//       console.log('***ERROR:', err);
//     });
// }


// function get(id) {
//   const filePath = `./${id}.json`;
//   return files.readFile(filePath)
//     .then((contents) => {
//       return JSON.parse(contents);
//     })
//     .catch(err => {
//       console.log('***ERROR:', err);
//     });
// }
// const result = async() => {
//   const objectItem = await save(objectExample);
//   const res = await get(objectItem.id);
//   console.log(res);
// };

// result();

module.exports = DocumentCollection;
