import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateTuckshopDto, GetAllTuckshopssDto, UpdateTuckshopDto } from "./dto/tuckshop.dto";
import { Tuckshops } from "./interfaces/tuckshop.interfaces";

@Injectable()
export class TuckshopServices {
  constructor(@InjectModel('Tuckshops') private readonly TuckshopModel: Model<Tuckshops>) { }

  async create(userInfo: any, createTuckshopDto: CreateTuckshopDto) {
    const user = await this.TuckshopModel.findOne({
      user: createTuckshopDto.user,
      organization: userInfo.organization._id,
      status: 'active',
      isDeleted: false
    }).exec();

    if (user) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Tuckshop already exist.",
      }
    }

    let tuckshop = new this.TuckshopModel({
      organization: userInfo.organization._id,
      user: createTuckshopDto.user,
      name: createTuckshopDto.name,
      location: createTuckshopDto.location,
      category: createTuckshopDto.category,
      tuckshopID: createTuckshopDto.tuckshopID ?? '',
      imageUrl: createTuckshopDto.imageUrl ?? '',
    })
    const tuckshopSave = await tuckshop.save();

    return {
      statusCode: HttpStatus.OK,
      message: "Tuckshop created successfully.",
      data: tuckshopSave
    }
  }


  async findAll(userInfo: any, queryString: GetAllTuckshopssDto) {
    let pageOptions = {
      page: queryString.page || 0,
      limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25),
      status: (queryString.status && ['active', 'inactive'].includes(queryString.status) ? queryString.status : 'active'),
    }

    let modelParameter: any = {
      organization: userInfo.organization._id,
      status: pageOptions.status,
      isDeleted: false
    };

    const tuckshopsCount = await this.TuckshopModel.countDocuments(modelParameter)
      .exec();
    const tuckshops = await this.TuckshopModel.find(modelParameter).populate("user")
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit * 1)
      .exec();

    return {
      statusCode: HttpStatus.OK,
      message: "Tuckshops fetched successfully.",
      data: tuckshops,
      pagination: {
        total: tuckshopsCount,
        pages: Math.ceil(tuckshopsCount / pageOptions.limit),
        page: pageOptions.page,
        limit: pageOptions.limit
      }

    }
  }

  async findOne(userInfo: any, tuckshopId: string) {
    let modelParameter: any = {
      organization: userInfo.organization._id,
      _id: tuckshopId,
      isDeleted: false
    };

    const result = await this.TuckshopModel.findOne({ modelParameter }).populate("user")

    if (!result) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Tuckshop does not exist.",
      }
    }

    return {
      statusCode: HttpStatus.BAD_REQUEST,
      message: "Tuckshop fetched successfully.",
      data: result
    }
  }

  async update(userInfo: any, tuckshopId: string, updateTuckshopsDto: UpdateTuckshopDto) {

    const updateTuckshop = await this.TuckshopModel.findOne({
      _id: tuckshopId,
      organization: userInfo.organization._id,
      isDeleted: false
    }).populate("user").exec()

    if (!updateTuckshop) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Tuckshop does not exist.",
      }
    }

    if (updateTuckshopsDto.user) updateTuckshop.user = updateTuckshopsDto.user;
    if (updateTuckshopsDto.name) updateTuckshop.name = updateTuckshopsDto.name;
    if (updateTuckshopsDto.location) updateTuckshop.location = updateTuckshopsDto.location;
    if (updateTuckshopsDto.category) updateTuckshop.category = updateTuckshopsDto.category;
    if (updateTuckshopsDto.tuckshopID) updateTuckshop.tuckshopID = updateTuckshopsDto.tuckshopID;
    if (updateTuckshopsDto.imageUrl) updateTuckshop.imageUrl = updateTuckshopsDto.imageUrl;
    updateTuckshop.updatedAt = new Date();
    await updateTuckshop.save();

    return {
      statusCode: HttpStatus.OK,
      message: "Tuckshop updated successfully.",
      data: updateTuckshop
    }
  }

  async remove(userInfo: any, tuckshopId: string,) {
    const removeTuckshop = await this.TuckshopModel.findOne({
      _id: tuckshopId,
      organization: userInfo.organization._id,
      isDeleted: false
    }).exec();


    if (!removeTuckshop) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: "Tuckshop does not exist.",
      }
    }
    
    removeTuckshop.isDeleted = true;
    removeTuckshop.deletedAt = new Date();
    removeTuckshop.updatedAt = new Date();
    await removeTuckshop.save();
    return {
      statusCode: HttpStatus.OK,
      message: "Tuckshop deleted successfully.",
    }
  }

}