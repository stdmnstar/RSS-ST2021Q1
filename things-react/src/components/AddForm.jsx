import { useState } from 'react';

function AddForm({ addThing }) {
    const [thingInput, setThingInput] = useState('');

    const handleChange = (e) => {
        setThingInput(e.currentTarget.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addThing(thingInput);
        setThingInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                value={thingInput}
                type="text"
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                placeholder="Add new thing..."
            />
            <button className="add-btn">Add</button>
        </form>
    );
}

export default AddForm;
