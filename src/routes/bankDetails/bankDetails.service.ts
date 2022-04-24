import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateBankDetailDto, GetAllBankDetailsDto, GetBankDetailDto, UpdateBankDetailDto} from "./dto/bankDetails.dto";
import { BankDetails } from './interfaces/bankDetails.interfaces'

@Injectable()
export class BankDetailsService{
    constructor(
        @InjectModel('BankDetails') private readonly BankDetailModel: Model<BankDetails>
    ){}
    async create(userInfo: any, createBankDetailsDto: CreateBankDetailDto){
        let checkBankDetails = await this.BankDetailModel.findOne({
            accountNumber: createBankDetailsDto.accountNumber,
            status: 'active',
            isDeleted: false
        })
        if(checkBankDetails){
            return {
                statusCode: HttpStatus.BAD_REQUEST,
                message: "Account number already exists."
              }
        }
        let bankDetail = new this.BankDetailModel({
            organization: userInfo.organization._id,
            accountName: createBankDetailsDto.accountName,
            accountNumber: createBankDetailsDto.accountNumber,
            bankCode: createBankDetailsDto.bankCode,
        })
       const bankDetailsave =  await bankDetail.save();
       return {
        statusCode: HttpStatus.OK,
        message: "Bank details saved successfully.",
        data: bankDetailsave
      }
        
    }

    async findAll(userInfo: any, queryString: GetAllBankDetailsDto){
        let pageOptions = { 
          page: queryString.page || 0,
        limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
        status: (queryString.status && ['active', 'inactive'].includes(queryString.status) ? queryString.status : "active"),
      }
      let modelParameter: any = {
        organization: userInfo.organization._id,
        isDeleted: false,
        status: pageOptions.status
      };
      const bankDetailsCount= await this.BankDetailModel.countDocuments(modelParameter).exec()
      const bankDetails = await this.BankDetailModel.find(modelParameter)
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit * 1)
      .exec();
      return {
        statusCode: HttpStatus.OK,
        message: "Bank details fetched successfully.",
        data: bankDetails,
        pagination: {
          total: bankDetailsCount,
          pages: Math.ceil(bankDetailsCount / pageOptions.limit),
          page: pageOptions.page,
          limit: pageOptions.limit
        }

      }
}


async findOne(userInfo: any,bankDetailId: string  ){

    let modelParameter: any = {
        organization: userInfo.organization._id,
        _id: bankDetailId,
        isDeleted: false
      };    
      const result = await this.BankDetailModel.findOne(modelParameter).exec()
      if(!result){
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Bank details does not exist.",
      }  
      }
      return {
          statusCode: HttpStatus.OK,
          message: "Bank details fetched successfully.",
          data: result
      }
}
 async update(userInfo: any, bankDetailId: string, updateBankDetailDto: UpdateBankDetailDto  ){
    const updateBankDetail = await this.BankDetailModel.findOne({
      _id: bankDetailId,
      organization: userInfo.organization._id,
      isDeleted: false
    }).exec()
    if(!updateBankDetail){
        return {
          statusCode: HttpStatus.BAD_REQUEST,
          message: "Bank details does not exist.",
      }}

    if(updateBankDetailDto.accountName)updateBankDetail.accountName = updateBankDetailDto.accountName;
    if(updateBankDetailDto.accountNumber)updateBankDetail.accountNumber = updateBankDetailDto.accountNumber;
    if(updateBankDetailDto.bankCode)updateBankDetail.bankCode = updateBankDetailDto.bankCode;
    
    updateBankDetail.updatedAt = new Date(); 
    updateBankDetail.save();
    
    return {
        statusCode: HttpStatus.OK,
        message: "Bank details updated successfully.",
        data: updateBankDetail
      }
}

async remove(userInfo: any, bankDetailId: string){
    const removeBankDetails = await this.BankDetailModel.findOne({
        _id: bankDetailId,
        organization: userInfo.organization._id,
        isDeleted: false
    }).exec()

    if(!removeBankDetails){
        return {
            statusCode: HttpStatus.BAD_REQUEST,
            message: "Bank details does not exist.",
        }
    }
    removeBankDetails.isDeleted = true;
    removeBankDetails.deletedAt = new Date();
    removeBankDetails.updatedAt = new Date();
    await removeBankDetails.save();
    return {
        statusCode: HttpStatus.OK,
        message: "Bank details deleted successfully.",
      }
}


}