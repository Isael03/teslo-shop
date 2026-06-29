import {v4 as uuidV4 } from 'uuid'

export const fileNamer = (req: Express.Request, file: Express.Multer.File, cb: Function) => {
  if (!file) return cb(new Error('No file uploaded'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const fileName = `${uuidV4()}.${fileExtension}`

  cb(null, fileName);
};
