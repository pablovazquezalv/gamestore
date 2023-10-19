import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Videogame from 'App/Models/Videogame';
export default class VideogamesController {

    public async create({request, response}: HttpContextContract){
    
        await request.validate({
            schema: schema.create({
                name: schema.string(),
                description: schema.string(),
                image: schema.string(),
                price: schema.number(),
                category_id: schema.number(),
            }),

            messages: {
                'name.required': 'Name is required',
                'description.required': 'Description is required',
                'image.required': 'Image is required',
                'price.required': 'Price is required',
                'category_id.required': 'Category is required',
            }
            });


            try{
                const videogame  = new Videogame();
                videogame.name = request.input('name');
                videogame.description = request.input('description');
                videogame.image = request.input('image');
                videogame.price = request.input('price');
                videogame.category_id = request.input('category_id');

                await videogame.save();
                return response.status(201).json(videogame);

            }
            catch(error){
                return response.status(400).json(error);
            }

    }

    public async index({response}: HttpContextContract){
        try{
        
            const videogames = await Videogame.all();

            return response.status(200).json(videogames);


        }
        catch(error){
            return response.status(400).json(error);
        } 
    }   
}
