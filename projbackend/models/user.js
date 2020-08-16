const mongoose = require("mongoose")
const uuidv1 = require("uuid/v1")
const crypto = require("crypto")
const { ObjectId } = mongoose.Schema

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    lastname: {
      type: String,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    phone: {
      type: Number,
      trim: true,
      required: true
    },
    userinfo: {
      type: String,
      trim: true
    },
    encry_password: {
      type: String,
      trim: true,
      required: true
    },
    salt: String,
    role: {
      type: Number,
      default: 0
    },
    purchases: {
      type: [],
      default: []
    }
  },
  { timestamps: true }
)

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password
    this.salt = uuidv1()
    this.encry_password = this.secPasswrd(password)
  })
  .get(function () {
    return this._password
  })

userSchema.methods = {
  secPasswrd: function (plainpasswrd) {
    if (!plainpasswrd) return ""
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpasswrd)
        .digest("hex")
    } catch (err) {
      return ""
    }
  },
  authenticate: function (plainpasswrd) {
    return this.secPasswrd(plainpasswrd) === this.encry_password
  }
}

module.exports = mongoose.model("User", userSchema)
