import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    ParseIntPipe, 
    Patch, 
    Post, 
    UseGuards 
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { EditProductDto } from './dto/edit-product.dto';
import { GetUser } from 'src/auth/decorator';

@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) {}

    @Get()
    getAllProducts() {
        return this.productService.getAllProducts();
    }

    @Get(':id')
    getProductById(@Param('id', ParseIntPipe) id: number) {
        return this.productService.getProductById(id); 
    }

    @UseGuards(JwtGuard)
    @Post()
    createProduct(@GetUser('id', ParseIntPipe) userId: number, @Body() dto: CreateProductDto) {
        return this.productService.createProduct(userId, dto);
    }

    @UseGuards(JwtGuard)
    @Patch(':id')
    editProduct(@GetUser('id', ParseIntPipe) userId: number,@Param('id', ParseIntPipe) id: number, @Body() dto: EditProductDto) {
        return this.productService.editProduct(userId, id, dto); // Convert id to number
    }

    @UseGuards(JwtGuard)
    @Delete(':id')
    deleteProduct(@GetUser('id', ParseIntPipe) userId: number, @Param('id', ParseIntPipe) id: number) {
        return this.productService.deleteProduct(userId, id); // Convert id to number
    }
}