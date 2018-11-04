import { Router, Request, Response, NextFunction } from 'express';
import { ImageController } from '../controllers/image.controller';

class ImageRouter {
    public router: Router
    constructor() {
        this.router = Router();
    }

    init() {
        this.router.post('/', ImageController.createImg);
        this.router.get('/:id', ImageController.getImg);
    }
}

const ImageRoutes = new ImageRouter();
ImageRoutes.init();
export default ImageRoutes.router;