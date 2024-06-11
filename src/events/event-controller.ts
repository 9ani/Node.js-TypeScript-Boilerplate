import { Request, Response } from 'express';
import { CreateEventDto } from './dtos/CreateEvent.dot';
import EventService from './event-service';
import { IUser } from '../auth/models/User';
import EventModel, { IEvent } from './models/Event';
class EventController {
    private eventService : EventService;


    constructor(eventService : EventService){
        this.eventService = eventService;
    }

    createEvent = async (req: Request, res: Response): Promise<void> => {
        try {
          const createEventDto: CreateEventDto = req.body;
          const event = await this.eventService.createEvent(createEventDto);
          res.status(201).json(event);
        } catch (error: any) {
          res.status(500).send({ error: error.message });
        }
      }



    // getEvents = async (req: Request, res: Response): Promise<void> => {
    //     try {
    //       const events = await this.eventService.getEvents();
    //       res.status(200).json(events);
    //     } catch (error: any) {
    //       res.status(500).send({ error: error.message });
    //     }
    //   }
    getEvents = async (req: Request, res: Response): Promise<void> => {
      try {
        console.log('Fetching events...');
  
        let events: IEvent[];
  
        if ((req as any).user) {
          const user = (req as any).user as IUser;
  
          console.log(`Fetching events for city: ${user.city}`);
          events = await this.eventService.getEvents(user.city);
          console.log(`Fetched events for city ${user.city}:`, events);
        } else {
          console.log('Fetching all events');
          events = await this.eventService.getEvents();
          console.log('Fetched all events:', events);
        }
  
        console.log('Events fetched successfully');
        res.status(200).json(events);
      } catch (error: any) {
        console.error('Error fetching events:', error.message);
        res.status(500).json({ error: error.message });
      }
    }
    


    getEventById = async (req: Request, res: Response): Promise<void> => {
        try {
          const { id } = req.params;
          const event = await this.eventService.getEventById(id);
          if (!event) {
            res.status(404).json({ message: 'Event not found' });
            return;
          }
          res.status(200).json(event);
        } catch (error: any) {
          res.status(500).send({ error: error.message });
        }
      }
}

export default EventController;