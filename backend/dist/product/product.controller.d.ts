import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { EditProductDto } from './dto/edit-product.dto';
export declare class ProductController {
    private productService;
    constructor(productService: ProductService);
    getAllProducts(): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        userId: number;
        image: string | null;
        description: string | null;
        price: number;
        stock: number;
        category: string;
        updatedAt: Date;
    }[]>;
    getProductById(id: number): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        userId: number;
        image: string | null;
        description: string | null;
        price: number;
        stock: number;
        category: string;
        updatedAt: Date;
    }>;
    createProduct(userId: number, dto: CreateProductDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        userId: number;
        image: string | null;
        description: string | null;
        price: number;
        stock: number;
        category: string;
        updatedAt: Date;
    }>;
    editProduct(userId: number, id: number, dto: EditProductDto): Promise<{
        name: string;
        id: number;
        createdAt: Date;
        userId: number;
        image: string | null;
        description: string | null;
        price: number;
        stock: number;
        category: string;
        updatedAt: Date;
    }>;
    deleteProduct(userId: number, id: number): Promise<{
        message: string;
    }>;
}
