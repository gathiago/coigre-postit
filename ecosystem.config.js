module.exports = {
  apps: [
    {
      name: 'coigre-postit',
      script: 'node_modules/.bin/next',
      args: 'start -p 3012',
      cwd: '/home/isa/web/postit.isabevilaqua.com/public_html',
      env: {
        NODE_ENV: 'production',
        PORT: 3012,
        DB_HOST: 'localhost',
        DB_PORT: 3306,
        DB_USER: 'isa_shwit',
        DB_PASSWORD: 'q|}?Y0wLT3MC6@{o',
        DB_NAME: 'isa_postdoit',
      },
    },
  ],
};
