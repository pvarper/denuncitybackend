import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { DenunciasService } from './denuncias.service';
import { CrearDenunciaRequestDto } from './dto/crear-denuncia.request.dto';
import { DenunciasValidatorService } from './denuncias.validator.service';
import { CancelarDenunciaRequestDto } from './dto/cancelar-denuncia.request.dto';
import { BaseResponse } from '../common/dto/base/base-response.dto';
import { json } from 'express';

@Controller('denuncias')
export class DenunciasController {
  constructor(
    private readonly denunciasService: DenunciasService,
    private readonly denunciasValidatorService: DenunciasValidatorService,
  ) {}

  @Post()
  async crear(@Body() crearDenunciaDto: CrearDenunciaRequestDto) {
    console.log('crearDenunciaDto : ' + JSON.stringify(crearDenunciaDto));
    // const resultValidation =
    //   this.denunciasValidatorService.validarDTO(crearDenunciaDto);
    // if (resultValidation.length > 0) {
    //   return BaseResponse.generateError(
    //     'Error al registrar la denuncia, Datos Incorrectos',
    //     resultValidation,
    //   );
    // }

    const result = await this.denunciasService.crear(crearDenunciaDto);

    return result;
  }

  @Get()
  async listarDenunciasPorUsuario(@Query('usuario') usuario: string) {
    const result = await this.denunciasService.obtenerListaDenuncias(usuario);

    return result;
  }

  @Post('/cancelar')
  async cancelarDenuncia(
    @Body() cancelarDenunciaRequestDto: CancelarDenunciaRequestDto,
  ) {
    const result = await this.denunciasService.cancelar(
      cancelarDenunciaRequestDto,
    );

    return result;
  }
}
