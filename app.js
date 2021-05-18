const phrase = {
  development: {
    msg: 'dev',
  },
  production: {
    msg: 'prod',
  },
};

const env = process.env.NODE_ENV;
console.log(phrase[env].msg);
