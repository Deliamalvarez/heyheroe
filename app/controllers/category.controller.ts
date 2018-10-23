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
       return res.status(201).send();
    }

     /**
   * Update a category given name and/or description
   * @method PUT
   * @param {name: String, description: string}
   * Response: {ICategoryDocument}
   */
  public static updateCategory(req, res) {
    return res.send({});
 }


}

export { CategoryController }