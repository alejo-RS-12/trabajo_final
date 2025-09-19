"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const usuario_entity_1 = require("./usuario.entity");
const bcrypt = __importStar(require("bcrypt"));
let UsersService = class UsersService {
    constructor(usuarioRepo) {
        this.usuarioRepo = usuarioRepo;
    }
    // 📌 Registro
    async register(data) {
        const existe = await this.usuarioRepo.findOne({ where: { email: data.email } });
        if (existe)
            throw new common_1.BadRequestException('El email ya está registrado');
        const hashedPass = await bcrypt.hash(data.contrasena, 10);
        const nuevoUsuario = this.usuarioRepo.create({
            ...data,
            contrasena: hashedPass,
        });
        return this.usuarioRepo.save(nuevoUsuario);
    }
    // 📌 Login
    async login(email, contrasena) {
        const usuario = await this.usuarioRepo.findOne({ where: { email } });
        if (!usuario)
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        const match = await bcrypt.compare(contrasena, usuario.contrasena);
        if (!match)
            throw new common_1.UnauthorizedException('Credenciales inválidas');
        return { message: 'Login exitoso', usuario };
    }
    async googleLogin(googleUser) {
        let usuario = await this.usuarioRepo.findOne({ where: { email: googleUser.email } });
        if (!usuario) {
            usuario = this.usuarioRepo.create({
                email: googleUser.email,
                nombre: googleUser.nombre,
                contrasena: null, // no se necesita, ya que viene de Google
                esGoogle: true,
            });
            await this.usuarioRepo.save(usuario);
        }
        return { message: 'Login con Google exitoso', usuario };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
