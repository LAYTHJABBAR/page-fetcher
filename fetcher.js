const request = require('request');
const fs = require('fs');
const readline = require('readline');
const path = require('path');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
const getResource = (server, locf) => {
  request(server, (error, response, body) => {                   //response here to get back the body size and to use it on the bytes
    if (error) {
      console.log(`NOOOOOO!! such A Link check your URL`);
      process.exit();
    }
    fs.writeFile(locf, body, (error) => {
      fs.access(locf, (error) => {
        if (error) { console.log('errrrrrrrrrrrrrrrrrror')
        process.exit();}
      });
      if (error);
      console.log(`Downloaded and saved ${body.length} byte to ${locf}`);
      rl.close();
    });
  });
};
const pageFetcher = () => {
  const input = process.argv.slice(2);
  const [server, loc] = [input[0], input[1]];
  const notes = './index.html'
  let locf = loc.toLowerCase();
  const filename = path.basename(notes);
  const filedir = path.dirname(notes)
  if (((path.basename(locf) === filename) && (path.dirname(locf) === filedir)) === false) {
            console.log(' Path inserted!!!! is wrong!!!')
            process.exit()
          } else {
            if (fs.existsSync(locf)) {
              rl.question(`${locf} already exist, do you want to continue? (press y or Y)`
                , (answer) => {
                  if (answer.toLocaleLowerCase() === 'y') {
                    getResource(server, locf);
            }})}
            else {
              getResource(server, locf);
            }
          };
        };

pageFetcher();