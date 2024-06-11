import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventModel, { IEvent } from './models/Event';

class EventService {

    async getEventById(id: string): Promise<IEvent | null> {
        return await EventModel.findById(id).exec();
    }

    async getEvents(city?: string): Promise<IEvent[]> {
        if (city) {
            console.log(`Finding events for city: ${city}`);
            const events = await EventModel.find({ city }).exec();
            console.log(`Found events for city ${city}:`, events);
            return events;
        } else {
            console.log('Finding all events');
            const events = await EventModel.find().exec();
            console.log('Found all events:', events);
            return events;
        }
    }

    async createEvent(createEventDto: CreateEventDto): Promise<IEvent> {
        const { name, description, date, location, duration, city } = createEventDto;
        const newEvent = new EventModel({
            name,
            description,
            date: new Date(date),
            location,
            duration,
            city,
        });

        await newEvent.save();
        return newEvent;
    }
}

export default EventService;
