import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AddForm from './components/AddForm';
import EditForm from './components/EditForm';
import Thing from './components/Thing';

function App() {
    const [things, setThings] = useState([]);
    const [isShowEditInput, setIsShowEditInput] = useState(false);
    const [thing, setThing] = useState({});
    const [update, setUpdate] = useState(false);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch('https://desolate-fortress-20112.herokuapp.com/api/v1/things')
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setThings(result);
                    setUpdate(!update);
                },
                (error) => {
                    setError(error);
                }
            )
    }, [update]);

    if (!isLoaded) {
        return <h3>Loading...</h3>;
    };

    if (error) {
        return <div>Error: {error.message}</div>;
    };

    const addThing = (thingInput) => {
        if (thingInput) {
            const newItem = {
                id: uuidv4(),
                name: thingInput,
            };

            fetch('https://desolate-fortress-20112.herokuapp.com/api/v1/things', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newItem)
            }).then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setUpdate(!update);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                );
        };
    };

    const editThing = (thing) => {
        if (isShowEditInput) {
            return;
        }
        setThing(thing);
        setIsShowEditInput(true);
    };

    const submitEditThing = (name) => {
        setIsShowEditInput(false);
        if (name === thing.name) {
            return;
        }

        if (name) {
            let index = -1;
            for (let i = 0; i < things.length; i++) {
                if (things[i].id === thing.id) {
                    index = i;
                    break;
                }
            }

            if (index > -1) {
                const newItem = { ...thing, name };
                fetch(`https://desolate-fortress-20112.herokuapp.com/api/v1/things/${thing.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(newItem)
                }).then(res => res.json())
                    .then(
                        (result) => {
                            setIsLoaded(true);
                            setUpdate(!update);
                        },

                        (error) => {
                            setIsLoaded(true);
                            setError(error);
                        }
                    );
            };
        };
    };

    const cancelEditThing = () => {
        setIsShowEditInput(false);
    };

    const removeThing = (id) => {
        fetch(`https://desolate-fortress-20112.herokuapp.com/api/v1/things/${id}`, {
            method: 'DELETE'

        }).then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setUpdate(!update);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );        
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
