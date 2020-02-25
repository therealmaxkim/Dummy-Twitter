const React = require("react");
const qs = require("qs");
const style = require("../../public/style.css");


const TwitterForm = function(props) {

    const [user, setUser] = React.useState("");
    const [message, setMessage] = React.useState("");

    const updateUser = (event) => {
        setUser(event.target.value);
    }

    const updateMessage = (event) => {
        setMessage(event.target.value);
    }

    //call the endpoint to post a tweet, then update list body, then reset the input fields
    const asyncSubmit = async () => {
        const response = await fetch('/api/tweets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(({user, message})),
        });
        if (response.status === 200) {
            setUser("");
            setMessage("");
            if (props.onTweeted) props.onTweeted();
        }
    }

    const handleSubmit = (event) => {
        asyncSubmit();
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                User: 
                <input type="text" value={user} onChange={updateUser}/>
            </label>
            <label>
                Message: 
                <input type="text" value={message} onChange={updateMessage}/>
            </label>
            <input type="submit" value="Submit"/>
        </form>
    );
}

module.exports = TwitterForm;