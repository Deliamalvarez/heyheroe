import { Router, Request, Response, NextFunction } from 'express';
import {CategoryController}  from '../controllers/category.controller';

class CategoryRouter {
    public router: Router
    constructor() {
        this.router = Router();
    }

    init(){
        this.router.get('/', CategoryController.getAllCategories);
        this.router.get('/:id', CategoryController.getCategoryById);
        this.router.post('/', CategoryController.createCategory);
        this.router.put('/', CategoryController.updateCategory);
    }
}

const categoryRoutes = new CategoryRouter();
categoryRoutes.init();
export default categoryRoutes.router;