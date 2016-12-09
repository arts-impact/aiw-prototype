import mongoose from 'mongoose';
const slug = require('mongoose-slug');
const materializedPlugin = require('mongoose-materialized');
import settingActivitySchema from './settingActivity';
const Schema = mongoose.Schema;

const routeTypeSchema = new Schema({
  name: { type: 'String', required: true },
  targetMinAgeWeeks: { type: 'Number', min: 0, required: false },
  targetMaxAgeWeeks: { type: 'Number', min: 0, required: false },
  iconUrl: { type: 'String', required: false },
  grades: ['String'],
});

const circuitSchema = new Schema({
  name: { type: 'String', required: true },
  description: { type: 'String', required: false },
  imageUrl: { type: 'String', required: false },
  settingActivity: [settingActivitySchema],
});

const sectorSchema = new Schema({
  images: [{
    name: { type: 'String', required: true },
    url: { type: 'String', required: true },
  }],
  routes: [
    { type: 'String' },
  ],
});

const gymSchema = new Schema({
  name: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  contactDetails: {
    addressLine1: { type: 'String', required: false },
    addressLine2: { type: 'String', required: false },
    addressLine3: { type: 'String', required: false },
    city: { type: 'String', required: false },
    country: { type: 'String', required: false },
    postalCode: { type: 'String', required: false },
    phone: { type: 'String', required: false },
    website: { type: 'String', required: false },
    coords: { type: 'String', required: false },
  },
  openingHours: { type: 'Mixed', required: false },
  settings: {
    logoUrl: { type: 'String', required: false },
    showSetterOnRouteCard: { type: 'Boolean', required: false, default: true },
    showDateSetOnRouteCard: { type: 'Boolean', required: false, default: true },
    allowEditingOfDateSet: { type: 'Boolean', required: false, default: true },
    publishPublicPage: { type: 'Boolean', required: false, default: true },
  },
  routeTypes: [routeTypeSchema],
  circuits: [circuitSchema],
  holdColours: [
    {
      name: { type: 'String', required: true },
      colours: [
        { type: 'String', required: true },
      ],
    },
  ],
  sectors: [sectorSchema],
  attemptStyles: [
    { type: 'String', required: true },
  ],
  startTypes: [
    { type: 'String', required: true },
  ],
  holdTypes: [
    { type: 'String', required: true },
  ],
});

sectorSchema.plugin(materializedPlugin);
gymSchema.plugin(slug('name'));

export default mongoose.model('Gym', gymSchema);
