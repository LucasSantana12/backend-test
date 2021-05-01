import { Router } from 'express';
import { getRepository } from 'typeorm';
import ProductRepository from '../models/Product';
import CreateProductService from '../services/CreateProductService';
import ensureAutheticated from '../middlewares/ensureAutheticated';
import DeleteProductService from '../services/DeleteProductService';

const productsRouter = Router();

productsRouter.get('/', async (request, response) => {
  const productsRepository = getRepository(ProductRepository);

  const products = await productsRepository.find();

  return response.json(products);
});

productsRouter.post('/', ensureAutheticated, async (request, response) => {
  try {
    const { title, description, price, category } = request.body;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({
      title,

      description,

      price,

      category,
    });

    return response.json(product);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
productsRouter.delete('/:id', ensureAutheticated, async (request,response)=>{
try{
  const { id } = request.params;

  const deleteProduct = new DeleteProductService();

  const product = await deleteProduct.execute({ id})

  return response.json(product)
}
catch(err){
  return response.status(400).json({ error: err.message });
}
})

export default productsRouter;
