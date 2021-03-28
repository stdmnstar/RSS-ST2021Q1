function addEventListener(eventTarget, eventName, eventHandler, options = {once: false}) {
    const eventsHandlers = `${eventName}Handlers`;
    
    if (!eventTarget[eventsHandlers]) {
        eventTarget[eventsHandlers] = [];
    }

    eventHandler.once = options.once;
    eventTarget[eventsHandlers].push(eventHandler);

    eventTarget['on' + eventName] = () => {
        const arrayEventsHandlers = eventTarget[eventsHandlers];
        for (let i = 0; i < arrayEventsHandlers.length; i++) {
            arrayEventsHandlers[i]();
            
            if (arrayEventsHandlers[i].once) {
                arrayEventsHandlers.splice(i--, 1);               
            }
        }
    };
}

function removeEventListener(eventTarget, eventName, eventHandler) {
    const eventsHandlers = `${eventName}Handlers`;
    const index = eventTarget[eventsHandlers].indexOf(eventHandler);

    if (index > -1) {
        eventTarget[eventsHandlers].splice(index, 1);
    }
}
