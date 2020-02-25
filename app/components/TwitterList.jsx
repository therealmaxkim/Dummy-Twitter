const React = require("react");
const style = require("../../public/style.css");

function TwitterList(props) {

    const listComponents = props.tweets.map((tweet, idx) => {
        return (
            <li key={idx}>
                <div class="name">{tweet.user}</div> 
                <div class="tweet">{tweet.message}</div>
                <div class="delete">
                    <button onClick={() => props.onDelete(tweet.user, tweet.message)}>Delete</button>
                </div>
            </li>
        );
    });

    return (
        <ul> {listComponents} </ul>
    );
}

module.exports = TwitterList;