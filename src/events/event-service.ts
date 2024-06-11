import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventModel, { IEvent } from './models/Event';

class EventService {

    async getEventById(id: string): Promise<IEvent | null> {
        return await EventModel.findById(id).exec();
    }

    async getEvents(city?: string, page = 1, limit = 10, sortBy?: string, sortDirection?: string): Promise<{ events: IEvent[]; totalPages: number; currentPage: number; }> {
      const options: any = {};

      if (city) {
          options.city = city;
      }

      const sortOptions: any = {};
      if (sortBy && ['name', 'date', 'rating'].includes(sortBy)) {
          sortOptions[sortBy] = sortDirection === 'desc' ? -1 : 1;
      }

      const count = await EventModel.countDocuments(options);
      const totalPages = Math.ceil(count / limit);
      const currentPage = page;

      const events = await EventModel.find(options)
          .sort(sortOptions)
          .skip((page - 1) * limit)
          .limit(limit)
          .exec();

      return { events, totalPages, currentPage };
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
