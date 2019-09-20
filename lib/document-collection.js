const files = require('./files');
// use npm to find a module for creating ids
const shortid = require('shortid');

class DocumentCollection {
  constructor(folder) {
    this.folder = folder;
  }

  save(object) {
    object.id = shortid.generate();
    const serialObject = JSON.stringify(object);
    const fileName = `./${this.folder}/${object.id}.json`;
    return files.writeFile(fileName, serialObject)
      .then(() => {
        return object;
      })
      .catch(err => {
        console.log('***ERROR:', err);
      });
  }

  get(id) {
    const filePath = `./${this.folder}/${id}.json`;
    return files.readFile(filePath)
      .then((contents) => {
        return JSON.parse(contents);
      })
      .catch(err => {
        console.log('***ERROR:', err);
      });
  }

  getAll() {
    return files.readdir(this.folder)
      .then((files) => {
        return Promise.all(files.map(file => {
          console.log(file);
          return this.get(file.substring(0, file.length - 5));
        }));
      })
      .catch(err => {
        console.log('***ERROR:', err);
      });
  }
}

module.exports = DocumentCollection;
