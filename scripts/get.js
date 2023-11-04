async function add() {
    var country = "Sudan"
    // country = form.value
    var url = "http://restcountries.com/v3.1/name/" + country + "?fields=name"
    console.log(url)

    fetch(url, { mode: 'no-cors'}) 
      .then(response => { 
        try {
        if (response.ok) { 
          return response.json(); // Parse the response data as JSON 
        } else { 
          throw new Error('API request failed'); 
        } 
        } catch(Error){
          console.log("Abdo error")
        }
      }) 
      .then(data => { 
        // Process the response data here 
        console.log(data); // Example: Logging the data to the console 
      }) 
    
    
}


async function getRequest(){
  var country = "sudan"
  // country = form.value
  var url = "http://restcountries.com/v3.1/name/" + country + "?fields=name"
  console.log(url)
  const response = await fetch("https://httpbin.org/ip");
  const movies = await response.json();
  console.log(movies);
  
  
}
console.log("hello1")
getRequest()
console.log("here")