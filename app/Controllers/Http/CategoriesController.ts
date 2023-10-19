import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category';
import { schema } from '@ioc:Adonis/Core/Validator'

export default class CategoriesController {

    public async create({request, response}: HttpContextContract){
    
        await request.validate({
            schema: schema.create({
                name: schema.string(),
            }),

            messages: {
                'name.required': 'Name is required',
            }
            });

            try{
                const category  = new Category();
                category.name = request.input('name');

                await category.save();
                return response.status(201).json(category);
            }

            catch(error){
                return response.status(400).json(error);
            }
    }

    public async index({response}: HttpContextContract){
        try{
            const categories = await Category.all();
            return response.status(200).json(categories);
        }
        catch(error){
            return response.status(400).json(error);
        }
    }
}
