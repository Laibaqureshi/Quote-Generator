const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('New-Quote');
const loader=document.getElementById('loader');
let apiQuotes=[];
// show loading

function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
// Hide Loading
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}
// show new Quotes
function newQuote() {

  loading();
//pick a random quote from apiQUote
const quote=apiQuotes[Math.floor(Math.random()*apiQuotes.length)]
authorText.textContent=quote.author;
//chk if author feild is blank
if(!quote.author){
        authorText.textContent= '-Anonymous';
     }else{
         authorText.innerText=quote.author;
     }
// console.log(quote);


     if(quote.text.length > 50){
          quoteText.classList.add('long-quote');
      } else{
          quoteText.classList.remove('long-quote');
      } 
      // Set Quote, Hide Loader
      quoteText.textContent=quote.text;
      complete();

    }

//Get Quote From API
async function getQuotes() {
   loading();
  //proxyUrl='https://cors-anywhere.herokuapp.com/'  ;
 const apiUrl='https://type.fit/api/quotes'   ;
 try{
     const response=await fetch(apiUrl);
     apiQuotes=await response.json();
    //const data=await response.json();
    // if author is blank add anonymous
    //  if(data.quoteAuthor===''){
    //     authorText.innerText='Anonymous';
    //  }else{
    //      authorText.innerText=data.quoteAuthor;
    //  }
     // Reducee font size for long quotes
    //  if(data.text.length > 50){
    //      text.classList.add('long-quote');
    //  } else{
    //      text.classList.remove('long-quote');
  
   //  authorText.innerText=data.quoteTexts;
     //quoteText.innerText=data.quoteText;
    //console.log(apiQuotes[12]);
      newQuote();

} 
 catch (error){
     getQuotes();
 //console.log('whoops, no quote',error);

 }
}
// Tweet Quote
function tweetQuote () {
 const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
 window.open(twitterUrl,'_blank');
}
//Event Listerners
newQuoteBtn.addEventListener('click',newQuote)
twitterBtn.addEventListener('click',tweetQuote);
// On Load
getQuotes();
