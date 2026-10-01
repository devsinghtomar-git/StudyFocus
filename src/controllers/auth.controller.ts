import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { registerSchema, loginSchema } from '../validators/auth.validator';
import { z } from 'zod';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const validatedData = registerSchema.parse(req.body);
      const result = await AuthService.register(validatedData);
      
      res.status(201).json({
        success: true,
        message: 'Account created successfully',
        token: result.token,
        user: result.user
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: error.errors[0].message });
      } else {
        res.status(400).json({ success: false, message: error.message || 'Registration failed' });
      }
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const result = await AuthService.login(validatedData);
      
      res.status(200).json({
        success: true,
        token: result.token,
        user: result.user
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: error.errors[0].message });
      } else {
        res.status(401).json({ success: false, message: error.message || 'Login failed' });
      }
    }
  }

  static async me(req: Request, res: Response) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }
      
      const user = await AuthService.getUserById(userId);
      res.status(200).json({
        success: true,
        user
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message || 'Failed to fetch user' });
    }
  }
}
