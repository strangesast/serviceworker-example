describe('service worker', function() {
  it('should have serviceWorker', function() {
    expect(navigator).to.have.property('serviceWorker');
  });
  it('should register serviceworker', function() {
    return registerWorker();
  });
  it('service should echo', function(done) {
    var TEST_MESSAGE = 'toast1';
    sendMessage({message: TEST_MESSAGE, type: 'ping'}).then(function(response) {
      console.log('response...', response);
      expect(response).to.be(TEST_MESSAGE);
      return;
    }).then(done, done);
  });
});
