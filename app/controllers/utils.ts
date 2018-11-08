import * as mongoose from 'mongoose';
import { Image, IImageDocument } from '../models/image.model';
import { Settings } from '../settings/conf';

export class Utils {
  public static validateId(req, res) {
    if (!req.params.id) {
      return res.status(400).send({
        message: 'An id must be provided'
      });
    }
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).send({
        message: "Error parsing Id into a valid bson ObjectId"
      });
    }
  }

  public static uploadImg(data: Buffer) {
    return new Promise((resolve, reject) => {
      if (data) {
        Image.create({ content: data }, (err, img) => {
          if (err) return reject(err);
          return resolve(img._id);
        });
      } else {
        return resolve(Settings.defaultIds.image);
      }

    });

  }
}