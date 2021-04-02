// Import Terser so we can use it
const { minify } = require('terser');

// Import fs so we can read/write files
const fs = require('fs');
const path = require('path');

const dirSrcJs = path.join(__dirname, 'src/js/');
const dirDestJs = path.join(__dirname, 'dist/js/');

const dirSrcUtils = path.join(__dirname, 'src/utils/');
const dirDestUtils = path.join(__dirname, 'dist/utils/');

fs.readdir(dirSrcJs, function(err, files) {
  if (err) {
    console.log('Error in dir files '+err);
  }

  files.forEach(async function(file) {
    console.log('file = ', file);
    console.log('test if js file is =',/.js$/.test(file));

    if (/.js$/.test(file) && file !== "minifyAll.js") {
      await doMinDirJs(file);
    }
  });
});

fs.readdir(dirSrcUtils, function(err, files) {
  if (err) {
    console.log('Error in dir files '+err);
  }

  files.forEach(async function(file) {
    console.log('file = ', file);
    console.log('test if js file is =',/.js$/.test(file));

    if (/.js$/.test(file) && file !== "minifyAll.js") {
      await doMinDirUtils(file);
    }
  });
});

// Define the config for how Terser should minify the code
// This is set to how you currently have this web tool configured
const config = {
  compress: {
    dead_code: true,
    drop_console: false,
    drop_debugger: true,
    keep_classnames: false,
    keep_fargs: true,
    keep_fnames: false,
    keep_infinity: false
  },
  mangle: {
    eval: false,
    keep_classnames: false,
    keep_fnames: false,
    toplevel: false,
    safari10: false
  },
  module: false,
  sourceMap: false,
  output: {
    comments: 'some'
  }
};

async function doMinDirJs(file) {
  // Minify the code with Terser
  const code = fs.readFileSync(dirSrcJs + file, 'utf8');

  const minified = await minify(code, config);

  // Save the code!
  fs.writeFileSync(`${dirDestJs}${file}`, minified.code);
}

async function doMinDirUtils(file) {
  // Minify the code with Terser
  const code = fs.readFileSync(dirSrcUtils + file, 'utf8');

  const minified = await minify(code, config);

  // Save the code!
  fs.writeFileSync(`${dirDestUtils}${file}`, minified.code);
}
