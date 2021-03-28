function Thing({ thing, editThing, removeThing }) {
    const {name, id} = thing;
    return (
        <div className="item-thing">
            <div className="item-text">
                {name}
            </div>
            <div className="edit-btn" onClick={() => editThing(thing)}>
                Edit
            </div>
            <div className="delete-btn" onClick={() => removeThing(id)}>
                Del
            </div>
        </div>
    );
}

export default Thing;
