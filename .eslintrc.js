module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "plugins": [
    "react-hooks"
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/jsx-filename-extension": 0,
    "no-console": 0,
    "react/no-array-index-key": 0,
    "no-nested-ternary": 0
  },
  "globals":{
    "document": true
  },
  "env": {
    "browser": true,
    "node": true,
    "jasmine": true
  }
};