var convert = new Interface('../pdfinfo-worker.js');
var output = ""
convert.on_stdout = function(txt) { output += txt; };
convert.on_stderr = function(txt) { console.log(txt); };

var test_result = function(contents) {
  var expected_output = "Title:          freiesMagazin 03/2013\n"
    + "Subject:        Magazin rund um Linux und Open Source\n"
    + "Keywords:       freiesMagazin, freies, Magazin, Linux, Open Source\n"
    + "Author:         Dominik Wagenführ\n"
    + "Creator:        Dominik Wagenführ\n"
    + "Producer:       pdfTeX-1.40.13\n"
    + "CreationDate:   D:20130303093415+01'00'\n"
    + "ModDate:        D:20130303093415+01'00'\n"
    + "Tagged:         no\n"
    + "Form:           none\n"
    + "Pages:          49\n"
    + "Encrypted:      no\n"
    + "Page size:      841.89 x 595.276 pts (A4)\n"
    + "Page rot:       0\n"
    + "File size:      2479159 bytes\n"
    + "Optimized:      no\n"
    + "PDF version:    1.4\n";
  testResult(output === expected_output);
}


convert.addUrl('tests/test.pdf', '/');

convert.allDone().then(
  convert.run.curryPromise('/test.pdf').then(test_result)
);

