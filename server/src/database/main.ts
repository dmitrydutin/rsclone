import { DataTypes } from 'sequelize';
import sequelize from './connect';

import roleModel from '../models/role.model';
import userModel from '../models/user.model';
import tokenModel from '../models/token.model';
import postModel from '../models/post.model';
import commentModel from '../models/comment.model';
import dialogModel from '../models/dialog.model';
import messageModel from '../models/message.model';

const models = {};

export const Roles = createModel(roleModel);
export const Users = createModel(userModel);
export const Tokens = createModel(tokenModel);
export const Posts = createModel(postModel);
export const Comments = createModel(commentModel);
export const Dialogs = createModel(dialogModel);
export const Messages = createModel(messageModel);

function createModel(callback) {
    const model = callback(sequelize, DataTypes);

    models[model.name] = model;

    if (model.associate) {
        model.associate(models);
    }

    return model;
}

export default sequelize;
