import { getRepository } from 'typeorm';

import Product from '../models/Product';
import ProductRepository from '../models/Product';
import Category from '../models/Category';

interface Request {
  title: string;
  description: string;
  price: number;
  category: string
}

class CreateProductService {
  public async execute({
    title,
    description,
    price,
    category
  }: Request): Promise<Product> {
    const productsRepository = getRepository(ProductRepository);
    const categoryRepository = getRepository(Category);

    //Criando a categoria
    let productCategory = await categoryRepository.findOne({
      where:{
        title: category,
      }
    });
    if(!productCategory){
      productCategory = categoryRepository.create({
        title: category,
      });
      await categoryRepository.save(productCategory)
    }
    //-------------------------------------------//


    /**
     * Criando o produto e salvando
     */
    const product = productsRepository.create({
      title,
      description,
      price,
      category: productCategory
    });

    await productsRepository.save(product);

    //---------------------------------------//
    return product;
  }
}

export default CreateProductService;
