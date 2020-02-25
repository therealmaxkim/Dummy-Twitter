const React = require("react");
const ClockFace = require("./ClockFace");
const TwitterForm = require("./TwitterForm");
const TwitterList = require("./TwitterList");
const TwitterSearch = require("./TwitterSearch");
const style = require("../../public/style.css");

/* the main page for the index route of this app */
const RootComponent = function() {

  const [tweets, setTweets] = React.useState([]);

  const fetchTweets = async () => {
    const response = await fetch("api/tweets");
    const body = await response.json();
    setTweets(body);
  }

  //calls the endpoint to search for a user's tweets, and sets that to the list body.
  const searchTweets = async (name) => {
    const response = await fetch("user/"+name.user);
    const body = await response.json();
    setTweets(body);
  }

  //calls the endpoint to delete a specific tweet identified by user&msg, and updates list body.
  const deleteTweets = async (user, message) => {
    const response = await fetch('/user', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(({user, message})),
    });
    if (response.status === 200) {
        fetchTweets();
    }
  }

  //only run when specific states in the [] change. But here it is empty so it will only run once.
  //running within the browser, not on the server
  //declare as async because we are using fetch 
  // When this component loads, fetch tweets from the API
  React.useEffect(() => {
    fetchTweets();
  }, []); // Remember, an empty array as the second argument means "just do this once"


  return (
    <div>
      <h1>Hello! Welcome to Dummy Twitter!</h1>

      <p>You can search for a someone's tweet, or send out your own!</p>

      <TwitterSearch onSearched={searchTweets} reset={fetchTweets}/>
      <TwitterForm onTweeted={fetchTweets}/>
      <TwitterList tweets={tweets} onDelete={deleteTweets}/>
    </div>
  );
}

module.exports = RootComponent;