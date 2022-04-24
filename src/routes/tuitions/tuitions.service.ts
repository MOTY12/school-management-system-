import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BankDetails } from '../bankDetails/interfaces/bankDetails.interfaces';
import { Class } from '../classes/interfaces/class.interface';
import { Session } from '../sessions/interfaces/session.interfaces';
import { Student } from '../students/interfaces/student.interface';
import { AssignTuitionToStudentDto, CreateTuitionDto, CreateTuitionTransactionDto, GetAllTuitionsDto, GetAssignedTuitionsDto, UpdateTuitionDto } from './dto/tuition.dto';
import { AssignedTuitions, Tuition, TuitionTransactions } from './interfaces/tuition.interface';

@Injectable()
export class TuitionsService {
  constructor(
    @InjectModel('Class') private readonly ClassModel: Model<Class>,
    @InjectModel('Students') private readonly StudentModel: Model<Student>,
    @InjectModel('Session') private readonly SessionModel: Model<Session>,
    @InjectModel('BankDetails') private readonly BankDetailsModel: Model<BankDetails>,
    @InjectModel('Tuition') private readonly TuitionModel: Model<Tuition>,
    @InjectModel('AssignedTuitions') private readonly AssignedTuitionsModel: Model<AssignedTuitions>,
    @InjectModel('TuitionTransactions') private readonly TuitionTransactionsModel: Model<TuitionTransactions>,
  ) { }

  async create(userInfo: any, createTuitionDto: CreateTuitionDto) {
    // Check if bank details exist
    let checkBankDetails = await this.BankDetailsModel.findOne({
      _id: createTuitionDto.bankDetails,
      isDeleted: false
    }).exec()

    if (!checkBankDetails) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Bank details does not exist.",
      }
    }

    // Check if class exist
    let checkClass = await this.ClassModel.findOne({
      _id: createTuitionDto.class,
      isDeleted: false
    }).exec()

    if (!checkClass) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Class does not exist.",
      }
    }

    // Check if session exist
    let checkSession = await this.SessionModel.findOne({
      _id: createTuitionDto.session,
      isDeleted: false
    }).exec()

    if (!checkSession) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Session does not exist.",
      }
    }
    // -----------------------------
    // Create tuition
    // ------------------------------
    let tuition = new this.TuitionModel({
      organization: userInfo.organization._id,
      class: createTuitionDto.class,
      bankDetails: createTuitionDto.bankDetails,
      session: createTuitionDto.session,
      term: checkSession.term,
      tuitionName: createTuitionDto.tuitionName,
      className: checkClass.name,
      amount: createTuitionDto.amount,
      currency: createTuitionDto.currency,
      description: createTuitionDto.description
    })

    const newTuition = await tuition.save();

    // -----------------------------
    // Assign tuition to all students in class
    // ------------------------------
    let checkStudents = await this.StudentModel.find({
      organization: userInfo.organization._id,
      class: createTuitionDto.class,
      isDeleted: false
    }).exec()

    checkStudents.forEach(async (student: any) => {
      let AssignedTuitions = new this.AssignedTuitionsModel({
        organization: userInfo.organization._id,
        tuition: newTuition._id,
        student: student._id,
        outstandingBalance: createTuitionDto.amount
      })
      const newAssignedTuitions = await AssignedTuitions.save()
    })

    return {
      statusCode: HttpStatus.OK,
      message: "Tuition created successfully.",
      data: newTuition
    }

  }

  async findAllTuitions(userInfo: any, queryString: GetAllTuitionsDto) {
    let pageOptions = {
      page: queryString.page || 0,
      limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
      status: (queryString.status && ['active', 'inactive'].includes(queryString.status) ? queryString.status : 'active'),
    }
    let modelParameter: any = {
      organization: userInfo.organization._id,
      session: queryString.session,
      class: queryString.class,
      bankDetails: queryString.bankDetails,
      status: pageOptions.status,
      isDeleted: false
    };
    if (!queryString.class) delete modelParameter.class;
    if (!queryString.session) delete modelParameter.session;
    if (!queryString.bankDetails) delete modelParameter.bankDetails;

    const tuitionCount = await this.TuitionModel.countDocuments(modelParameter).exec();

    const Tuitions = await this.TuitionModel.find(modelParameter)
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit * 1).populate('bankDetails class session').exec();

    return {
      statusCode: HttpStatus.OK,
      message: "Tuitions fetched successfully.",
      data: Tuitions,
      pagination: {
        total: tuitionCount,
        pages: Math.ceil(tuitionCount / pageOptions.limit),
        page: pageOptions.page,
        limit: pageOptions.limit
      }
    }
  }

  async findOneTuition(userInfo: any, id: string) {
    // Check if tuition already exists
    let tuition = await this.TuitionModel.findOne({
      _id: id,
      organization: userInfo.organization._id,
      isDeleted: false
    }).populate('bankDetails class session').exec()

    // Return error if tuition already exists
    if (!tuition) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Tuition does not exist."
      }
    }

    return {
      statusCode: HttpStatus.OK,
      message: "Tuition fetched successfully.",
      data: tuition
    }
  }

  async assignTuitionToStudent(userInfo: any, assignTuitionToStudentDto: AssignTuitionToStudentDto) {
    // Check if tuition already exists
    let tuition = await this.TuitionModel.findOne({
      _id: assignTuitionToStudentDto.tuition,
      organization: userInfo.organization._id,
      isDeleted: false
    }).exec()

    // Return error if tuition already exists
    if (!tuition) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Tuition does not exist."
      }
    }

    let assignedTuition = new this.AssignedTuitionsModel({
      organization: userInfo.organization._id,
      tuition: assignTuitionToStudentDto.tuition,
      student: assignTuitionToStudentDto.student,
      outstandingBalance: tuition.amount
    })
    const newAssignedTuition = await assignedTuition.save();

    return {
      statusCode: HttpStatus.OK,
      message: "Tuition assigned successfully.",
      data: newAssignedTuition
    }
  }

  async unassignTuitionFromStudent(userInfo: any, id: string) {
    // Check if tuition already exists
    let tuition = await this.AssignedTuitionsModel.findOne({
      _id: id,
      organization: userInfo.organization._id,
      isDeleted: false
    }).populate('tuition').exec()

    // Return error if tuition already exists
    if (!tuition) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Assigned Tuition does not exist."
      }
    }

    tuition.isDeleted = true;
    tuition.updatedAt = new Date();
    tuition.deletedAt = new Date();
    await tuition.save();

    return {
      statusCode: HttpStatus.OK,
      message: "Tuition unassigned successfully."
    }
  }

  async findAssignedTuitions(userInfo: any, queryString: GetAssignedTuitionsDto) {
    let pageOptions = {
      page: queryString.page || 0,
      limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
      status: (queryString.status && ['active', 'inactive'].includes(queryString.status) ? queryString.status : 'active'),
      paymentProgress: (queryString.paymentProgress && ['outstanding', 'complete', 'all'].includes(queryString.paymentProgress) ? queryString.paymentProgress : 'all'),
    }
    let modelParameter: any = {
      organization: userInfo.organization._id,
      student: queryString.student,
      tuition: queryString.tuition,
      status: pageOptions.status,
      isDeleted: false,
    };

    if (!queryString.student) delete modelParameter.student;
    if (!queryString.tuition) delete modelParameter.tuition;

    if (queryString.paymentProgress == 'complete') modelParameter.outstandingBalance = { $eq: 0 };
    if (queryString.paymentProgress == 'outstanding') modelParameter.outstandingBalance = { $gt: 0 };

    const tuitionCount = await this.AssignedTuitionsModel.countDocuments(modelParameter).exec();

    const Tuitions = await this.AssignedTuitionsModel.find(modelParameter)
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit * 1).populate('tuition student').exec();

    return {
      statusCode: HttpStatus.OK,
      message: "Assigned Tuitions fetched successfully.",
      data: Tuitions,
      pagination: {
        total: tuitionCount,
        pages: Math.ceil(tuitionCount / pageOptions.limit),
        page: pageOptions.page,
        limit: pageOptions.limit
      }
    }
  }

  async findOneAssignedTuition(userInfo: any, id: string) {
    // Check if tuition already exists
    let tuition = await this.AssignedTuitionsModel.findOne({
      _id: id,
      organization: userInfo.organization._id,
      isDeleted: false
    }).populate('tuition').exec()

    // Return error if tuition already exists
    if (!tuition) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Assigned Tuition does not exist."
      }
    }

    return {
      statusCode: HttpStatus.OK,
      message: "Assigned Tuition fetched successfully.",
      data: tuition
    }
  }

  async findTuitionTransactions(userInfo: any, queryString: GetAssignedTuitionsDto) {
    let pageOptions = {
      page: queryString.page || 0,
      limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
    }
    let modelParameter: any = {
      organization: userInfo.organization._id,
      student: queryString.student,
      tuition: queryString.tuition,
      isDeleted: false,
    };

    if (!queryString.student) delete modelParameter.student;
    if (!queryString.tuition) delete modelParameter.tuition;


    const tuitionCount = await this.TuitionTransactionsModel.countDocuments(modelParameter).exec();

    const Tuitions = await this.TuitionTransactionsModel.find(modelParameter)
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit * 1).populate('tuition assignedTuition students').exec();

    return {
      statusCode: HttpStatus.OK,
      message: "Tuition Transactions fetched successfully.",
      data: Tuitions,
      pagination: {
        total: tuitionCount,
        pages: Math.ceil(tuitionCount / pageOptions.limit),
        page: pageOptions.page,
        limit: pageOptions.limit
      }
    }
  }

  async findOneTuitionTransaction(userInfo: any, id: string) {
    // Check if tuition already exists
    let tuition = await this.TuitionTransactionsModel.findOne({
      _id: id,
      organization: userInfo.organization._id,
      isDeleted: false
    }).populate('tuition assignedTuition students').exec()

    // Return error if tuition already exists
    if (!tuition) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Tuition Transaction does not exist."
      }
    }

    return {
      statusCode: HttpStatus.OK,
      message: "Tuition Transaction fetched successfully.",
      data: tuition
    }
  }

  async updateTuition(userInfo: any, updateTuitionDto: UpdateTuitionDto, id: string) {
    // Check if tuition already exists
    let tuition = await this.TuitionModel.findOne({
      _id: id,
      organization: userInfo.organization._id,
      isDeleted: false
    }).populate('bankDetails class session').exec()

    // Return error if tuition already exists
    if (!tuition) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Tuition does not exist."
      }
    }

    if (updateTuitionDto.bankDetails) tuition.bankDetails = updateTuitionDto.bankDetails;
    if (updateTuitionDto.description) tuition.description = updateTuitionDto.description;
    if (updateTuitionDto.status) tuition.status = updateTuitionDto.status;
    tuition.updatedAt = new Date();

    await tuition.save();

    // Update status of all assigned tuition
    if (updateTuitionDto.status) {

      await this.AssignedTuitionsModel.updateMany({
        tuition: tuition._id,
        organization: userInfo.organization._id,
        isDeleted: false
      },
        { status: updateTuitionDto.status }
      ).exec();
    }

    return {
      statusCode: HttpStatus.OK,
      message: "Tuition updated successfully.",
      data: tuition
    }
  }

  async createTuitionTransaction(userInfo: any, createTuitionTransactionDto: CreateTuitionTransactionDto) {

    // Get assignedTuition
    let assignedTuition: any = await this.AssignedTuitionsModel.findOne({
      _id: createTuitionTransactionDto.assignedTuition,
      organization: userInfo.organization._id,
      isDeleted: false
    }).populate('tuition').exec();

    let newBalance = (+assignedTuition.outstandingBalance) - (+createTuitionTransactionDto.amount);
    // Add transaction
    const transaction = new this.TuitionTransactionsModel({
      organization: userInfo.organization._id,
      session: createTuitionTransactionDto.session,
      term: createTuitionTransactionDto.term,
      tuition: assignedTuition.tuition._id,
      assignedTuition: createTuitionTransactionDto.assignedTuition,
      student: createTuitionTransactionDto.student,
      amount: createTuitionTransactionDto.amount,
      outstandingBalance: newBalance,
      narration: createTuitionTransactionDto.narration ?? '',
      paymentReference: createTuitionTransactionDto.paymentReference,
      paymentMode: createTuitionTransactionDto.paymentMode,
      imageUrl: createTuitionTransactionDto.imageUrl ?? ''
    })


    const newTransaction = await transaction.save();

    assignedTuition.outstandingBalance = newBalance;

    assignedTuition.save();

    return {
      statusCode: HttpStatus.OK,
      message: "Transaction created successfully.",
      data: newTransaction
    }

  }
}
