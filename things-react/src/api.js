export async function getAllThigsApi() {
    const response = await fetch('https://desolate-fortress-20112.herokuapp.com/api/v1/things');
    return response.json();
};

export async function addThingApi(newItem) {
    const response = await fetch('https://desolate-fortress-20112.herokuapp.com/api/v1/things', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newItem)
    });
    return response.json();
};

export async function editThingApi(id, newItem) {
    const response = await fetch(`https://desolate-fortress-20112.herokuapp.com/api/v1/things/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(newItem)
    });
    return response.json();
};

export async function removeThingApi(id) {
    const response = await fetch(`https://desolate-fortress-20112.herokuapp.com/api/v1/things/${id}`, {
        method: 'DELETE'
    });
    return response.json();
};
