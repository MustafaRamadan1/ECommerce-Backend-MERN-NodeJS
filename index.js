require('@babel/register')({
    ignore: [/(node_modules)/]
  });

  require('./src/server');
