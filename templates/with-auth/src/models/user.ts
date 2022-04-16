import { model, Schema, Document, Model } from "mongoose";
import { genSalt, compare, hash } from "bcrypt";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this as IUser;

  if (!user.isModified("password")) return next();

  genSalt(10, (err, salt) => {
    if (err) return next(err);

    hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  const user = this as IUser;

  return await compare(candidatePassword, user.password);
};

export const User: Model<IUser> = model<IUser>("User", userSchema);
