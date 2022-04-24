import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { query } from 'express';
import { Model, Types } from 'mongoose';
import { Student } from '../students/interfaces/student.interface';
import { AssignCardDto, CreateCardTransactionDto, GetAllCardsDto, UpdateCardDto } from './dto/cards.dto';
import { AssignedCards, CardTransactions } from './interfaces/cards.interfaces';
import * as moment from 'moment';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel('Students') private readonly StudentsModel: Model<Student>,
    @InjectModel('AssignedCards') private readonly AssignedCardsModel: Model<AssignedCards>,
    @InjectModel('CardTransactions') private readonly CardTransactionsModel: Model<CardTransactions>,
  ) { }

  async assignCard(userInfo: any, assignCardDto: AssignCardDto) {
    // Check if card has already been assigned
    let checkIfCardIsAssigned = await this.AssignedCardsModel.findOne({
      cardNumber: assignCardDto.cardNumber,
      status: 'active',
      isDeleted: false
    }).exec()

    if (checkIfCardIsAssigned) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Card is currently assigned to someone else.",
      }
    }

    // ========================================
    // Assign Card
    // ========================================
    let card = new this.AssignedCardsModel({
      organization: userInfo.organization._id,
      student: assignCardDto.cardType == 'student' ? assignCardDto.student : null,
      cardType: assignCardDto.cardType,
      cardNumber: assignCardDto.cardNumber,
      guest: assignCardDto.cardType == 'special' ? { ...assignCardDto.guest, availableBalance: assignCardDto.guest.amount } : null,
    });

    const newCard = await card.save();

    return {
      statusCode: HttpStatus.OK,
      message: "Card assigned successfully.",
      data: newCard
    }
  }

  async findAllCards(userInfo: any, queryString: GetAllCardsDto) {
    let pageOptions = {
      page: queryString.page || 0,
      limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
      status: (queryString.status && ['active', 'inactive'].includes(queryString.status) ? queryString.status : 'active'),
      cardType: (queryString.cardType && ['student', 'special'].includes(queryString.cardType) ? queryString.cardType : ''),
    }
    let modelParameter: any = {
      organization: userInfo.organization._id,
      cardType: queryString.cardType,
      status: pageOptions.status,
      isDeleted: false
    };
    if (pageOptions.cardType == '') delete modelParameter.cardType;

    const cardsCount = await this.AssignedCardsModel.countDocuments(modelParameter).exec();

    const cards = await this.AssignedCardsModel.find(modelParameter)
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit * 1).populate('student').exec();

    return {
      statusCode: HttpStatus.OK,
      message: "Cards fetched successfully.",
      data: cards,
      pagination: {
        total: cardsCount,
        pages: Math.ceil(cardsCount / pageOptions.limit),
        page: pageOptions.page,
        limit: pageOptions.limit
      }
    }
  }

  async findOneCard(userInfo: any, cardId: string) {
    // Check if card exists
    const card = await this.AssignedCardsModel.findOne({
      _id: cardId,
      organization: userInfo.organization._id,
      isDeleted: false
    }).populate('student').exec()

    // Return error if card does not exist
    if (!card) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Card does not exist."
      }
    }

    return {
      statusCode: HttpStatus.OK,
      message: "Card fetched successfully.",
      data: card,
    }

  }

  async findOneCardAssignment(userInfo: any, cardId: string, queryString: GetAllCardsDto) {
    let pageOptions = {
      page: queryString.page || 0,
      limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
      status: (queryString.status && ['active', 'inactive'].includes(queryString.status) ? queryString.status : 'active'),
      cardType: (queryString.cardType && ['student', 'special'].includes(queryString.cardType) ? queryString.cardType : ''),
    }

    // Check if card exists
    const card = await this.AssignedCardsModel.findOne({
      _id: cardId,
      organization: userInfo.organization._id,
      isDeleted: false
    }).populate('student').exec()

    // Return error if card does not exist
    if (!card) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Card does not exist."
      }
    }

    let modelParameter: any = {
      organization: userInfo.organization._id,
      cardNumber: card.cardNumber,
      cardType: queryString.cardType,
      status: pageOptions.status,
      isDeleted: false
    };

    if (pageOptions.cardType == '') delete modelParameter.cardType;

    const cardsCount = await this.AssignedCardsModel.countDocuments(modelParameter).exec();

    const assignedCards = await this.AssignedCardsModel.find(modelParameter)
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit * 1).populate('student').exec();

    return {
      statusCode: HttpStatus.OK,
      message: "Card Assignments fetched successfully.",
      data: assignedCards,
      pagination: {
        total: cardsCount,
        pages: Math.ceil(cardsCount / pageOptions.limit),
        page: pageOptions.page,
        limit: pageOptions.limit
      }
    }
  }

  async updateCard(userInfo: any, cardId: string, updateCardDto: UpdateCardDto) {
    // Check if card exists
    const card = await this.AssignedCardsModel.findOne({
      _id: cardId,
      organization: userInfo.organization._id,
      isDeleted: false
    }).populate('student').exec()

    // Return error if card does not exist
    if (!card) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Card does not exist."
      }
    }

    if (updateCardDto.status) card.status = updateCardDto.status;

    card.updatedAt = new Date();
    await card.save();

    return {
      statusCode: HttpStatus.OK,
      message: "Card updated successfully.",
      data: card
    }
  }

  async createCardTransaction(userInfo: any, cardId: string, createCardTransactionDto: CreateCardTransactionDto) {
    // Check if card exists
    const card = await this.AssignedCardsModel.findOne({
      _id: cardId,
      organization: userInfo.organization._id,
      isDeleted: false
    }).populate('student').exec()

    // Return error if card does not exist
    if (!card) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Card does not exist."
      }
    }
    // Check if student is mapped to student card
    let student;
    if (card.cardType == 'student') {
      student = await this.StudentsModel.findOne({
        _id: card.student,
        status: 'active',
        isDeleted: false
      })

      // Return error if student does not exist
      if (!student) {
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Student mapped to this card is either inactive or does not exist."
        }
      }
    }

    const newTransaction = new this.CardTransactionsModel({
      organization: userInfo.organization._id,
      assignedCard: cardId,
      cardType: card.cardType,
      transactionType: createCardTransactionDto.transactionType,
      transactionMode: createCardTransactionDto.transactionMode,
      paymentReference: createCardTransactionDto.paymentReference,
      amount: createCardTransactionDto.amount,
      narration: createCardTransactionDto.narration,
      imageUrl: createCardTransactionDto.imageUrl,
      status: createCardTransactionDto.status
    });

    // ==================================
    // For topup transactions
    // ==================================
    if (createCardTransactionDto.transactionType == 'topup') {
      // Add money to student profile
      student.availableBalance = (+student.availableBalance) + (+createCardTransactionDto.amount);
      student.updatedAt = new Date();
      await student.save();

      // 
      newTransaction.student = student._id;
      newTransaction.runningBalance = student.availableBalance;
    }// ==================================
    // For Withdrawals & Purchases
    // ==================================
    else if (['withdrawal', 'purchase'].includes(createCardTransactionDto.transactionType)) {
      if (card.cardType == 'student') {
        // Remove money from student profile
        student.availableBalance = (+student.availableBalance) - (+createCardTransactionDto.amount);
        student.updatedAt = new Date();
        await student.save();

        // 
        newTransaction.student = student._id;
        newTransaction.runningBalance = student.availableBalance;
      }
      else {
        // Remove money from guest profile
        card.guest.availableBalance = (+student.availableBalance) - (+createCardTransactionDto.amount);
        card.updatedAt = new Date();
        await card.save();

        // 
        newTransaction.guest = card.guest;
        newTransaction.runningBalance = card.guest.availableBalance;
      }
      // Add order Id for purchases
      if (createCardTransactionDto.transactionType == 'purchase') {
        newTransaction.order = createCardTransactionDto.order;
      }
    }

    await newTransaction.save();

    return {
      statusCode: HttpStatus.OK,
      message: "Transaction created successfully.",
      data: newTransaction
    }
  }

  async findCardTransactions(userInfo: any, cardId: string, queryString: GetAllCardsDto) {
    let pageOptions = {
      page: queryString.page || 0,
      limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
      status: (queryString.status && ['successful', 'failed', 'pending', 'processing'].includes(queryString.status) ? queryString.status : ''),
      cardType: (queryString.cardType && ['student', 'special'].includes(queryString.cardType) ? queryString.cardType : ''),
      fromDate: (queryString.fromDate && queryString.fromDate != '' ? queryString.fromDate : moment().startOf('month').toISOString()),
      toDate: (queryString.toDate && queryString.toDate != '' ? queryString.toDate : moment().endOf('month').toISOString())
    }

    // Check if card exists
    const card = await this.AssignedCardsModel.findOne({
      _id: cardId,
      organization: userInfo.organization._id,
      isDeleted: false
    }).populate('student').exec()

    // Return error if card does not exist
    if (!card) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Card does not exist."
      }
    }

    let modelParameter: any = {
      organization: userInfo.organization._id,
      assignedCard: cardId,
      status: pageOptions.status,
      cardType: pageOptions.cardType,
      createdAt: {
        $gte: moment(pageOptions.fromDate).startOf('day').toISOString(),
        $lt: moment(pageOptions.toDate).endOf('day').toISOString()
      }
    }

    if (pageOptions.cardType == '') delete modelParameter.cardType;
    if (pageOptions.status == '') delete modelParameter.status;

    const transactionsCount = await this.CardTransactionsModel.countDocuments(modelParameter).exec();

    const transactions = await this.CardTransactionsModel.find(modelParameter)
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit * 1).populate('students').exec();

    return {
      statusCode: HttpStatus.OK,
      message: "Card Transactions fetched successfully.",
      data: transactions,
      pagination: {
        total: transactionsCount,
        pages: Math.ceil(transactionsCount / pageOptions.limit),
        page: pageOptions.page,
        limit: pageOptions.limit
      }
    }
  }

  async findOneCardTransaction(userInfo: any, cardId: string, transactionId: string) {
    // Check if card exists
    const card = await this.AssignedCardsModel.findOne({
      _id: cardId,
      organization: userInfo.organization._id,
      isDeleted: false
    }).populate('student').exec()

    // Return error if card does not exist
    if (!card) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Card does not exist."
      }
    }

    const transaction = await this.CardTransactionsModel.findOne({
      _id: transactionId,
      organization: userInfo.organization._id,
      assignedCard: cardId,
      isDeleted: false
    });

    // Return error if transaction does not exist
    if (!transaction) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Transaction does not exist."
      }
    }

    return {
      statusCode: HttpStatus.OK,
      message: "Transaction fetched successfuly.",
      data: transaction
    }
  }
}
