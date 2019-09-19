jest.mock('../lib/files.js', () => ({
  readFile: jest.fn(),
  writeFile: jest.fn(),
  readdir: jest.fn(),
}));

// for setting up mock expectations
const { readFile, writeFile, readdir } = require('../lib/files');
const DocumentCollection = require('../lib/document-collection');
const documentNew = new DocumentCollection;

describe('Document Collection', () => {

  const exampleObject = { name: 'Alex' };

  it('saves a file', () => {
    // arrange
    writeFile.mockResolvedValue(exampleObject);
    
    // act
    return documentNew.save(exampleObject)
      .then(() => {
        const dest = `./${exampleObject.id}.json`;
        const writeCalls = writeFile.mock.calls;
        expect(writeCalls.length).toBe(1);
        expect(writeCalls[0][0]).toBe(dest);
        expect(writeCalls[0][1]).toBe(JSON.stringify(exampleObject));
      });
  });
  it(`generates error`, () => {
    // arrange
    const error = 'file error';
    writeFile.mockRejectedValueOnce(error);
    expect.assertions(0);

    // act
    documentNew.save({})
      .catch(err => {
        expect(err).toBe(error);
      });
  });
  it('gets a file by id', () => {
    // arrange
    const source = `./${exampleObject.id}.json`;
    readFile.mockResolvedValue(exampleObject);
    
    // act
    return documentNew.get(exampleObject.id)
      .then(() => {
        // const dest = `./${exampleObject.id}.json`;
        const readCalls = readFile.mock.calls;
        expect(readCalls.length).toBe(1); 
        expect(readCalls[0][0]).toBe(source);
      });
  });
});
