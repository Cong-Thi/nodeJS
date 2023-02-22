const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/reponse');
const { Sequelize } = require('sequelize');
const rapPhim = require('../models/rapPhim');
const lichChieu = require('../models/lichChieu');
const Op = Sequelize.Op;

// lấy thông tin hệ thống rạp
const getInfoTheater = async (req, res) => {
    try {
        let data = await model.heThongRap.findAll();
        sucessCode(res, data, "Lấy danh sách hệ thống rạp thành công")
    } catch (err) {

        errorCode(res, "Lỗi Backend")
    }
}

// lấy thông tin cụm rạp theo mã hệ thống rạp
const getInfoTheaterCluster = async (req, res) => {
    try {
        let { ma_he_thong_rap } = req.params
        let checkTheaterCluster = await model.cumRap.findAll({
            where: {
                ma_he_thong_rap
            },
            include: [
                "rapPhims"
            ]
        });
        if (checkTheaterCluster) {
            sucessCode(res, checkTheaterCluster, "Lấy danh sách cụm rạp theo mã hệ thống rạp thành công")
        }
        else {
            failCode(res, "Mã hệ thống rạp phim không tồn tại")
        }
    } catch (err) {

        errorCode(res, "Lỗi Backend")
    }
}

// Lấy thông tin lịch chiếu phim theo mã rạp 
const getInfoShowTimeMovie = async (req, res) => {
    try {
        let { ma_cum_rap } = req.params
        let ShowTimeMovie = await model.rapPhim.findAll({
            where: {
                ma_cum_rap
            },
            include: [
                "ma_cum_rap_cumRap", "lichChieus"
            ]
        });
        if (ShowTimeMovie) {
            sucessCode(res, ShowTimeMovie, "Lấy danh sách lịch chiếu phim theo mã rạp  thành công")
        }
        else {
            failCode(res, "Mã hệ thống rạp phim không tồn tại")
        }
    } catch (err) {

        errorCode(res, "Lỗi Backend")
    }
}

// Lấy thông tin lịch chiếu phim theo mã phim
const getInfoShowTimeMovieOfCodeFilm = async (req, res) => {
    try {
        let { ma_phim } = req.params
        let ShowTimeMovie = await model.lichChieu.findAll({
            where: {
                ma_phim
            },
            include: [
                "ma_phim_phim", "ma_rap_rapPhim",
            ]
        });
        if (ShowTimeMovie) {
            sucessCode(res, ShowTimeMovie, "Lấy thông tin lịch chiếu phim theo mã phim thành công")
        }
        else {
            failCode(res, "Mã lịch chiếu phim không tồn tại")
        }
    } catch (err) {

        errorCode(res, "Lỗi Backend")
    }
}

//commonjs module
module.exports = {
    getInfoTheater, getInfoTheaterCluster, getInfoShowTimeMovie, getInfoShowTimeMovieOfCodeFilm
}