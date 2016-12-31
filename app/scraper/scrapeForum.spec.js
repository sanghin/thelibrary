const proxyquire = require('proxyquire');

describe('scrapeForum()', () => {
    let scrapeForum;
    let mocks = {};
    let xQuerySpy, xraySpy;

    beforeEach(() => {
        mocks = {
            xray: () => mocks.query,
            query: (cb) => cb(null, [{title: 'Test', postedBy: 'some guy'}])
        };

        xraySpy = sinon.spy(mocks, 'xray');
        xQuerySpy = sinon.spy(mocks, 'query');

        scrapeForum = proxyquire('./scrapeForum', {'x-ray': () => mocks.xray}).scrapeForum;
    });

    it('should pass a sanity check', () => {
        let spies = {
            myFunc: () => {}
        };
        let mySpy = sinon.spy(spies, 'myFunc');
        expect(mySpy).to.have.callCount(0);
        spies.myFunc();
        expect(mySpy).to.have.callCount(1);

    });

    it('should return a promise', () => {
        const scrapePromise = scrapeForum('marauder', 'marauder');
        expect(scrapePromise.then).to.be.a('function');
    });

    it('should call x-ray with the proper scope', () => {
        const urls = require('../utils/urls');
        const {postSchema,bodySchema} = require('../scraper/postschema');
        let forumId = '40';
        let forumTitle = 'duelist';
        let testUrl = `${urls.base}${urls.forum}${forumId}`;
        let testScope = 'td.thread';

        scrapeForum(forumId, forumTitle);
        expect(xraySpy).to.have.callCount(1);
        expect(xraySpy).to.have.been.calledWith(testUrl, testScope, postSchema);
    });

    it('should resolve and call shapeForumResults');
});