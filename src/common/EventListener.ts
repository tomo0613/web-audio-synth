type VoidFnc = (...args: any[]) => void;

export default class EventListener<EventType extends string | number, HandlerType extends VoidFnc = VoidFnc> {
    private listeners: Map<EventType, Set<HandlerType>> = new Map();

    add(eventType: EventType, listener: HandlerType) {
        if (!listener) {
            throw new Error(`EventListener->add($listener) Invalid $listener: ${listener}, with type ${eventType}`);
        }
        const listeners = this.listeners.get(eventType);

        if (listeners) {
            listeners.add(listener);
        } else {
            const listeners = new Set([listener]);

            this.listeners.set(eventType, listeners);
        }
    }

    remove(eventType: EventType, listener: HandlerType) {
        const listeners = this.listeners.get(eventType);

        listeners?.delete(listener);

        if (!listeners?.size) {
            this.listeners.delete(eventType);
        }
    }

    clear() {
        this.listeners.clear();
    }

    dispatch(eventType: EventType, ...args: Parameters<HandlerType>) {
        const listeners = this.listeners.get(eventType);

        listeners?.forEach((listener) => listener(...args));
    }
}
