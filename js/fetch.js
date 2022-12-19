async function getInfo(){
   const dataUrl = 'https://dummyjson.com/products?limit=100'
   const response = await fetch(dataUrl, {
      method: 'GET',
   });
   const responseResult = await response.json();
   
   if(response.ok){
      getProduct(responseResult);
   } else {
      alert('ERROR')
   }
}

getInfo()