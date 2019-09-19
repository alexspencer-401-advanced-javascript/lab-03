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
  it('saves a file', () => {
    // arrange
    const exampleObject = { name: 'Alex' };
    const dest = './id.json';
    writeFile.mockResolvedValue(exampleObject);
    
    // act
    return documentNew.save(exampleObject)
      .then(() => {
        const writeCalls = writeFile.mock.calls;
        expect(writeCalls.length).toBe(1);
        expect(writeCalls[0][0]).toBe(dest);
        expect(writeCalls[0][1]).toBe(JSON.stringify(exampleObject));
      });
  });
});
