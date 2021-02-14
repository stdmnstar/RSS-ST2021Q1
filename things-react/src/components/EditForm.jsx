import React, { useState } from 'react';

function EditForm({ thing, submitEditThing, cancelEditThing }) {
    const [editInput, setEditInput] = useState(thing.name);
  
    const handleChange = (e) => {
        setEditInput(e.currentTarget.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitEditThing(editInput);
        setEditInput('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    return (
        <React.Fragment>
            <form className="edit-form" onSubmit={handleSubmit}>
                <input
                    value={editInput}
                    type="text"
                    onChange={handleChange}
                    onKeyDown={handleKeyPress}
                    placeholder=""
                />
                <button className="add-btn">Submit</button>
            </form>
            <div className="cancel-btn" onClick={() => cancelEditThing()}>
                Cancel
             </div>
        </React.Fragment>
    );
}

export default EditForm;
