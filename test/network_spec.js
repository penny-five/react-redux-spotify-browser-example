import { default as middleware } from '../src/middleware/network';

describe('network middleware', () => {
    let fetch, next, store;

    beforeEach(() => {
        global.fetch = fetch = stub();
        next = spy();
        store = { dispatch: spy() };
    });

    afterEach(() => {
        global.fetch = undefined;
    });

    it('should fetch if action has url property', () => {
        fetch.returns(Promise.resolve());

        const action = { url: 'test.com' };

        middleware(store)(next)(action);

        expect(fetch).to.have.been.calledOnce;
        expect(fetch).to.have.been.calledWith('test.com');
    });

    it('should skip if action url property is undefined', () => {
        fetch.returns(Promise.resolve());
        middleware(store)(next)({});

        expect(fetch).to.not.have.been.calledOnce;
    });

    it('should call next when action has url property', () => {
        fetch.returns(Promise.resolve());
        middleware(store)(next)({});

        expect(next).to.have.been.calledOnce;
    });

    it('should call next when action url property is undefined', () => {
        fetch.returns(Promise.resolve());
        middleware(store)(next)({});

        expect(next).to.have.been.calledOnce;
    });

    it('should call onSuccess with response JSON when fetch was successful', done => {
        const testResponse = { value: 'testResponse' };
        fetch.returns(Promise.resolve({ json: () => testResponse }));
        const action = {
            url: 'test.com',
            onSuccess: (res, dispatch) => {
                expect(res).to.equal(testResponse);
                expect(dispatch).to.equal(store.dispatch);
                done();
            }
        };
        middleware(store)(next)(action);
    });

    it('should call onFailure with thrown Error when fetch failed', done => {
        const testError = new Error();
        fetch.returns(Promise.reject(testError));
        const action = {
            url: 'test.com',
            onFailure: err => {
                expect(err).to.equal(testError);
                done();
            }
        };

        middleware(store)(next)(action);
    });
});