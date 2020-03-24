
let shortUrl =
{
  "orig": "http://this is some long url",
  "short": "https://nextId",
  "stats": {
    "createdOn": "TODO",
    "expiresOn": "TODO",
    "accesses": {
      "last": "TODO",
      "total": "TODO"
    }
  }
}

let all = [
  {
    "orig": "http://this is some long url1",
    "short": "https://nextId",
    "stats": {
      "createdOn": "TODO",
      "expiresOn": "TODO",
      "accesses": {
        "last": "TODO",
        "total": "TODO"
      }
    }
  },
  {
    "orig": "http://this is some long url2",
    "short": "https://nextId",
    "stats": {
      "createdOn": "TODO",
      "expiresOn": "TODO",
      "accesses": {
        "last": "TODO",
        "total": "TODO"
      }
    }
  },
  {
    "orig": "http://this is some long url3",
    "short": "https://nextId",
    "stats": {
      "createdOn": "TODO",
      "expiresOn": "TODO",
      "accesses": {
        "last": "TODO",
        "total": "TODO"
      }
    }
  }

];

function getShortUrl(url, desired) {
  console.log("POsting..");
  return fetch('/api/shorts', {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      {
        url: url,
        desired: desired
      }
    )
  }).then(res => { 
    if (!res.ok) {
      console.log("ERRRRRRRRRRRRR")
      throw Error(res.statusText);
    }
    return res.json();
  })

}

function getAll() {
  console.log("Fetching")
  return fetch('/api/shorts')
    .then(response => response.json());
}

export { getShortUrl, getAll };