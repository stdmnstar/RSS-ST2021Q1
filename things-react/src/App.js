import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddForm from './components/AddForm';
import EditForm from './components/EditForm';
import Thing from './components/Thing';
import { getAllThigsApi, addThingApi, editThingApi, removeThingApi } from './api';

function App() {
    const [things, setThings] = useState([]);
    const [isShowEditInput, setIsShowEditInput] = useState(false);
    const [thing, setThing] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(async () => {
        const result = await getAllThigsApi();
        setIsLoaded(true);
        setThings(result);
    }, []);

    const addThing = async (thingInput) => {
        if (!thingInput) {
            return
        }

        const newItem = {
            id: uuidv4(),
            name: thingInput,
        };

        await addThingApi(newItem);
        setIsLoaded(true);
        setThings([...things, newItem]);
    };

    const editThing = (thing) => {
        if (isShowEditInput) {
            return;
        }
        setThing(thing);
        setIsShowEditInput(true);
    };

    const submitEditThing = async (name) => {
        setIsShowEditInput(false);
        if (!name || (name === thing.name)) {
            return;
        }

        const newItem = { ...thing, name };
        await editThingApi(thing.id, newItem);
        setIsLoaded(true);
        const newThings = things.map((item) => item.id === thing.id ? newItem : item);        
        setThings(newThings);
    };

    const cancelEditThing = () => {
        setIsShowEditInput(false);
    };

    const removeThing = async (id) => {
        await removeThingApi(id);
        setIsLoaded(true);
        const newThings = things.filter((item) => item.id !== id);       
        setThings(newThings);
    };

    if (!isLoaded) {
        return <h3>Loading...</h3>;
    };

    return (
        <div className="App">
            <header>
                <h2>Things list: {things.length}</h2>
            </header>
            <AddForm addThing={addThing} />
            {isShowEditInput && <EditForm
                thing={thing}
                submitEditThing={submitEditThing}
                cancelEditThing={cancelEditThing}
            />}
            {things.map((thing) => {
                return (
                    <Thing
                        key={thing.id}
                        thing={thing}
                        editThing={editThing}
                        removeThing={removeThing}
                    />
                )
            })}
        </div>
    );
}

export default App;
