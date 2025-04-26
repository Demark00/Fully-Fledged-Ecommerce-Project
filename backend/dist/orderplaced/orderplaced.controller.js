"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderPlacedController = void 0;
const common_1 = require("@nestjs/common");
const orderplaced_service_1 = require("./orderplaced.service");
const orderplaced_dto_1 = require("./dto/orderplaced.dto");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
const decorator_1 = require("../auth/decorator");
let OrderPlacedController = class OrderPlacedController {
    orderPlacedService;
    constructor(orderPlacedService) {
        this.orderPlacedService = orderPlacedService;
    }
    async createOrder(userId, dto) {
        return this.orderPlacedService.createOrder(userId, dto);
    }
    async createMultipleOrders(userId) {
        return this.orderPlacedService.createMultipleOrders(userId);
    }
    async getOrders(userId) {
        return this.orderPlacedService.getOrders(userId);
    }
    async deleteOrder(userId, orderId) {
        return this.orderPlacedService.deleteOrder(userId, orderId);
    }
};
exports.OrderPlacedController = OrderPlacedController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, orderplaced_dto_1.OrderPlacedDto]),
    __metadata("design:returntype", Promise)
], OrderPlacedController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)('buy-all'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderPlacedController.prototype, "createMultipleOrders", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, decorator_1.GetUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderPlacedController.prototype, "getOrders", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, decorator_1.GetUser)('id')),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], OrderPlacedController.prototype, "deleteOrder", null);
exports.OrderPlacedController = OrderPlacedController = __decorate([
    (0, common_1.Controller)('orderplaced'),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    __metadata("design:paramtypes", [orderplaced_service_1.OrderPlacedService])
], OrderPlacedController);
//# sourceMappingURL=orderplaced.controller.js.map