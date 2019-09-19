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
    return files.readdir(`./${this.folder}`)
      .then((files) => {
        return Promise.all(
          files.map((file) => {
            return this.get(file.substring(0, file.length - 5));
          }));
      });
  }
}

// Promise.all([
//   readFile('files.js', 'utf-8'),
//   readFile('package.json', 'utf-8')
// ])
//   .then(([filesText, packageJson]) => {
//     console.log(filesText);
//     console.log(packageJson);
//   });

// function save(object) {
//   object.id = shortid.generate();
//   const serialObject = JSON.stringify(object);
//   const fileName = `./document/${object.id}.json`;
//   return files.writeFile(fileName, serialObject)
//     .then(() => {
//       return object;
//     })
//     .catch(err => {
//       console.log('***ERROR:', err);
//     });
// }


// function get(id) {
//   const filePath = `./document/${id}.json`;
//   return files.readFile(filePath)
//     .then((contents) => {
//       return JSON.parse(contents);
//     })
//     .catch(err => {
//       console.log('***ERROR:', err);
//     });
// }
// // const result = async() => {
// //   const objectItem = await save(objectExample);
// //   const res = await get(objectItem.id);
// // };

// // result();

// function getAll() {
//   return files.readdir('./document')
//     .then((files) => {
//       return Promise.all(
//       // console.log(files[0][0].substring(0, files[0][0].length - 5));
//         files.map(async(file) => {
//         // console.log(get(file.substring(0, file.length - 5)));
//           return await get(file.substring(0, file.length - 5));
//         }));
//     });
// }

// const result = async() => {
//   await getAll();
// };

// console.log(getAll());

// console.log(getAll());

// const result = async() => {
//   await getAll();
// };

// result();

// let newArr = [];

// files.readdir('./document')
//   .then(files => {
//     // Promise.all();
//     // console.log(files);
//     Promise.all(files.map(file => {
//       const fileName = file.substring(0, file.length - 5);
//       // console.log(fileName);
//       const newItem = get(fileName);
//       // console.log(newItem);
//       // newArr.push(newItem);
//     }))
//       .then(() => {
//         newArr.push(newItem);
//       });
//     // return newArr;
//   });



module.exports = DocumentCollection;
