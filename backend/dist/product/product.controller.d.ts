import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { EditProductDto } from './dto/edit-product.dto';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getAllProducts(): Promise<{
        id: number;
        userId: number;
        name: string;
        description: string | null;
        price: number;
        image: string | null;
        category: string;
        stock: number;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getProductById(id: number): Promise<{
        id: number;
        userId: number;
        name: string;
        description: string | null;
        price: number;
        image: string | null;
        category: string;
        stock: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createProduct(userId: number, dto: CreateProductDto): Promise<{
        id: number;
        userId: number;
        name: string;
        description: string | null;
        price: number;
        image: string | null;
        category: string;
        stock: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    editProduct(userId: number, id: number, dto: EditProductDto): Promise<{
        id: number;
        userId: number;
        name: string;
        description: string | null;
        price: number;
        image: string | null;
        category: string;
        stock: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteProduct(userId: number, id: number): Promise<{
        message: string;
    }>;
}
