import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventModel, { IEvent } from './models/Event';

class EventService {

    async getEventById(id: string): Promise<IEvent | null> {
        return await EventModel.findById(id).exec();
    }

    async getEvents(city?: string, page: number = 1, limit: number = 10): Promise<{ events: IEvent[], totalPages: number, currentPage: number }> {
      const query = city ? { city } : {};
  
      try {
          const events = await EventModel.find(query)
              .limit(limit)
              .skip((page - 1) * limit)
              .exec();
  
          const count = await EventModel.countDocuments(query);
  
          return {
              events: events, 
              totalPages: Math.ceil(count / limit),
              currentPage: page,
          };
      } catch (error: any) {
          console.error('Error fetching events:', error.message);
          throw error;
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
