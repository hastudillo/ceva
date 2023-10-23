import got from 'got';

// Call web service and return total vehicles, (got is library to call url)
async function getTotalVehicles() {
  return got.get('https://api.artic.edu/api/v1/artworks/search');
}
  
function getPlurial() {
  let total;
  // CHECKME: no big problem, but encourage to use async / await syntax and not callbacks
  getTotalVehicles().then(r => { 
    const body = JSON.parse(r.body);
    total = body.pagination.total;
  });
  if (total <= 0) {
      return 'none';
  }
  if (total <= 10) {
      return 'few';
  }
  return 'many';
}

console.log(getPlurial());