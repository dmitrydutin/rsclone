import { DataTypes } from 'sequelize';
import sequelize from './connect';

import roleModel from '../models/role.model';
import userModel from '../models/user.model';
import tokenModel from '../models/token.model';
import postModel from '../models/token.model';

const models = {};

export const Roles = createModel(roleModel);
export const Users = createModel(userModel);
export const Tokens = createModel(tokenModel);
export const Posts = createModel(postModel);

function createModel(callback) {
    const model = callback(sequelize, DataTypes);

    models[model.name] = model;

    if (model.associate) {
        model.associate(models);
    }

    return model;
}

export default sequelize;
