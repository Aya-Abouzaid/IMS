/* eslint-disable no-unused-vars */

// These classes are base DOTs

// eslint-disable-next-line no-shadow
enum StatusEnum {
    ACTIVE = 'active',
    ARCHIVE = 'archive',
}

interface IStatusUpdate{
  status: StatusEnum,
}

export type{
  IStatusUpdate,
};

export {
  StatusEnum,
};
