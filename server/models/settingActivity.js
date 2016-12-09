import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const settingActivitySchema = new Schema({
  activityType: { type: 'String', required: true },
  date: { type: 'Date', required: true },
  by: {
    _id: { type: 'String', required: true },
    fullName: { type: 'String', required: true },
    avatarUrl: { type: 'String', required: false },
    email: { type: 'String', required: true },
  },
});

export default settingActivitySchema;
