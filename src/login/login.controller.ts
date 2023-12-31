import { Body, Controller, Post } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { RegistroUsuarioDto } from './dto/registro.usuario.dto';
import { BaseResponse } from '../common/dto/base/base-response.dto';
import { VerificarLoginUsuarioDto } from './dto/verificar.login.usuario.dto';
import { ActualizarUsuarioDto } from './dto/actualizar.usuario.dto';

@Controller('usuario')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('registrar')
  async registrar(@Body() registroUsuarioDto: RegistroUsuarioDto) {
    console.log('Registrar :: ', { ...registroUsuarioDto });

    const usuarioRegistrado = await this.loginService.registrar(
      registroUsuarioDto,
    );

    return usuarioRegistrado;
  }

  @Post('verificar_validez_contrasena')
  async validarValidezContrasena(
    @Body() verificarLoginUsuarioDto: VerificarLoginUsuarioDto,
  ) {
    console.log('validarValidezContrasena :: ', {
      ...verificarLoginUsuarioDto,
    });

    const renovarContrasena = await this.loginService.validarValidezContrasena(
      verificarLoginUsuarioDto,
    );

    return renovarContrasena;
  }

  @Post('actualizar_contrasena')
  async actualizarContrasena(
    @Body() actualizarUsuarioDto: ActualizarUsuarioDto,
  ) {
    console.log(
      'actualizarContrasena :: ' + JSON.stringify(actualizarUsuarioDto),
    );

    const usuarioActualizado = await this.loginService.actualizarUsuario(
      actualizarUsuarioDto,
    );

    return usuarioActualizado;
  }

  @Post('login')
  async login(@Body() loginUsuarioDto: LoginUsuarioDto) {
    let promise: any;
    console.log('login :: ', { loginUsuarioDto });

    await this.loginService.login(loginUsuarioDto).then(function (result) {
      promise = result;
    });
    return BaseResponse.generateOkResponse('OK', promise);
  }
}
