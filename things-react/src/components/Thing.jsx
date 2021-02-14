function Thing({ thing, editThing, removeThing }) {
    return (
        <div className="item-thing">
            <div className="item-text">
                {thing.name}
            </div>
            <div className="edit-btn" onClick={() => editThing(thing)}>
                Edit
            </div>
            <div className="delete-btn" onClick={() => removeThing(thing.id)}>
                Del
            </div>
        </div>
    );
}

export default Thing;
