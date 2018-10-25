import { Service, IServiceDocument } from '../models/service.model';

class ServiceController {

     /**
   * Get all Services
   * @method GET
   * Response: {[IServiceDocument]}
   */

  public static getAllServices(req, res) {
    Service.find()
        .populate('category', 'name')
        .exec((err, service) => {
            if (err) return res.status(500).send(err);            
            return res.json(service);
        });
    }

    /**
   * Get Category by a given id
   * @method GET
   * @param id
   * Response: {ICategoryDocument}
   */

  public static getServiceById(req, res) {
    if (!req.params.id) {
        return res.status(400).send({
            message: "An id must be provided"
        });
    }

    Service.findById(req.params.id)
    .populate('category', 'name')
    .exec((err, service) => {
        if (err) return res.status(500).send(err);            
        if (!service) {
            return res.status(404).send({message: "Service not found"});  
            }
        return res.send(service);
        }); 
    
    }


    /**
   * Create a service given name and description
   * @method POST
   * @param {name: String, description: string, categoryId: string}
   * Response: {IServiceDocument}
   */
  public static createService(req, res) {
    Service.create(req.body, (err, newServ) => {
        if (err) return res.status(500).send(err);
        return res.status(201).send();
        });
    
    }

    /**
   * Update a service given name and/or description
   * @method PUT
   * @param {name: String, description: string}
   * Response: {IServiceDocument}
   */
  public static updateService(req, res) {
    Service.findByIdAndUpdate(req.body.id, req.body, {new:true}, (err, updatedService)=> {
        debugger;
        if (err) return res.status(500).send(err);
        if (!updatedService) {
            return res.status(404).send({message: "Service not found"});
        }
        return res.status(200).send(updatedService);
    });
 }


    /**
   * Remove a service given name and/or description
   * @method DELETE
   * @param {id: guid}
   * Response: {No Content}
   */

 public static removeService(req, res) {
    Service.findByIdAndRemove(req.params.id, err => {
       if (err) return res.status(500).send(err);
       res.status(204).send();
        });
    }

}

export { ServiceController }