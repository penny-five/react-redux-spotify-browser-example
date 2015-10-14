import jsdom from 'jsdom';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

global.expect = chai.expect;
global.stub = sinon.stub;
global.spy = sinon.spy;

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;

Object.keys(window).forEach(key => {
    if (!(key in global)) {
        global[key] = window[key];
    }
});