import { Category, ICategoryDocument } from "../models/category.model";

class CategoryController {

    /**
   * Get all Categories
   * @method GET
   * Response: {[ICategoryDocument]}
   */

    public static getAllCategories(req, res) {
        Category.find((err, categories) => {
            if (err) return res.status(500).send(err);
            return res.json(categories);
        });
    }

    /**
   * Get Category by a given id
   * @method GET
   * @param id
   * Response: {ICategoryDocument}
   */

    public static getCategoryById(req, res) {
        if (!req.params.id) {
            return res.status(400).send({
                message: "An id must be provided"
            });
        }

        Category.findById(req.params.id, (err, category) => {
            if (err) return res.status(500).send(err);
            if (!category) {
                return res.status(404).send({message: "Category not found"});  
            }
            return res.send(category);
        });
    }

    /**
   * Create a category given name and description
   * @method POST
   * @param {name: String, description: string}
   * Response: {ICategoryDocument}
   */
    public static createCategory(req, res) {
        Category.create(req.body, (err, newCat) => {
            if (err) return res.status(500).send(err);
            return res.status(201).send();
        });
       
    }

     /**
   * Update a category given name and/or description
   * @method PUT
   * @param {name: String, description: string}
   * Response: {ICategoryDocument}
   */
  public static updateCategory(req, res) {
    Category.findByIdAndUpdate(req.body.id, req.body, {new:true}, (err, updatedCategory)=> {
        debugger;
        if (err) return res.status(500).send(err);
        if (!updatedCategory) {
            return res.status(404).send({message: "Category not found"});
        }
        return res.status(200).send(updatedCategory);
    });
 }

    /**
   * Remove a category given name and/or description
   * @method DELETE
   * @param {id: guid}
   * Response: {No Content}
   */

 public static removeCategory(req, res) {
     Category.findByIdAndRemove(req.params.id, err => {
        if (err) return res.status(500).send(err);
        res.status(204).send();
     });
 }


}

export { CategoryController }