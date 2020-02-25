const React = require("react");
const qs = require("qs");
const style = require("../../public/style.css");

function TwitterSearch(props) {

    const [user, setUser] = React.useState("");

    const updateUser = (event) => {
        setUser(event.target.value);
    }

    //reset the user input and update the list body to the filtered results
    const asyncSubmit = async () => {
        setUser("");
        if (props.onSearched) props.onSearched({user});
    }

    const handleSubmit = (event) => {
        asyncSubmit();
        event.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Type a name here to filter: 
            </label>
            <label>
                <input type="text" value={user} onChange={updateUser}/>
            </label>
            <input type="submit" value="Search"/>
            <button onClick={props.reset}>Reset filter</button>
        </form>
    );
}

module.exports = TwitterSearch;