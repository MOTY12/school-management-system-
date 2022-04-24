import { Controller, Get, Post, Body, Request, Query, Put, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorators/roles.decorator';
import { CardsService } from './cards.service';
import { AssignCardDto, CreateCardTransactionDto, GetAllCardsDto, GetCardDto, GetCardTransactionDto, UpdateCardDto } from './dto/cards.dto';

@ApiTags('cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) { }

  // Assign a card
  @Post()
  @Roles('Admin')
  assignCard(@Request() request, @Body() assignCardDto: AssignCardDto) {
    return this.cardsService.assignCard(request.decoded, assignCardDto);
  }

  // Get all cards
  @Get()
  @Roles('Admin')
  findAllCards(@Request() request, @Query() queryString: GetAllCardsDto) {
    return this.cardsService.findAllCards(request.decoded, queryString);
  }

  // Get one card
  @Get(':cardId')
  @Roles('Admin', 'Guardian')
  findOneCard(@Request() request, @Param() params: GetCardDto) {
    return this.cardsService.findOneCard(request.decoded, params.cardId);
  }

  // Get card assignments
  @Get(':cardId/assignments')
  @Roles('Admin')
  findOneCardAssignment(@Request() request, @Param() params: GetCardDto, @Query() queryString: GetAllCardsDto) {
    return this.cardsService.findOneCardAssignment(request.decoded, params.cardId, queryString);
  }

  // Update card
  @Put(':cardId')
  @Roles('Admin')
  update(@Request() request, @Param() params: GetCardDto, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.updateCard(request.decoded, params.cardId, updateCardDto);
  }

  // Topup / withdraw / Purchase
  @Post(':cardId/transactions')
  @Roles('Admin', 'Guardian')
  createCardTransaction(@Request() request, @Param() params: GetCardDto, @Body() createCardTransactionDto: CreateCardTransactionDto) {
    return this.cardsService.createCardTransaction(request.decoded, params.cardId, createCardTransactionDto);
  }

  // Get Card transactions
  @Get(':cardId/transactions')
  @Roles('Admin', 'Guardian')
  async findTuitionTransactions(@Request() request, @Param() params: GetCardDto, @Query() queryString: GetAllCardsDto) {
    return await this.cardsService.findCardTransactions(request.decoded, params.cardId, queryString);
  }

  // Get one transaction
  @Get(':cardId/transactions/:transactionId')
  @Roles('Admin', 'Guardian')
  async findOneTuitionTransaction(@Request() request, @Param() params: GetCardTransactionDto) {
    return await this.cardsService.findOneCardTransaction(request.decoded, params.cardId, params.transactionId);
  }

}
