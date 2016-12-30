const proxyquire = require('proxyquire');

describe('scrapeForum()', () => {
    let scrapeForum;
    let xrayMock, xQueryMock;

    let xQueryStub, xrayStub;

    beforeEach(() => {
        xQueryMock = (cb) => cb(null, [{title: 'Test', postedBy: 'some guy'}]);
        xrayMock = () => xQueryMock;

        xrayStub = sinon.spy(xrayMock);
        xQueryStub = sinon.spy(xQueryMock);

        scrapeForum = proxyquire('./scrapeForum', {'x-ray': () => xraySpy}).scrapeForum;
    });

    it('should pass a sanity check', () => {
        //TODO: fix.  no clue how to use spies with sinon, apparently.
        let myFunc = () => {};
        let mySpy = sinon.spy(myFunc);
        console.log(mySpy);
        expect(mySpy).to.have.callCount(0);
        myFunc();
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