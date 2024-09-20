
import { ProgramModel } from '../models/program.model';
import { HttpError } from '../middleware/error.middleware';
import { IProgramCreate, IProgramUpdate, HttpStatus } from '../types';

class ProgramData {
  // Convert program to an output DTO
  convertToProgramOutDTO = (program: any) => ({
    id: program._id,
    name: program.name,
    description: program.description,
    createdAt: program.createdAt,
    updatedAt: program.updatedAt,
  });

  // Create a new Program
  create = async (program: IProgramCreate) => {
    const newProgram = new ProgramModel(program);
    await newProgram.save();
    return this.convertToProgramOutDTO(newProgram);
  };

  // Update a Program by ID
  updateById = async (id: string, program: IProgramUpdate) => {
    const isProgramExist = await ProgramModel.findById(id);
    if (isProgramExist) {
      await ProgramModel.updateOne({ _id: id }, program);
      return this.convertToProgramOutDTO(await ProgramModel.findById(id));
    }
    throw new HttpError('Program not found!', HttpStatus.NOT_FOUND);
  };

  // Get a Program by ID
  getById = async (id: string) => {
    const program = await ProgramModel.findById(id);
    if (program) {
      return this.convertToProgramOutDTO(program);
    }
    throw new HttpError('Program not found!', HttpStatus.NOT_FOUND);
  };

  // Get all Programs
  getAll = async () => {
    const programs = await ProgramModel.find();
    return programs.map(this.convertToProgramOutDTO);
  };

  // Delete a Program by ID
  deleteById = async (id: string) => {
    const isProgramExist = await ProgramModel.findById(id);
    if (isProgramExist) {
      await ProgramModel.deleteOne({ _id: id });
      return { message: 'Program deleted successfully' };
    }
    throw new HttpError('Program not found!', HttpStatus.NOT_FOUND);
  };
}

export default ProgramData;
