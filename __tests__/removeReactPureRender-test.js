const defineTest = require('jscodeshift/dist/testUtils').defineTest;

defineTest(__dirname, 'removeReactPureRender', null, 'removeReactPureRender');
defineTest(__dirname, 'removeReactPureRender', null, 'removeReactPureRender.withSCU');
