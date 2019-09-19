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
    // TODO:
    // 1. create file path from id
    const filePath = `./${id}.json`;
    // 2. use promisified fs to read file
    // 3. deserialize contents
    // 4. "return" object
    // 5. if expected, turn promisified fs errors into meaningful database errors
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
//   // TODO:
//   // 1. assign an id
//   object.id = shortid.generate();
//   // 2. serialize object
//   const serialObject = JSON.stringify(object);
//   // 3. use promisified fs to write to folder path using id.json as file name
//   const fileName = './id.json';
//   // files.writeFile(fileName, serialObject);
//   // 4. "return" object (which now has an id)
//   return files.writeFile(fileName, serialObject)
//     .then(() => {
//       return object;
//     })
//     .catch(err => {
//       console.log('***ERROR:', err);
//     });
//   // 5. if expected, turn promisified fs errors into meaningful database errors
// }
// const result = async() => {
//   const res = await save(objectExample);
//   console.log(res);
// };

// result();

module.exports = DocumentCollection;
