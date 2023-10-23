import got from 'got';

// Call web service and return count user, (got is library to call url)
async function getCountUsers() {
  return got.get('https://api.artic.edu/api/v1/artworks/search');
}

// Add total from service with 20
async function computeResult() {
  // CHECKME: await was missing
  const result = await getCountUsers();
  const body = JSON.parse(result.body);
  return body.pagination.total + 20;
}

console.log(await computeResult());