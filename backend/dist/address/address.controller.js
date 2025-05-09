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
exports.AddressController = void 0;
const common_1 = require("@nestjs/common");
const address_service_1 = require("./address.service");
const dto_1 = require("./dto");
const jwt_guard_1 = require("../auth/guard/jwt.guard");
let AddressController = class AddressController {
    addressService;
    constructor(addressService) {
        this.addressService = addressService;
    }
    getAddress(profileId) {
        return this.addressService.getAddress(profileId);
    }
    createAddress(profileId, dto) {
        return this.addressService.createAddress(profileId, dto);
    }
    deleteAddress(profileId, addressId) {
        return this.addressService.deleteAddress(profileId, addressId);
    }
};
exports.AddressController = AddressController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('profileId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "getAddress", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('profileId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.CreateAddressDto]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "createAddress", null);
__decorate([
    (0, common_1.Delete)("/:addressId"),
    __param(0, (0, common_1.Param)('profileId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('addressId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], AddressController.prototype, "deleteAddress", null);
exports.AddressController = AddressController = __decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard),
    (0, common_1.Controller)('profile/:profileId/address'),
    __metadata("design:paramtypes", [address_service_1.AddressService])
], AddressController);
//# sourceMappingURL=address.controller.js.map