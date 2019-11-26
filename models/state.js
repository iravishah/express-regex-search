const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const { v4 } = require('uuid');

const schema = new Schema({
  uid: { type: String },
  sr_no: { type: String },
  town: { type: String },
  urban_status: { type: String },
  state_code: { type: String },
  state: { type: String },
  district_code: { type: String },
  district: { type: String },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

schema.pre('save', function (next) {
  this.uid = `state-${v4()}`;
  next();
});

module.exports = mongoose.model('State', schema);
