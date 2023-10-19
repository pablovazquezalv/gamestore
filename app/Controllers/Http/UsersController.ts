import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User';

export default class UsersController {

    public async register({request, response}: HttpContextContract){
        
        await request.validate({
            schema: schema.create({
                username: schema.string(),
                email: schema.string(),
                password: schema.string(),
                phone: schema.number(),
            }),

            messages: {
                'username.required': 'Name is required',
                'email.required': 'Email is required',
                'password.required': 'Password is required',
                'phone.required': 'Phone is required',
            }
            });

            try{
                const user  = new User();
                user.username = request.input('username');
                user.email = request.input('email');
                user.password = request.input('password');
                user.phone = request.input('phone');

                await user.save();
                return response.status(201).json(user);
            }

            catch(error){
                return response.status(400).json(error);
            }
    }

    public async login({request, response, auth}: HttpContextContract){

        await request.validate({
            schema: schema.create({
                email: schema.string(),
                password: schema.string(),
            }),

            messages: {
                'email.required': 'Email is required',
                'password.required': 'Password is required',
            }
            });

        try{
            const email = request.input('email');
            
            const user = await User.findBy('email', email);

            if(!user){
                return response.status(404).json({data: 'Resource not found'});
            }
            else{
                const password = request.input('password');
                const passwordCheck = await auth.use('api').attempt(email, password);
                return response.status(200).json(passwordCheck);
            }

        }
        catch(error){
            return response.status(400).json(error);
        }
    }

    public async logout({response, auth}: HttpContextContract){
        try{
            await auth.use('api').logout();
            return response.status(200).json({data: 'Logout successful'});
        }
        catch(error){
            return response.status(400).json(error);
        }
    }



}
