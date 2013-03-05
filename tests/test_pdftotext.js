var test_result = function(contents) {
  console.log(contents['/test.txt'] === contents['/test_expected.txt']);
  testResult(contents['/test.txt'] === contents['/test_expected.txt']);
  console.log('test_result', contents);
}


var convert = new Interface('../pdftotext-worker.js');
convert.on_stdout = function(txt) { console.log(txt); };
convert.on_stderr = function(txt) { console.log(txt); };

convert.addUrl('tests/test.pdf', '/');
convert.addUrl('tests/expected/test.txt', '/test_expected.txt');

convert.allDone().then(
  convert.run.curryPromise('/test.pdf').then(
    convert.getFiles.curryPromise('/test.txt', '/test_expected.txt').then(test_result)
  )
);

