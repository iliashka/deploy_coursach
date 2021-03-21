const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { roles } = require("../roles");
const Post = require("../models/postsModel");
const { cloudinary } = require("../utils/cloudinary");
const Tags = require("../models/tagsModel");

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword)
}

exports.singup = async (req, res, next) => {
    try {
        const { login, email, password, role } = req.body
        const hashedPassword = await hashPassword(password);
        const newUser = new User({ login, email, password: hashedPassword, role: role || "user", status: "active" })
        const accessToken = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        newUser.accessToken = accessToken;
        await newUser.save();
        res.json({
            data: newUser,
            message: "Вы успешно зарегистрированы"
        })
    } catch (error) {
        next(error)
    }
}

exports.facebookAuth = async (req, res, next) => {
    try {
        const {id, email, password, role, avatar, login} = req.body
        const question = await User.findOne({fbId: id})
        const tags = await Tags.find({})
        if (!question) {
            const user = await new User ({ login: login, fbId: id, email: email, accessToken: password, password: password, role: role, status: "active", avatar: avatar})
            await user.save()
            await console.log(user)
            await res.status(200).json({
                user,
                tags
            })
        }else{
            const user = await User.findOne({fbId: id})
            res.status(200).json({
                user,
                tags
            })
        }
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    console.log(req.body)
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return next(new Error("Электронная почта не существует!"));
        const validPassword = await validatePassword(password, user.password);
        if (!validPassword) return next(new Error("Неверный пароль!"));
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        await User.findByIdAndUpdate(user._id, { accessToken })
        const tags = await Tags.find({})
        await console.log(tags)
        res.status(200).json({
            data: { email: user.email, role: user.role, login: user.login, id: user._id, avatar: user.avatar, aboutMe: user.aboutMe },
            accessToken,
            tags,
            message: "Вы вошли в систему"
        })
    } catch (error) {
        next(error)
    }
}

exports.getUsers = async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        users
    })
}

exports.getUser = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const user = await User.findById(userId);
      if (!user) return next(new Error("Нет такого пользователя!"));
        res.status(200).json({
            data: user
        })
    } catch (error) {
        next(error)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        console.log(req.body);
      const {update, updateId} = req.body;
      const user = await User.findByIdAndUpdate(updateId, update, {new: true});
      await user.save();
      const users = await User.find({});
      console.log(user);
      res.status(200).json({
          users,
          user: { email: user.email, role: user.role, login: user.login, id: user._id, avatar: user.avatar, aboutMe: user.aboutMe },
          message: "Пользователь был обновлён"
      });
    } catch (error) {
        next(error);
    }
};

exports.deleteUser = async (req, res, next) => {
    try {
       const {deletedId} = req.body;
       await User.findByIdAndDelete(deletedId);
       const users = await User.find({})
       res.status(200).json({
           users,
           message: "Пользователь был удалён"
       });
    } catch (error) {
        next(error)
    }
}

exports.grantAccess = function(action, resource) {
    return async (req, res, next) => {
        try {
            const permission = roles.can(req.user.role)[action](resource);
            if (!permission.granted) {
                return res.status(401).json({
                    error: "У вас нет разрешения для совершения этого действия"
                })
            }
            next()
        } catch (error) {
            next(error)
        }
    }
}

exports.allowIfLoggedIn = async (req, res, next) => {
    try {
        const { userId } = req.body
        const user = await User.findById(userId)
        if (!user)
            return res.status(401).json({
                error: "Вы должны войти в систему, чтобы получить доступ к этому маршруту"
            });
            req.user = user;
            next();
    } catch (error) {
        next(error);
    }
}

exports.uploadAvatar = async (req, res, next) => {
    try {
       const { id, img } = req.body 
       const uploadedResponse = await cloudinary.uploader.upload(img, {gravity: "face", width: 150, height: 150, zoom: "0.7", crop: "thumb"}, 
        async function(error, result) {
            await User.findByIdAndUpdate(id, {avatar: result.url}, {new: true})
        })
        const user = await User.findById(id)
       await res.json({user, msg: "всё норм"})
    } catch (error) {
        next(error)
    }
}