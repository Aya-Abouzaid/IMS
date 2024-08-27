/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { IUserRef } from '.';

// eslint-disable-next-line no-shadow
enum StatusEnum {
    ACTIVE = 'active',
    ARCHIVE = 'archive',
}

type IMetaData = {
  id: string,
  status: StatusEnum,
  createdBy: string | IUserRef | unknown,
  createdAt: Date,
  updatedAt: Date,
}

interface IStatusUpdate{
  status: StatusEnum,
  updatedAt: Date,
}

enum AssetTypeEnum {
  WEB = 'web',
  MOBILE = 'mobile',
  NETWORK = 'network',
  WIRELESS = 'wireless',
}

export type{
  IMetaData,
  IStatusUpdate,
};

export {
  StatusEnum,
  AssetTypeEnum,
};
