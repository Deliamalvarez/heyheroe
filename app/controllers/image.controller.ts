import {Image, IImageDocument } from '../models/image.model';

class ImageController {
 public static createImg(req, res) {
  const bindata = Buffer.from(req.body.content.split(",")[1],'base64');
  if (!bindata) {
    res.status(400).send({message: 'Body should follow the format: data:image/png;base64,long-String'})
  }
  Image.create({content: bindata}, (err, img) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.content.length
    });
    res.end(img.content); 
  });
 }
 public static getImg(req, res) {
  if (!req.params.id) {
    return res.status(400).send({
      message: 'An id must be provided'
    });
  }
  Image.findById(req.params.id, (err, img) => {
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.content.length
    });
    res.end(img.content); 
  });
 }
}

export {ImageController}