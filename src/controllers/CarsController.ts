import { Request, Response } from 'express';
import { MongoClient, ObjectId } from "mongodb";

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.8gga0.mongodb.net/${process.env.DB_TABLE}?retryWrites=true&w=majority`;

export default {
  async create(request: Request, response: Response){
    // Create a new car
    const client = new MongoClient(uri, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      forceServerObjectId: true,
    });
    
    const {
      marca,
      model,
      versao,
      ano,
      quilometragem,
      cambio,
      preco
    } = request.body;

    try {
      await client.connect();

      const database = client.db('carupi');
      const cars = database.collection('cars');

      const car = await cars.insertOne({
        marca,
        model,
        versao,
        ano,
        quilometragem,
        cambio,
        preco
      });

      return response.status(201).json(car.ops);
    } catch (err) {
      return response.status(500).json({ error: err.message });
    } finally {
      client.close();
    }
  },

  async read(request: Request, response: Response) {
    // List a specific car.
    const client = new MongoClient(uri, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      forceServerObjectId: true,
    });
    
    const { id } = request.params;
    
    try {
      await client.connect();

      const database = client.db('carupi');
      const cars = database.collection('cars');

      const specificCar = await cars.findOne({_id: new ObjectId(id)}).then(docs => {
        return docs;
      });
      
      return response.status(200).json(specificCar);
    } catch (err) {
      return response.status(404).json({ error: err.message });
    } finally {
      client.close();
    }
  },

  async update(request: Request, response: Response) {
    // Update a specific car.
    const client = new MongoClient(uri, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      forceServerObjectId: true,
    });

    const {
      marca,
      model,
      versao,
      ano,
      quilometragem,
      cambio,
      preco
    } = request.body;

    const { id } = request.params;

    try {
      await client.connect();

      const database = client.db('carupi');
      const cars = database.collection('cars');

      const updatedCar = await cars.findOneAndUpdate({
        _id: new ObjectId(id),
      }, { $set: {
        marca,
        model,
        versao,
        ano,
        quilometragem,
        cambio,
        preco
      }
      }).then(car => {
        return car
      });

      return response.status(200).json(updatedCar);
    } catch (err) {
      return response.status(404).json({ error: 'Car not found!' });
    } finally {
      client.close();
    }

  },

  async delete(request: Request, response: Response) {
    // Delete a car.
    const client = new MongoClient(uri, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      forceServerObjectId: true,
    });

    const { id } = request.params;

    try {
      await client.connect();

      const database = client.db('carupi');
      const cars = database.collection('cars');

      const deletedCar = await cars.findOneAndDelete({
        _id: new ObjectId(id),
      }).then(car => {
        return car;
      });

      return response.status(204).json({ message: 'Car was deleted'});
    } catch(err) {
      return response.status(400).json({ error: 'Bad request' });
    } finally {
      client.close();
    }
  },

  async index(request: Request, response: Response) {
    // List all cars.
    const client = new MongoClient(uri, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      forceServerObjectId: true,
    });

    try {
      await client.connect();

      const database = client.db('carupi');
      const cars = database.collection('cars');

      const car = await cars.find().toArray().then(items => {
        return items
      });
      
      await client.close();
      return response.json(car);
    } catch (err) {
      return response.status(404).json({ error: err.message });
    } finally {
      client.close();
    }
  },
}
