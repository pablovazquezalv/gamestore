import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Cart from 'App/Models/Cart';

export default class CartsController {

    public async create({request, response, auth}: HttpContextContract){
            try{

                const user = await auth.authenticate();

                const car  = new Cart();
                car.identification = Math.floor(Math.random() * 1000000);
                car.user_id = user.id;
                car.videogame_id = request.input('videogame_id');
                
                await car.save();
                return response.status(201).json(car);

            }
            catch(error){
                return response.status(400).json(error);
            }
        }

    public async videogameToUser({response, auth}: HttpContextContract){
        try{
            const user = await auth.authenticate();
            const cart = await Cart.findBy('user_id', user.id);
            return response.status(200).json(cart);
        }
        catch(error){
            return response.status(400).json(error);
        }
    }
}
