function getIssues() {
  const repo = 'kaileighrose/javascript-fetch-lab'
  fetch('https://api.github.com/' + 'repos/' + repo + '/issues')
    .then(res => res.json())
    .then(json => showIssues(json));
}

function showIssues(json) {
  var source = document.getElementById('issues-template').innerHTML;
  var template = Handlebars.compile(source);
  for (var i = 0; i < json.length; i++) {
    var context = {title: json[i].title, body: json[i].body};
    var html = template(context);
  }
}

function createIssue() {
  const token = getToken();
  const postData = {
    title: 'test',
    body: 'test body'
  };
  const repo = 'kaileighrose/javascript-fetch-lab'
  fetch('https://api.github.com/' + 'repos/' + repo + '/issues', {
  method: 'POST',
  body: JSON.stringify(postData),
  headers: {
    Authorization: `token ${token}`
  }
})
    .then(getIssues());
}

function showResults(json) {
  var sourceResults = document.getElementById('repo-template').innerHTML;
  var templateResults = Handlebars.compile(sourceResults);
  var context = {html_url: json.html_url, full_name: json.full_name};
  var html = templateResults(context);
}

function forkRepo() {
  const token = getToken();
  const repo = 'learn-co-curriculum/javascript-fetch-lab'
  fetch('https://api.github.com/' + 'repos/' + repo + '/forks', {
  method: 'POST',
  headers: {
    Authorization: `token ${token}`
  }
})
    .then(res => res.json())
    .then(json => showResults(json));

}

function getToken() {
  //change to your token to run in browser, but set
  //back to '' before committing so all tests pass
  return ''
}
