/**
 * SVG Toolkit Alfred Workflow
 * Author: Rick McGavin
 */

// Get svgo
const SVGO = require('svgo');

svgo = new SVGO({
  plugins: [{
    cleanupAttrs: true,
  }, {
    removeDoctype: true,
  },{
    removeXMLProcInst: true,
  },{
    removeComments: true,
  },{
    removeMetadata: true,
  },{
    removeTitle: true,
  },{
    removeDesc: true,
  },{
    removeUselessDefs: true,
  },{
    removeEditorsNSData: true,
  },{
    removeEmptyAttrs: true,
  },{
    removeHiddenElems: true,
  },{
    removeEmptyText: true,
  },{
    removeEmptyContainers: true,
  },{
    removeViewBox: false,
  },{
    cleanupEnableBackground: true,
  },{
    convertStyleToAttrs: true,
  },{
    convertColors: true,
  },{
    convertPathData: true,
  },{
    convertTransform: true,
  },{
    removeUnknownsAndDefaults: true,
  },{
    removeNonInheritableGroupAttrs: true,
  },{
    removeUselessStrokeAndFill: true,
  },{
    removeUnusedNS: true,
  },{
    cleanupIDs: true,
  },{
    cleanupNumericValues: true,
  },{
    moveElemsAttrsToGroup: true,
  },{
    moveGroupAttrsToElems: true,
  },{
    collapseGroups: true,
  },{
    removeRasterImages: false,
  },{
    mergePaths: true,
  },{
    convertShapeToPath: true,
  },{
    sortAttrs: true,
  },{
    removeDimensions: true,
  },{
    removeAttrs: {attrs: '(stroke|fill)'},
  }]
});

// Get only the arguments passed in by the user
const passedArgs = process.argv.slice(2);
// Assign the value passed in by user to the query variable
const query = passedArgs[0];
// empty array to hold alfred objects
const items = [];

// create css property function
const createCssProperty = svg => {
  return `background-image: url('data:image/svg+xml;utf8,${svg}');`;
};

// create aflred object function
const pushToItemsArray = (title, output) => {
  const obj = {
    title: title,
    arg: output,
  }
  items.push(obj);
};

// compress svg
const compressSvg = query => {
  svgo.optimize(query)
  .then(result => {
    const title = 'Compressed SVG';
    pushToItemsArray(title, result.data);
  });
}

// no encoded css property
const noEncodedCssProperty = query => {
  const property = createCssProperty(query);
  const title = 'No encoded CSS SVG';
  pushToItemsArray(title, property);
};

// url encoded css property
const urlEncodedCssProperty = query => {
  const encodedSvg = encodeURIComponent(query);
  const property = createCssProperty(encodedSvg);
  const title = 'URL Encoded CSS SVG';
  pushToItemsArray(title, property);
}

// base64 encoded css property
const base64EncodedCssProperty = query => {
  const buffer = new Buffer.from(query);
  const encodedSvg = buffer.toString('base64');
  const property = createCssProperty(encodedSvg);
  const title = 'Base 64 Encoded CSS SVG';
  pushToItemsArray(title, property);
}

// main functions to be called for the workflow
const init = () => {
  compressSvg(query);
  noEncodedCssProperty(query);
  urlEncodedCssProperty(query);
  base64EncodedCssProperty(query);
}
init();

// svgo is a promise that we need to wait for to send to alfred, so we use Promise.all
Promise.all([compressSvg]).then(() => {
  // create object that hold the items array to send to alfred
  const alfredObject = {items};
  // Log to the console and send to alfred
  console.log(JSON.stringify(alfredObject));
});

