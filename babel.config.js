module.exports = {
  presets: [
    ['@babel/preset-env', { loose: true }],
    'nano-react-app',
    ['@babel/preset-react', { runtime: 'automatic' }],
  ]
}