const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
    max: 20,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    max: 35,
  },
  username: {
    type: mongoose.SchemaTypes.String,
    required: true,
    max: 15,
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
    max: 20,
    min: 6,
  },
  regDate: {
    type: mongoose.SchemaTypes.Date,
    default: () => new Date(),
  },
  spheresIDs: {
    type: mongoose.SchemaTypes.Array,
  },
})

const SphereSchema = new mongoose.Schema({
  userID: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  sphereName: {
    type: mongoose.SchemaTypes.String,
    max: 25,
  },
  sphereCreationDate: {
    type: mongoose.SchemaTypes.Date,
    default: () => new Date(),
  },
  sphereTodos: {
    type: mongoose.SchemaTypes.Array,
  },
})

const TodoSchema = new mongoose.Schema({
  userID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  sphereID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  todoContent: {
    type: mongoose.SchemaTypes.String,
    min: 3,
    max: 200,
    required: true,
  },
  isCompleted: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
  },
  todoCreationDate: {
    type: mongoose.SchemaTypes.Date,
    default: () => new Date(),
  },
  attachment: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Attachments',
    },
  ],
})

const AttachmentSchema = new mongoose.Schema({
  todoID: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  attachmentPath: {
    type: mongoose.SchemaTypes.String,
  },
  attachmentName: {
    type: mongoose.SchemaTypes.String,
    required: true,
    min: 5,
  },
  attachmentHeader: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  attachmentDate: {
    type: mongoose.SchemaTypes.Date,
    default: () => new Date(),
  },
})

const Users = mongoose.model('Users', UserSchema)
const Spheres = mongoose.model('Spheres', SphereSchema)
const Todos = mongoose.model('Todos', TodoSchema)
const Attachments = mongoose.model('Attachments', AttachmentSchema)

module.exports = {
  Users,
  Spheres,
  Todos,
  Attachments,
}
