import { getRepository } from 'typeorm';

import ProductRepository from '../models/Product';

interface Request {
  id: string;
}

class DeleteProductService {
  public async execute({
    id,
  }: Request): Promise<void> {
    const productsRepository = getRepository(ProductRepository);

    const product = productsRepository.delete(id)


    return;
  }
}

export default DeleteProductService;
