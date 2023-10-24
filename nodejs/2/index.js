import got from 'got';

// Call web service and return total vehicles, (got is library to call url)
async function getTotalVehicles() {
  return got.get('https://api.artic.edu/api/v1/artworks/search');
}

// CHECKME: the problem was that we are returning something without solving the promise
// As 'many' is the default value, we think there are many, when it is not true, total is undefined
// Yet, I still encouraging to use async / await syntax and not callbacks
async function getPlurial() {
  let total;
  const result = await getTotalVehicles();
  const body = JSON.parse(result.body);
  total = body.pagination.total;
  if (total <= 0) {
      return 'none';
  }
  if (total <= 10) {
      return 'few';
  }
  return total;
}

console.log(await getPlurial());