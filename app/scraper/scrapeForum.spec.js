const proxyquire = require('proxyquire');
"use strict";

describe('scrapeForum()', () => {
    let scrapeForum;
    let xrayMock = () => () => {};
    let xrayFactoryMock = () => xrayMock;
    let xraySpy;

    beforeEach(() => {
        xraySpy = sinon.spy(xrayMock);
        scrapeForum = proxyquire('./scrapeForum.js', {
            'x-ray': xrayFactoryMock,
        }).scrapeForum;
    });

    it('should return a promise', () => {
        const scrapePromise = scrapeForum('marauder', 'marauder');
        expect(scrapePromise.then).to.be.a('function');
    });
    it('should call x-ray with the proper scope', () => {
        const urls = require('../utils/urls');
        const postSchema = require('../scraper/postschema');
        let forumId = 'marauder';
        scrapeForum(forumId, 'marauder');
        expect(xraySpy).to.have.been.calledWith(`${urls.base}${urls.forum}${forumId}`, 'td.thread', postSchema);
    });
    it('should resolve and call shapeForumResults');
});